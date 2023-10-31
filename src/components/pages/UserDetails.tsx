import { useQuery } from 'react-query';
import api from '@/lib/api';
import { useParams } from 'react-router-dom';
import { User } from '@/lib/types';

export default function UserDetails() {
	const params = useParams();
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

	return <h1>Hello, {data.username}!</h1>;
}
