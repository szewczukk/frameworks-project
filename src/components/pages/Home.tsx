import { useQuery } from 'react-query';
import Sidebar, { User } from '../common/Sidebar';
import api from '../../lib/api';

export default function Home() {
	const { isLoading, data } = useQuery({
		queryKey: ['usersData'],
		queryFn: () => api.get('/users/').then((res) => res.data),
	});

	if (isLoading) {
		return <h1>Loading..</h1>;
	}

	return (
		<div className="flex h-screen items-start">
			<Sidebar users={data as User[]} />
			<div className="p-4">
				<h1>Hello, world!</h1>
			</div>
		</div>
	);
}
