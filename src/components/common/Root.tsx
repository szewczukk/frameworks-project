import { useQuery } from 'react-query';
import Sidebar, { User } from './Sidebar';
import api from '../../lib/api';
import { Outlet } from 'react-router-dom';

export default function Root() {
	const { isLoading, data, error } = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => api.get('/users/').then((res) => res.data),
	});

	if (isLoading) {
		return <h1>Loading..</h1>;
	}

	if (error || !data) {
		return <h1>Error</h1>;
	}

	return (
		<div className="flex h-screen items-start">
			<Sidebar users={data} />
			<div className="p-6">
				<Outlet />
			</div>
		</div>
	);
}
