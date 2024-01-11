import { Link, useLocation, useNavigate } from 'react-router-dom';
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
	const { userId, logout } = useAuthContext();
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<aside className="fixed bottom-0 top-0 flex h-full w-72 flex-col justify-between bg-slate-300 py-4">
			<div>
				<div className="flex flex-col border-b border-black py-4">
					<Link
						to="/"
						className={`px-4 py-2 transition-colors hover:bg-slate-500 hover:text-gray-50 ${
							location.pathname === '/' && 'bg-slate-500 text-gray-50'
						}`}
					>
						Me - {users.find((user) => user.id === userId)?.username}
					</Link>
				</div>
				<div className="flex flex-col border-b border-black py-4">
					<Link
						to="/posts"
						className={`px-4 py-2 transition-colors hover:bg-slate-500 hover:text-gray-50 ${
							location.pathname === '/posts' && 'bg-slate-500 text-gray-50'
						}`}
					>
						Posts
					</Link>
					<Link
						to="/albums"
						className={`px-4 py-2 transition-colors hover:bg-slate-500 hover:text-gray-50 ${
							location.pathname === '/albums' && 'bg-slate-500 text-gray-50'
						}`}
					>
						Albums
					</Link>
					<Link
						to="/todos"
						className={`px-4 py-2 transition-colors hover:bg-slate-500 hover:text-gray-50 ${
							location.pathname === '/todos' && 'bg-slate-500 text-gray-50'
						}`}
					>
						Todos
					</Link>
				</div>
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
			</div>
			<div className="flex flex-col gap-2">
				<button
					className="hover:green-slate-500 mx-4 rounded border bg-green-700 py-2 text-slate-50 transition-colors hover:border-green-700 hover:bg-transparent hover:text-green-700 focus:outline-none"
					onClick={onNewUserButtonClick}
				>
					New user
				</button>
				<button
					className="mx-4 rounded border bg-red-600 py-2 text-slate-50 transition-colors hover:border-red-500 hover:bg-transparent hover:text-red-500 focus:outline-none"
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		</aside>
	);
}
