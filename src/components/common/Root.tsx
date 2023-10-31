import { useQuery } from 'react-query';
import Sidebar from './Sidebar';
import api from '../../lib/api';
import { Outlet, useParams } from 'react-router-dom';
import { User } from '../../lib/types';

export default function Root() {
	const params = useParams();
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
			<Sidebar users={data} currentUserId={parseInt(params.id ?? '-1')} />
			<div className="p-6">
				<Outlet />
			</div>
		</div>
	);
}
