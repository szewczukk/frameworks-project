import { Dispatch, SetStateAction, createContext, useState } from 'react';
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

type UsersContext = {
	users: User[];
	setUsers: Dispatch<SetStateAction<User[]>>;
};

export const UsersContext = createContext<UsersContext>({
	users: [],
	setUsers: () => {},
});
