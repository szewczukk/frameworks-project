import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import TextArea from './TextArea';

const schema = z.object({
	title: z.string().min(0),
	body: z.string().min(0),
});

export type FormValues = z.infer<typeof schema>;

type Props = {
	postId: number;
	title: string;
	body: string;
	onSubmit: (values: FormValues) => void;
};

const PostEditDialog = forwardRef<HTMLDialogElement, Props>((props, ref) => {
	const { title, body, onSubmit } = props;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const htmlOnSubmit = handleSubmit((values) => {
		reset();
		onSubmit({ title: values.title || title, body: values.body || body });
	});

	return (
		<dialog ref={ref} className="rounded bg-neutral-50 p-8">
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

			<h1 className="mb-6 text-center text-2xl font-semibold">Edit Post</h1>
			<form onSubmit={htmlOnSubmit} className="flex w-72 flex-col gap-2">
				<InputField
					label="Title"
					placeholder={title}
					error={errors.title?.message}
					{...register('title', { required: false })}
				/>
				<TextArea
					label="Body"
					placeholder={body}
					error={errors.body?.message}
					{...register('body', { required: false })}
				/>

				<input
					type="submit"
					value="Update"
					className="rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
				/>
			</form>
		</dialog>
	);
});

export default PostEditDialog;
