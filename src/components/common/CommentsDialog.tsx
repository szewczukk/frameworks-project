import { Dispatch, SetStateAction, forwardRef } from 'react';
import * as z from 'zod';

const schema = z.object({
	username: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

type Props = {
	postId: number;
	setShowComments: Dispatch<SetStateAction<boolean>>;
};

const CommentsDialog = forwardRef<HTMLDialogElement, Props>((props, ref) => {
	const { postId, setShowComments } = props;

	return (
		<dialog ref={ref} className="rounded bg-neutral-50 p-8">
			<div className="absolute right-4 top-4">
				<form method="dialog">
					<button
						onClick={() => setShowComments(false)}
						className="h-8 w-8 rounded-full text-sm text-neutral-900 transition-colors hover:bg-neutral-300 focus:outline-none"
					>
						✕
					</button>
				</form>
			</div>
			comments for post {postId}
		</dialog>
	);
});

export default CommentsDialog;
