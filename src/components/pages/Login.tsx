import { useForm } from 'react-hook-form';
import InputField from '../common/InputField';
import { z } from 'zod';
import api from '@/lib/api';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
	username: z.string(),
	password: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const responseSchema = z.object({
	id: z.number(),
});

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>();
	const navigate = useNavigate();
	const { signIn } = useAuthContext();

	const onSubmit = handleSubmit(async (values) => {
		reset();

		const result = await api.get(`/users?username=${values.username}`);
		const user = z.array(responseSchema).parse(result.data)[0];

		signIn(user.id);
		navigate('/');
	});

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<form
				className="flex flex-col items-start rounded bg-slate-200 p-16"
				onSubmit={onSubmit}
			>
				<InputField
					type="text"
					label="Username"
					{...register('username', { required: true })}
					error={errors.username?.message}
					required
				/>
				<InputField
					type="password"
					label="Password"
					{...register('password', { required: true })}
					error={errors.password?.message}
					required
				/>

				<button type="submit" className="w-full bg-green-700 py-1 text-white">
					Log in
				</button>
			</form>
		</div>
	);
}
