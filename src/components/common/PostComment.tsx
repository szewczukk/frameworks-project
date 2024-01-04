import { useContext } from 'react';
import { Comment } from '@/lib/types';
import api from '@/lib/api';
import { CommentsContext } from '../contexts/CommentsContext';

export default function UserPost({ comment }: { comment: Comment }) {
	const { id, name, email, body } = comment;
	const { setComments } = useContext(CommentsContext);

	const deleteComment = async () => {
		const result = await api.delete(`/comments/${id}`);

		if (result.status !== 200) {
			return;
		}

		setComments((prevComments) =>
			prevComments.filter((prevComment) => prevComment.id !== id),
		);
	};

	return (
		<div className="mb-8 w-80 text-center">
			<div>
				<h3 className=" text-base font-bold capitalize">{name}</h3>
				<h4 className="mb-4 text-base font-normal capitalize">{email}</h4>
				<p className="my-1 mb-4 text-sm">{body}</p>
			</div>

			<button
				onClick={deleteComment}
				className="w-4/5 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
			>
				DELETE COMMENT
			</button>
		</div>
	);
}
