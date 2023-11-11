import { Link } from 'react-router-dom';
import { User } from '@/lib/types';

type Props = {
	users: User[];
	currentUserId: number;
	onNewUserButtonClick: () => void;
};

export default function Sidebar({
	users,
	currentUserId,
	onNewUserButtonClick,
}: Props) {
	return (
		<aside className="fixed bottom-0 top-0 flex h-full w-72 flex-col justify-between bg-slate-300 py-4">
			<ul>
				{users.map((user) => (
					<Link to={`/users/${user.id}`} key={user.id}>
						<li
							className={`px-4 py-2 transition-colors hover:bg-slate-500 hover:text-gray-50 ${
								currentUserId === user.id && 'bg-slate-500 text-gray-50'
							}`}
						>
							{user.username}
						</li>
					</Link>
				))}
			</ul>
			<button
				className="m-4 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
				onClick={onNewUserButtonClick}
			>
				New user
			</button>
		</aside>
	);
}
