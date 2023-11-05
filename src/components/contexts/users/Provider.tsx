import { useState } from 'react';
import UsersContext from './context';
import { User } from '@/lib/types';

type Props = {
	children: React.ReactNode;
};

export default function UsersProvider({ children }: Props) {
	const [users, setUsers] = useState<User[]>([]);

	return (
		<UsersContext.Provider value={{ users, setUsers }}>
			{children}
		</UsersContext.Provider>
	);
}
