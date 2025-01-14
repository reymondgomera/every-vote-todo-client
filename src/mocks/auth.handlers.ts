import { http, HttpResponse } from "msw";
import { apiUrl, generateToken } from "./utils";
import { mockData } from "./data";
import { checkAuth } from "./middleware";

export const authHandlers = [
  http.post(apiUrl("/auth/register"), async ({ request }) => {
    const body = (await request.json()) as { username: string; email: string; password: string };
    const user = mockData.users.find((user) => user.email === body.email);

    if (user) return HttpResponse.json({ message: "User already exists." }, { status: 409 });

    const newUser = {
      uuid: "55691c4b-9f7e-46d9-b8fa-270a83de260f",
      username: body.username,
      email: body.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    };

    return HttpResponse.json(newUser, { status: 201 });
  }),
  http.post(apiUrl("/auth/login"), async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string };
    const user = mockData.users.find((user) => email === user.email);

    if (!user) return HttpResponse.json({ message: "User not found." }, { status: 404 });
    if (password !== user.password) return HttpResponse.json({ message: "Invalid credentials." }, { status: 401 });

    const token = generateToken(user.uuid);
    return HttpResponse.json({ token }, { status: 202 });
  }),
  http.get(apiUrl("/auth/me"), async ({ request }) => {
    const { password, ...user } = checkAuth(request);
    return HttpResponse.json({ user }, { status: 200 });
  }),
];
