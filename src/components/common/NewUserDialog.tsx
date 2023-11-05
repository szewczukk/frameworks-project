import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
	username: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

type Props = {
	onSubmit: (values: FormValues) => void;
};

const NewUserDialog = forwardRef<HTMLDialogElement, Props>((props, ref) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const htmlOnSubmit = handleSubmit(props.onSubmit);

	return (
		<dialog ref={ref} className="rounded bg-neutral-50 p-8">
			<h1 className="mb-6 text-center text-2xl font-semibold">
				Create a new user
			</h1>
			<form onSubmit={htmlOnSubmit} className="flex w-72 flex-col gap-2">
				<label htmlFor="username">
					Username<span className="text-red-600">*</span>
				</label>
				<input
					{...register('username', { required: true })}
					id="username"
					className={`rounded border bg-transparent px-4 py-2 transition-colors focus:border-neutral-500 focus:outline-none ${
						errors.username?.message &&
						'border-red-500 bg-red-50 focus:border-red-500'
					}`}
					placeholder="Username*"
				/>
				<p className="min-h-[20px] text-sm text-red-500">
					{errors.username?.message || ' '}
				</p>

				<input
					type="submit"
					value="Create"
					className="rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
				/>
			</form>
		</dialog>
	);
});

export default NewUserDialog;
