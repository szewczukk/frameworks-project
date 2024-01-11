import { User, userSchema } from '@/lib/types';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function DashboardPage() {
	const { userId } = useAuthContext();
	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		(async () => {
			const result = await api.get(`/users/${userId}`);
			const responseUser = userSchema.parse(result.data);

			setUser(responseUser);
		})();
	}, []);

	if (!user) {
		return <h1>No user found!</h1>;
	}

	return (
		<div className="container mx-auto mt-8 bg-slate-200 p-8">
			<h1 className="mb-8 text-xl font-semibold">{user.name}</h1>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Username</th>
						<th>Website</th>
						<th>Phone</th>
						<th>Email</th>
						<th>Address</th>
						<th>Company</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{user.id}</td>
						<td>{user.name}</td>
						<td>{user.username}</td>
						<td>{user.website}</td>
						<td>{user.phone}</td>
						<td>{user.email}</td>
						<td>{user.address.city}</td>
						<td>{user.company.name}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
