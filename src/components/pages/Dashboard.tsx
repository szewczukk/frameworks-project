import { useAuthContext } from '../contexts/AuthContext';

export default function DashboardPage() {
	const { userId } = useAuthContext();

	return <h1>Hello, {userId}</h1>;
}
