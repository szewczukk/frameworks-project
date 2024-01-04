import api from '@/lib/api';
import { Comment, commentSchema, commentsSchema } from '@/lib/types';
import { forwardRef, useEffect, useContext, useState } from 'react';
import * as z from 'zod';
import { CommentsContext } from '../contexts/CommentsContext';
import NewCommentForm from './NewCommentForm';
import PostComment from './PostComment';

const schema = z.object({
	name: z.string().min(1),
	body: z.string().min(1),
	email: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

type Props = {
	postId: number;
};

const CommentsDialog = forwardRef<HTMLDialogElement, Props>((props, ref) => {
	const { postId } = props;
	const { comments, setComments } = useContext(CommentsContext);
	const [currentComments, setCurrentComments] = useState<Comment[]>([]);
	const [showAddComment, setShowAddComment] = useState(false);

	useEffect(() => {
		(async () => {
			const response = await api.get(`/posts/${postId}/comments/`);
			const responseComments = commentsSchema.parse(response.data);
			const newComments: Comment[] = [];

			responseComments.forEach((comment: Comment) => {
				const isOld = comments.some(({ id }) => id === comment.id);

				if (!isOld) {
					newComments.push(comment);
				}
			});

			setComments([...comments, ...newComments]);
		})();
	}, []);

	useEffect(() => {
		setCurrentComments(comments.filter((comment) => comment.postId === postId));
	}, [comments]);

	const addComment = async (formValues: FormValues) => {
		const { name, body, email } = formValues;

		const newComment: Comment = {
			id: Math.floor(Math.random() * 1000000000),
			postId,
			name,
			email,
			body,
		};

		setShowAddComment(false);

		const response = await api.post('/comments/', newComment);
		const responseComment = commentSchema.parse(response.data);

		setComments((prev) => [...prev, responseComment]);
	};

	return (
		<dialog
			ref={ref}
			className="min-w-[300px] rounded bg-neutral-50 p-8 text-center"
		>
			<div className="absolute right-4 top-4">
				<form method="dialog">
					<button
						type="submit"
						className="h-8 w-8 rounded-full text-sm text-neutral-900 transition-colors hover:bg-neutral-300 focus:outline-none"
					>
						✕
					</button>
				</form>
			</div>

			{showAddComment ? (
				<NewCommentForm onSubmit={addComment} />
			) : (
				<>
					<button
						className="mb-10 w-4/5 rounded border-2 border-black bg-slate-100 py-2 text-black transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
						onClick={() => setShowAddComment}
					>
						ADD NEW COMMENT
					</button>
					<div className="flex flex-col gap-10">
						{currentComments.map((comment) => (
							<PostComment key={comment.id} comment={comment} />
						))}
					</div>
				</>
			)}
		</dialog>
	);
});

export default CommentsDialog;
