import { Link, useLocation } from 'react-router-dom';
import { User } from '@/lib/types';
import { useAuthContext } from '../contexts/AuthContext';

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
	const { userId } = useAuthContext();
	const location = useLocation();

	return (
		<aside className="fixed bottom-0 top-0 flex h-full w-72 flex-col justify-between bg-slate-300 py-4">
			<Link
				to="/"
				className={`px-4 py-2 transition-colors hover:bg-slate-500 hover:text-gray-50 ${
					location.pathname === '/' && 'bg-slate-500 text-gray-50'
				}`}
			>
				Me
			</Link>
			<ul>
				{users
					.filter((user) => user.id !== userId)
					.map((user) => (
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
