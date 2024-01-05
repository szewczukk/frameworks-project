import { z } from 'zod';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import CreateTodoForm, { TodoFormValues } from '../Dashboard/CreateTodoForm';

const userSchema = z.object({
	id: z.number(),
	name: z.string(),
	username: z.string(),
	email: z.string(),
	address: z.object({
		street: z.string(),
		suite: z.string(),
		city: z.string(),
		zipcode: z.string(),
		geo: z.object({
			lat: z.string(),
			lng: z.string(),
		}),
	}),
	phone: z.string(),
	website: z.string(),
	company: z.object({
		name: z.string(),
		catchPhrase: z.string(),
		bs: z.string(),
	}),
});

type User = z.infer<typeof userSchema>;

const albumSchema = z.object({
	id: z.number(),
	title: z.string(),
	userId: z.number(),
});

type Album = z.infer<typeof albumSchema>;

const createTodoSchema = z.object({
	id: z.number(),
	title: z.string(),
	userId: z.string(),
});

const todoSchema = z.object({
	id: z.number(),
	title: z.string(),
	completed: z.boolean(),
	userId: z.number(),
});

type Todo = z.infer<typeof todoSchema>;

export default function DashboardPage() {
	const { userId } = useAuthContext();
	const [user, setUser] = useState<User | undefined>();
	const [albums, setAlbums] = useState<Album[]>([]);
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		(async () => {
			const result = await api.get(`/users/${userId}`);
			const responseUser = userSchema.parse(result.data);

			setUser(responseUser);
		})();

		(async () => {
			const result = await api.get(`/users/${userId}/albums`);
			const responseAlbums = z.array(albumSchema).parse(result.data);

			setAlbums(responseAlbums);
		})();

		(async () => {
			const result = await api.get(`/users/${userId}/todos`);
			const responseTodos = z.array(todoSchema).parse(result.data);

			setTodos(responseTodos);
		})();
	}, []);

	const handleSubmitTodoForm = async (values: TodoFormValues) => {
		const result = await api.post(`/users/${userId}/todos`, values);
		const responseTodo = createTodoSchema.parse(result.data);

		setTodos((prev) => [
			...prev,
			{
				...responseTodo,
				completed: false,
				userId: parseInt(responseTodo.userId),
			},
		]);
	};

	return (
		<div className="container mx-auto mt-8 bg-slate-200 p-8">
			{user ? (
				<>
					<h1 className="text-2xl font-semibold">{user.name}</h1>
					<div className="flex flex-col flex-wrap gap-4 md:flex-row">
						<div className="flex flex-1 flex-col gap-8">
							<h2 className="text-xl font-semibold">Albums</h2>
							<ul>
								{albums.map((album) => (
									<li key={album.id} className="list-inside list-disc">
										{album.title}
									</li>
								))}
							</ul>
						</div>
						<div className="flex flex-1 flex-col gap-8">
							<h2 className="text-xl font-semibold">Todos</h2>
							<ul>
								{todos.map((todo) => (
									<li
										key={todo.id}
										className={`list-inside list-disc ${
											todo.completed && 'line-through'
										}`}
									>
										{todo.title}
									</li>
								))}
							</ul>
							<CreateTodoForm onSubmit={handleSubmitTodoForm} />
						</div>
					</div>
				</>
			) : (
				<p>Loading..</p>
			)}
		</div>
	);
}
