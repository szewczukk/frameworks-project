import { User } from '@/lib/types';
import { createContext } from 'react';

type UsersContext = {
	users: User[];
	setUsers: (prev: User[]) => void;
};

const UsersContext = createContext<UsersContext>({
	users: [],
	setUsers: () => {},
});

export default UsersContext;
