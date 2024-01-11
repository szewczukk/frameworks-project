import { Dispatch, SetStateAction, useRef } from 'react';
import { Todo, User } from '@/lib/types';

export default function TodoCard({
	todoData,
	isOwner,
	owner,
	setTodos,
}: {
	todoData: Todo;
	isOwner: boolean;
	owner: User;
	setTodos: Dispatch<SetStateAction<Todo[]>>;
}) {
	const editDialogRef = useRef<HTMLDialogElement>(null);

	const handleDelete = () => {
		setTodos((prev) => prev.filter((t) => t.id !== todoData.id));
	};

	return (
		<div className="mb-8 flex h-48 w-[30%] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
			<div>
				<h2 className="mb-2 text-base font-bold capitalize">
					{todoData.title}
				</h2>
				<p>{todoData.completed ? 'Completed' : 'Incomplete'}</p>
				<span className="mb-2 capitalize">
					<b>Owner: </b>
					{owner.username}
				</span>
			</div>

			<div className="flex w-full justify-between">
				<button
					className="w-2/5 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none disabled:border-0 disabled:bg-slate-50 disabled:text-slate-500"
					onClick={() => editDialogRef.current?.show()}
					disabled={!isOwner}
				>
					EDIT
				</button>

				<button
					className="w-2/5 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none disabled:border-0 disabled:bg-slate-50 disabled:text-slate-500"
					onClick={handleDelete}
					disabled={!isOwner}
				>
					DELETE
				</button>
			</div>
		</div>
	);
}
