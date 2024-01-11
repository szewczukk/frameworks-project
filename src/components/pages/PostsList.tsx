import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import api from '@/lib/api';
import { postSchema, postsSchema } from '@/lib/types';
import UserPost from '../common/UserPost';
import * as z from 'zod';
import { UsersContext } from '../contexts/UserContext';
import { PostsContext } from '../contexts/PostsContext';
import NewPostDialog from '../common/NewPostDialog';
import { useAuthContext } from '../contexts/AuthContext';

const schema = z.object({
	title: z.string().min(1),
	body: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

export default function PostsList() {
	const [isLoading, setIsLoading] = useState(false);
	const { users } = useContext(UsersContext);
	const { posts, setPosts } = useContext(PostsContext);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [selectedUserFilter, setSelectedUserFilter] = useState(-1);

	const { userId } = useAuthContext();

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const response = await api.get('/posts');
			const responsePosts = postsSchema.parse(response.data);

			setPosts(responsePosts);

			setIsLoading(false);
		})();
	}, []);

	const handleShowDialog = () => {
		dialogRef.current?.showModal();
	};

	const addPost = async (formValues: FormValues) => {
		dialogRef.current?.close();

		const { title, body } = formValues;

		const newPost = {
			userId,
			id: Math.floor(Math.random() * 1000000000),
			title,
			body,
		};

		const response = await api.post('/posts/', newPost);
		const responsePost = postSchema.parse(response.data);

		setPosts((prev) => [...prev, responsePost]);
	};

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedUserFilter(parseInt(e.target.value));
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="mb-10 mt-5 w-full text-center text-xl">All posts</h1>
			<div className="mb-10 flex items-center gap-4">
				<button
					className="w-64 rounded border-2 border-black bg-slate-100 py-2 text-center text-black transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
					onClick={handleShowDialog}
				>
					ADD NEW POST
				</button>
				<select className="border border-black" onChange={handleChange}>
					<option value="-1" selected>
						All
					</option>
					{users.map((user) => (
						<option value={user.id}>{user.username}</option>
					))}
				</select>
			</div>
			<NewPostDialog ref={dialogRef} onSubmit={addPost} />
			<div className="gap flex flex-wrap items-end justify-center gap-7">
				{isLoading
					? 'Loading...'
					: posts.length
					? posts
							.filter((post) => {
								if (selectedUserFilter === -1) {
									return true;
								}

								return post.userId === selectedUserFilter;
							})
							.map((postData) => {
								return (
									<UserPost
										key={postData.id}
										postData={postData}
										isOwner={postData.userId === userId}
										owner={users.find((user) => user.id === postData.userId)!}
									/>
								);
							})
					: 'No data'}
			</div>
		</div>
	);
}
