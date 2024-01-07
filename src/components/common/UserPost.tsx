import { useContext, useRef } from 'react';
import { Post, postsSchema, User } from '@/lib/types';
import CommentsDialog from './CommentsDialog';
import api from '@/lib/api';
import { PostsContext } from '../contexts/PostsContext';
import PostEditDialog, { FormValues } from './PostEditDialog';

export default function UserPost({
	postData,
	isOwner,
	owner,
}: {
	postData: Post;
	isOwner: boolean;
	owner: User;
}) {
	const { id, title, body } = postData;
	const { setPosts } = useContext(PostsContext);

	const commentsDialogRef = useRef<HTMLDialogElement>(null);
	const editDialogRef = useRef<HTMLDialogElement>(null);

	const deletePost = () => {
		api.delete(`/posts/${id}`).then(() => {
			setPosts((prevPosts) => {
				return prevPosts.map((post) =>
					post.id === id ? { ...post, deleted: true } : post,
				);
			});
		});
	};

	const handleSubmitEditPost = async (values: FormValues) => {
		editDialogRef.current?.close();

		const response = await api.patch(`/posts/${id}`, values);
		const responsePost = postsSchema.parse([response.data]);

		setPosts((prevPosts) => {
			return prevPosts.map((post) =>
				post.id === id ? { ...responsePost[0] } : post,
			);
		});

		editDialogRef.current?.close();
	};

	return (
		<div className="mb-8 flex h-80 w-[30%] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
			<div>
				<h3 className="mb-2 text-base font-bold capitalize">{title}</h3>
				<span className="mb-2 capitalize">
					<b>Owner: </b>
					{owner.username}
				</span>
				<p className="my-1 text-justify text-sm">{body}</p>
				<button
					onClick={() => commentsDialogRef.current?.showModal()}
					className="text-sm font-bold"
				>
					show comments...
				</button>
			</div>

			<div className="flex w-full justify-between">
				<button
					className="w-2/5 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none disabled:border-0 disabled:bg-slate-50 disabled:text-slate-500"
					onClick={() => editDialogRef.current?.show()}
					disabled={!isOwner}
				>
					EDIT
				</button>

				<button
					className="w-2/5 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none disabled:border-0 disabled:bg-slate-50 disabled:text-slate-500"
					onClick={deletePost}
					disabled={!isOwner}
				>
					DELETE
				</button>
			</div>

			<CommentsDialog ref={commentsDialogRef} postId={id} />

			<PostEditDialog
				ref={editDialogRef}
				onSubmit={handleSubmitEditPost}
				postId={id}
				title={title}
				body={body}
			/>
		</div>
	);
}
