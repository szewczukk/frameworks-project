import { User } from '@/lib/types';
import { Dispatch, SetStateAction, createContext } from 'react';

type UsersContext = {
	users: User[];
	setUsers: Dispatch<SetStateAction<User[]>>;
};

const UsersContext = createContext<UsersContext>({
	users: [],
	setUsers: () => {},
});

export default UsersContext;
