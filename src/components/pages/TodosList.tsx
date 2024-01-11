import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import api from '@/lib/api';
import { Todo, todoSchema, todosSchema } from '@/lib/types';
import { UsersContext } from '../contexts/UserContext';
import { useAuthContext } from '../contexts/AuthContext';
import NewTodoDialog, { FormValues } from '../common/NewTodoDialog';
import TodoCard from '../common/TodoCard';

export default function TodosList() {
	const newTodoRef = useRef<HTMLDialogElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { users } = useContext(UsersContext);
	const [todos, setTodos] = useState<Todo[]>([]);
	const [selectedUserFilter, setSelectedUserFilter] = useState(-1);
	const { userId } = useAuthContext();

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const response = await api.get('/todos');
			const responseTodos = todosSchema.parse(response.data);

			setTodos(responseTodos);

			setIsLoading(false);
		})();
	}, []);

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedUserFilter(parseInt(e.target.value));
	};

	const handleNewTodo = async (values: FormValues) => {
		newTodoRef.current?.close();

		const response = await api.post('/todos/', {
			title: values.title,
			userId,
			completed: values.completed,
		});
		const responseTodo = todoSchema.parse(response.data);

		setTodos((prev) => [...prev, responseTodo]);
	};

	const handleShowDialog = () => {
		newTodoRef.current?.showModal();
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="mb-10 mt-5 w-full text-center text-xl">Todos</h1>
			<div className="mb-10 flex items-center gap-4">
				<button
					className="w-64 rounded border-2 border-black bg-slate-100 py-2 text-center text-black transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
					onClick={handleShowDialog}
				>
					ADD NEW TODO
				</button>
				<select className="border border-black" onChange={handleChange}>
					<option value="-1" selected>
						All
					</option>
					{users.map((user) => (
						<option value={user.id}>{user.username}</option>
					))}
				</select>
			</div>
			<NewTodoDialog ref={newTodoRef} onSubmit={handleNewTodo} />
			<div className="gap flex flex-wrap items-end justify-center gap-7">
				{isLoading
					? 'Loading...'
					: todos.length
					? todos
							.filter((album) => {
								if (selectedUserFilter === -1) {
									return true;
								}

								return album.userId === selectedUserFilter;
							})
							.map((todo) => {
								return (
									<TodoCard
										isOwner={userId === todo.userId}
										owner={users.find((user) => user.id === todo.userId)!}
										todoData={todo}
									/>
								);
							})
					: 'No data'}
			</div>
		</div>
	);
}
