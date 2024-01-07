import { Comment } from '@/lib/types';

type Props = {
	comment: Comment;
	isOwner: boolean;
	onDelete: (commentId: number) => void;
};

export default function PostComment({ comment, isOwner, onDelete }: Props) {
	const { id, name, email, body } = comment;

	return (
		<div className="mb-8 w-80 text-center">
			<div>
				<h3 className=" text-base font-bold capitalize">{name}</h3>
				<h4 className="mb-4 text-base font-normal capitalize">{email}</h4>
				<p className="my-1 mb-4 text-sm">{body}</p>
			</div>

			{isOwner && (
				<button
					onClick={() => onDelete(id)}
					className="w-4/5 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
				>
					DELETE COMMENT
				</button>
			)}
		</div>
	);
}
