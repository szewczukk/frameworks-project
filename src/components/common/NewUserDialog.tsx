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
		<dialog ref={ref} className="rounded bg-neutral-50 p-4">
			<form onSubmit={htmlOnSubmit} className="flex flex-col gap-4">
				<label htmlFor="username">Username</label>
				<input {...register('username', { required: true })} id="username" />
				<p>{errors.username?.message}</p>

				<input type="submit" value="OK" />
			</form>
		</dialog>
	);
});

export default NewUserDialog;
