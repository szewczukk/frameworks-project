import { Dispatch, SetStateAction, useRef } from 'react';
import { Post, postSchema, User } from '@/lib/types';
import CommentsDialog from './CommentsDialog';
import api from '@/lib/api';
import PostEditDialog, { FormValues } from './PostEditDialog';

export default function UserPost({
	postData,
	isOwner,
	owner,
	setPosts,
}: {
	postData: Post;
	isOwner: boolean;
	owner: User;
	setPosts: Dispatch<SetStateAction<Post[]>>;
}) {
	const { id, title, body } = postData;

	const commentsDialogRef = useRef<HTMLDialogElement>(null);
	const editDialogRef = useRef<HTMLDialogElement>(null);

	const deletePost = async () => {
		await api.delete(`/posts/${id}`);

		setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
	};

	const handleSubmitEditPost = async (values: FormValues) => {
		editDialogRef.current?.close();

		const response = await api.patch(`/posts/${id}`, values);
		const responsePost = postSchema.parse(response.data);

		setPosts((prevPosts) => {
			return prevPosts.map((post) => (post.id === id ? responsePost : post));
		});

		editDialogRef.current?.close();
	};

	return (
		<div className="mb-8 flex h-80 w-[30%] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow">
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
