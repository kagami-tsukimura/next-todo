import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().max(20),
  body: z.string().max(5),
});

export type CreateTaskSchema = z.TypeOf<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  taskId: z.string().cuid(),
  title: z.string().max(20),
  body: z.string().max(5),
});

export type UpdateTaskSchema = z.TypeOf<typeof updateTaskSchema>;

export const getSingleTaskSchema = z.object({
  taskId: z.string().cuid(),
});

export const deleteTaskSchema = z.object({
  taskId: z.string().cuid(),
});
