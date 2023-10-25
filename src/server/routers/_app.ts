import { z } from "zod";
import { procedure, router } from "~/server/trpc";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query((opts) => {
      {
        return { greeting: `Hello ${opts.input.name ?? "World"}!` };
      }
    }),
  signUp: procedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string().min(8),
      })
    )
    .mutation(({ ctx, input }) => {
      ctx.prisma.user
        .create({
          data: {
            email: input.email,
            name: input.name,
            password: input.password,
          },
        })
        .then((user) => {
          ctx.session.user = {
            id: user.id,
            email: user.email,
            name: user.name,
          };
          return { user: user };
        })
        .catch((error) => {
          console.log(error);
        });
    }),
  signIn: procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      if (user.password !== input.password) {
        throw new Error("Invalid email or password");
      }
      ctx.session.user = user;
      return { user: user };
    }),
});

export type AppRouter = typeof appRouter;
