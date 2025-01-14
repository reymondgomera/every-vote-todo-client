import { DefaultBodyType, StrictRequest, HttpResponse } from "msw";
import jwt from "jsonwebtoken";
import { mockEnv } from "./env";
import { mockData } from "./data";

export const checkAuth = (req: StrictRequest<DefaultBodyType>) => {
  try {
    const authorization = req.headers.get("Authorization") ?? "";
    const token = authorization.replace("Bearer ", "");

    const { uuid } = jwt.verify(token, mockEnv.SECRET_KEY) as { uuid: string };
    const user = mockData.users.find((user) => user.uuid === uuid);

    if (user) return user;

    throw new HttpResponse("User is not found", { status: 401 });
  } catch {
    throw new HttpResponse("Token is invalid", { status: 401 });
  }
};
