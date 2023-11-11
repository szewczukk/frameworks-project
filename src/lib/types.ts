import { z } from 'zod';

export const userSchema = z.object({
	id: z.number(),
	username: z.string(),
});

export const postSchema = z.object({
	id: z.number(),
	userId: z.number(),
	title: z.string(),
	body: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type Post = z.infer<typeof postSchema>;

export const usersSchema = z.array(userSchema);
export const postsSchema = z.array(postSchema);
