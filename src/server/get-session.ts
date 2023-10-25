import nextSession from "next-session";
import { promisifyStore } from "next-session/lib/compat";
import Redis from "ioredis";

const RedisStore = require("connect-redis").default;

export type AppSession = {
  user?: {
    id: number;
    name: string | null;
    email: string;
  };
};

type NextSessionInstance = ReturnType<typeof nextSession>;
type GetSessionArgs = Parameters<NextSessionInstance>;
type GetSessionReturn = Pick<
  Awaited<ReturnType<NextSessionInstance>>,
  "cookie" | "id"
>;

// getSessionの型を再定義
export const getSession: (
  ...args: GetSessionArgs
) => Promise<GetSessionReturn & AppSession> = nextSession({
  store: promisifyStore(
    new RedisStore({
      client: new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      }),
    })
  ),
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  },
});
