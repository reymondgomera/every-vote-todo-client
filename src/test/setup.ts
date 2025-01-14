import { server } from "@/mocks/node";
import "@testing-library/jest-dom/vitest";

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
