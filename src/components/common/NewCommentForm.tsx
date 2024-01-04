import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import InputField from './InputField';

const schema = z.object({
	name: z.string().min(1),
	email: z.string().min(1),
	body: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

type Props = {
	onSubmit: (values: FormValues) => void;
};

export default function NewCommentForm(props: Props) {
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
		props.onSubmit(values);
	});

	return (
		<>
			<div className="absolute right-4 top-4">
				<form method="dialog">
					<button className="h-8 w-8 rounded-full text-sm text-neutral-900 transition-colors hover:bg-neutral-300 focus:outline-none">
						✕
					</button>
				</form>
			</div>
			<h1 className="mb-6 text-center text-2xl font-semibold">
				Add new comment
			</h1>
			<form onSubmit={htmlOnSubmit} className="flex w-72 flex-col gap-2">
				<InputField
					label="Name"
					error={errors.name?.message}
					{...register('name', { required: true })}
					required
				/>

				<InputField
					label="Email"
					error={errors.email?.message}
					{...register('email', { required: true })}
					required
				/>

				<InputField
					label="Body"
					type="textarea"
					error={errors.body?.message}
					{...register('body', { required: true })}
					required
				/>

				<input
					type="submit"
					value="Create"
					className="rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
				/>
			</form>
		</>
	);
}
