import { Link } from 'react-router-dom';

export type User = {
	id: number;
	username: string;
};

type Props = {
	users: User[];
	currentUserId: number;
};

export default function Sidebar({ users, currentUserId }: Props) {
	return (
		<aside className="h-full w-72 bg-slate-300 py-4">
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
		</aside>
	);
}
