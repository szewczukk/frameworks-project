import { useContext, useEffect, useRef, useState } from 'react';
import { Post } from '@/lib/types';
import CommentsDialog from './CommentsDialog';
import api from '@/lib/api';
import { PostsContext } from '../contexts/PostsContext';

export default function UserPost({ postData }: { postData: Post }) {
	const { id, title, body } = postData;
	const [showComments, setShowComments] = useState(false);
	const { posts, setPosts } = useContext(PostsContext);

	const dialogRef = useRef<HTMLDialogElement>(null);

	const deletePost = () => {
		console.log('wanna delete', id);

		api.delete(`/posts/${id}`).then(() => {
			setPosts((prevPosts) => {
				return prevPosts.map((post) =>
					post.id === id ? { ...post, deleted: true } : post,
				);
			});
		});
	};

	useEffect(() => {
		if (showComments) {
			dialogRef.current?.showModal();
		}
	}, [showComments]);

	return (
		<div className="mb-8 flex h-80 w-[30%] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
			<div>
				<h3 className="mb-2 text-base font-bold capitalize">{title}</h3>
				<p className="my-1 text-justify text-sm">{body}</p>
				<button
					onClick={() => setShowComments(true)}
					className="text-sm font-bold"
				>
					show comments...
				</button>
			</div>

			<div className="flex w-full justify-between">
				<button className=" w-2/5 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none">
					EDIT
				</button>
				<button
					onClick={deletePost}
					className=" w-2/5 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
				>
					DELETE
				</button>
			</div>

			{showComments && (
				<CommentsDialog
					ref={dialogRef}
					postId={id}
					setShowComments={setShowComments}
				/>
			)}
		</div>
	);
}
