import { z } from 'zod';

export const postSchema = z.object({
	id: z.number(),
	userId: z.number(),
	title: z.string(),
	body: z.string(),
});

export const albumSchema = z.object({
	id: z.number(),
	userId: z.number(),
	title: z.string(),
});

export const photoSchema = z.object({
	id: z.number(),
	albumId: z.number(),
	title: z.string(),
	url: z.string(),
	thumbnailUrl: z.string(),
});

export const commentSchema = z.object({
	id: z.number(),
	postId: z.number(),
	name: z.string(),
	email: z.string(),
	body: z.string(),
});

export const userSchema = z.object({
	id: z.number(),
	name: z.string(),
	username: z.string(),
	email: z.string(),
	address: z.object({
		street: z.string(),
		suite: z.string(),
		city: z.string(),
		zipcode: z.string(),
		geo: z.object({
			lat: z.string(),
			lng: z.string(),
		}),
	}),
	phone: z.string(),
	website: z.string(),
	company: z.object({
		name: z.string(),
		catchPhrase: z.string(),
		bs: z.string(),
	}),
});

export const todoSchema = z.object({
	id: z.number(),
	title: z.string(),
	completed: z.boolean(),
	userId: z.number(),
});

export type User = z.infer<typeof userSchema>;
export type Post = z.infer<typeof postSchema>;
export type Album = z.infer<typeof albumSchema>;
export type Photo = z.infer<typeof photoSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type Todo = z.infer<typeof todoSchema>;

export const usersSchema = z.array(userSchema);
export const postsSchema = z.array(postSchema);
export const albumsSchema = z.array(albumSchema);
export const photosSchema = z.array(photoSchema);
export const commentsSchema = z.array(commentSchema);
export const todosSchema = z.array(todoSchema);
