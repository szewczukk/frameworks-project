import Sidebar from './Sidebar';
import api from '@/lib/api';
import { Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import NewUserDialog, { FormValues } from './NewUserDialog';
import { UsersContext } from '../contexts/UserContext';
import { userSchema, usersSchema } from '@/lib/types';

export default function Root() {
	const params = useParams();
	const { users, setUsers } = useContext(UsersContext);
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		(async () => {
			const response = await api.get('/users/');

			const responseUsers = usersSchema.parse(response.data);

			setUsers(responseUsers);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleNewUserButtonClick = () => {
		dialogRef.current?.showModal();
	};

	const handleSubmitNewUser = async (values: FormValues) => {
		dialogRef.current?.close();

		const response = await api.post('/users/', values);

		const responseUser = userSchema.parse(response.data);

		setUsers((prev) => [...prev, responseUser]);
	};

	if (!users) {
		return <h1>Loading..</h1>;
	}

	return (
		<div className="flex h-screen items-start">
			<Sidebar
				users={users}
				currentUserId={parseInt(params.id ?? '-1')}
				onNewUserButtonClick={handleNewUserButtonClick}
			/>
			<div className="ml-72 grow p-6">
				<Outlet />
			</div>
			<NewUserDialog ref={dialogRef} onSubmit={handleSubmitNewUser} />
		</div>
	);
}
