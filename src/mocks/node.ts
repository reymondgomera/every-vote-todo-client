import { setupServer } from "msw/node";
import { authHandlers } from "./auth.handlers";
import { todoHandlers } from "./todo.handlers";

export const server = setupServer(...authHandlers, ...todoHandlers);
