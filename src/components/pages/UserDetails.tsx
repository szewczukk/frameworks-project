import { useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import api from '@/lib/api';
import { Post, postSchema, postsSchema } from '@/lib/types';
import UserPost from '../common/UserPost';
import * as z from 'zod';
import { UsersContext } from '../contexts/UserContext';
import { PostsContext } from '../contexts/PostsContext';
import NewPostDialog from '../common/NewPostDialog';

const schema = z.object({
	title: z.string().min(1),
	body: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

export default function UserDetails() {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const { users } = useContext(UsersContext);
	const { posts, setPosts } = useContext(PostsContext);
	const [currentUserPosts, setCurrentUserPosts] = useState<Post[]>([]);
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const response = await api.get(`/users/${params.id}/posts`);
			const responsePosts = postsSchema.parse(response.data);
			const newPosts: Post[] = [];

			responsePosts.forEach((post: Post) => {
				let isOld = posts.some(({ id }) => id === post.id);

				if (!isOld) {
					newPosts.push(post);
				}
			});

			setPosts([...posts, ...newPosts]);

			setIsLoading(false);
		})();
	}, [params.id]);

	useEffect(() => {
		setCurrentUserPosts(
			posts.filter((post) => post.userId == params.id && !post.deleted),
		);
	}, [posts]);

	if (!params.id) {
		return <h1>Users id not provided</h1>;
	}

	const user = users.find((user) => user.id === parseInt(params.id as string));

	if (!user) {
		return <h1>User not found</h1>;
	}

	const handleShowDialog = () => {
		dialogRef.current?.showModal();
	};

	const addPost = async (formValues: FormValues) => {
		dialogRef.current?.close();

		const { title, body } = formValues;

		const newPost = {
			userId: user.id,
			id: Math.floor(Math.random() * 1000000000),
			title,
			body,
		};

		const response = await api.post('/posts/', newPost);
		const responsePost = postSchema.parse(response.data);

		setPosts((prev) => [...prev, responsePost]);
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="mb-10 mt-5 w-full text-center text-xl">
				Hello, {user.username}!
			</h1>
			<button
				className="mb-10 w-64 rounded border-2 border-black bg-slate-100 py-2 text-center text-black transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
				onClick={handleShowDialog}
			>
				ADD NEW POST
			</button>

			<NewPostDialog ref={dialogRef} onSubmit={addPost} />

			<div className="gap flex flex-wrap items-end justify-center gap-7">
				{isLoading
					? 'Loading...'
					: currentUserPosts.length
					? currentUserPosts.map((postData: Post) => {
							return <UserPost key={postData.id} postData={postData} />;
					  })
					: 'No data'}
			</div>
		</div>
	);
}
