import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import UsersContext from '../contexts/users/context';

export default function UserDetails() {
	const params = useParams();
	const { users } = useContext(UsersContext);

	if (!params.id) {
		return <h1>Users id not provided</h1>;
	}

	const user = users.find((user) => user.id === parseInt(params.id as string));

	if (!user) {
		return <h1>User not found</h1>;
	}

	return <h1>Hello, {user.username}!</h1>;
}
