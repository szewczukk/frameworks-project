import { z } from 'zod';

export const userSchema = z.object({
	id: z.number(),
	username: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const usersSchema = z.array(userSchema);
