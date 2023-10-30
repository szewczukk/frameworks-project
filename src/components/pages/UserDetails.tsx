import { useQuery, useQueryClient } from 'react-query';
import Sidebar, { User } from '../common/Sidebar';
import api from '../../lib/api';
import { useParams } from 'react-router-dom';

export default function UserDetails() {
	const params = useParams();
	const queryClient = useQueryClient();
	const { isLoading, data, error } = useQuery<User>({
		queryKey: ['users', params.id],
		queryFn: () => api.get(`/users/${params.id}/`).then((res) => res.data),
	});

	if (isLoading) {
		return <h1>Loading..</h1>;
	}

	if (error || !data) {
		return <h1>Error</h1>;
	}

	return (
		<div className="flex h-screen items-start">
			<Sidebar users={queryClient.getQueryData(['users'])!} />
			<div className="p-6">
				<h1>Hello, {data.username}!</h1>
			</div>
		</div>
	);
}
