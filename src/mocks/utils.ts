import { mockEnv } from "./env";
import jwt from "jsonwebtoken";

export const generateToken = (uuid: string) => {
  const { SECRET_KEY, EXPIRE_TIME } = mockEnv;
  return `Bearer ${jwt.sign({ uuid }, SECRET_KEY || "express", { expiresIn: EXPIRE_TIME })}`;
};

export const apiUrl = (path: string) => {
  return mockEnv.API_URL + path;
};
