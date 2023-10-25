import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "./prisma";
import { getSession } from "./get-session";

export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession(opts.req, opts.res);
  return {
    prisma,
    session,
    ...opts,
  };
};
