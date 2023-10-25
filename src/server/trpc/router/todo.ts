import { createTaskSchema, getSingleTaskSchema } from "./../../../schema/todo";
import { authedProcedure, t } from "./../trpc";

export const todoRouter = t.router({
  createTask: authedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
      return task;
    }),
  getTasks: t.procedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getSingleTask: authedProcedure
    .input(getSingleTaskSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findUnique({
        where: {
          id: input.taskId,
        },
      });
    }),
});
