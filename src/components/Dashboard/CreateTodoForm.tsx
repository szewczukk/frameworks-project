import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from '../common/InputField';

const todoForm = z.object({
	title: z.string(),
});

export type TodoFormValues = z.infer<typeof todoForm>;

type Props = {
	onSubmit: (values: TodoFormValues) => void;
};

export default function CreateTodoForm({ onSubmit }: Props) {
	const { handleSubmit, register, reset } = useForm<TodoFormValues>();

	const submitForm = handleSubmit((values) => {
		reset();
		onSubmit(values);
	});

	return (
		<form
			onSubmit={submitForm}
			className="flex flex-col gap-2 rounded bg-zinc-200 p-8"
		>
			<InputField
				type="text"
				label="Title"
				required
				{...register('title', { required: true })}
			/>

			<button type="submit" className="bg-green-700 px-8 py-1 text-white">
				Create todo
			</button>
		</form>
	);
}
