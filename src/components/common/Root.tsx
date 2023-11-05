import Sidebar from './Sidebar';
import api from '@/lib/api';
import { Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import NewUserDialog, { FormValues } from './NewUserDialog';
import UsersContext from '../contexts/users/context';

export default function Root() {
	const params = useParams();
	const { users, setUsers } = useContext(UsersContext);
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		(async () => {
			const response = await api.get('/users/');

			setUsers(response.data);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleNewUserButtonClick = () => {
		dialogRef.current?.showModal();
	};

	const handleSubmitNewUser = async (values: FormValues) => {
		dialogRef.current?.close();

		const response = await api.post('/users/', values);

		setUsers([...users, response.data]);
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
			<div className="p-6">
				<Outlet />
			</div>
			<NewUserDialog ref={dialogRef} onSubmit={handleSubmitNewUser} />
		</div>
	);
}
