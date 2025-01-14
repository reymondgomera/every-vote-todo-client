import { http, HttpResponse } from "msw";
import { apiUrl } from "./utils";
import { checkAuth } from "./middleware";
import { mockData } from "./data";

export const todoHandlers = [
  http.get(apiUrl("/todos"), async ({ request }) => {
    const user = checkAuth(request);
    const todos = mockData.todos.filter((todo) => todo.user_uuid === user.uuid);
    return HttpResponse.json({ todos }, { status: 200 });
  }),
  http.get(apiUrl("/todos/:id"), async ({ request, params }) => {
    const { id } = params;
    const user = checkAuth(request);
    const todo = mockData.todos.find((todo) => todo.user_uuid === user.uuid && todo.uuid === id);
    return HttpResponse.json({ todo }, { status: 200 });
  }),
  http.post(apiUrl("/todos"), async ({ request }) => {
    const user = checkAuth(request);
    const body = (await request.json()) as {
      title: string;
      description: string;
      dueDate: string;
      status: boolean;
    };

    return HttpResponse.json(
      {
        todo: {
          uuid: "d0584808-a31a-4525-995e-8f141e4f6453",
          ...body,
          user_uuid: user.uuid,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleteAt: null,
        },
      },
      { status: 201 },
    );
  }),
  http.put(apiUrl("/todos/:id"), async ({ request, params }) => {
    const { id } = params;
    const user = checkAuth(request);
    const body = (await request.json()) as {
      title: string;
      description: string;
      dueDate: string;
      status: boolean;
    };

    const todo = mockData.todos.find((todo) => todo.user_uuid === user.uuid && todo.uuid === id);

    if (!todo) return HttpResponse.json({ message: "Todo not found!" }, { status: 404 });

    return HttpResponse.json(
      {
        todo: {
          ...todo,
          ...body,
          updated_at: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  }),
  http.delete(apiUrl("/todos/:id"), async ({ request }) => {
    checkAuth(request);

    return HttpResponse.json({
      todos: {
        raw: [],
        affected: 1,
      },
    });
  }),
];
