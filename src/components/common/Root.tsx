import { useMutation, useQuery, useQueryClient } from 'react-query';
import Sidebar from './Sidebar';
import api from '@/lib/api';
import { Outlet, useParams } from 'react-router-dom';
import { User } from '@/lib/types';
import { useRef } from 'react';
import NewUserDialog, { FormValues } from './NewUserDialog';
import { AxiosResponse } from 'axios';

export default function Root() {
	const params = useParams();
	const queryClient = useQueryClient();
	const dialogRef = useRef<HTMLDialogElement>(null);
	const { isLoading, data, error } = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => api.get('/users/').then((res) => res.data),
		staleTime: Infinity,
	});
	const mutation = useMutation<AxiosResponse<User>, unknown, FormValues>({
		mutationFn: (variables) => api.post('/users/', variables),
		onSuccess(response) {
			queryClient.setQueryData<User[]>(['users'], (users) => {
				if (!users) {
					return [response.data];
				}
				return [...users, response.data];
			});
			queryClient.setQueryData<User>(
				['user', response.data.id],
				() => response.data,
			);
			dialogRef.current?.close();
		},
	});

	const handleNewUserButtonClick = () => {
		dialogRef.current?.showModal();
	};

	if (isLoading) {
		return <h1>Loading..</h1>;
	}

	if (error || !data) {
		return <h1>Error</h1>;
	}

	return (
		<div className="flex h-screen items-start">
			<Sidebar
				users={data}
				currentUserId={parseInt(params.id ?? '-1')}
				onNewUserButtonClick={handleNewUserButtonClick}
			/>
			<div className="p-6">
				<Outlet />
			</div>
			<NewUserDialog
				ref={dialogRef}
				onSubmit={(values) => {
					mutation.mutate(values);
				}}
			/>
		</div>
	);
}
