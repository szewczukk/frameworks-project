import { createContext, useContext, useState } from 'react';

type Props = {
	children: React.ReactNode;
};

type Context = {
	userId: number | undefined;
	signIn: (userId: number) => void;
	logout: () => void;
};

const AuthContext = createContext<Context>(null!);

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }: Props) {
	const localStorageUserId = localStorage.getItem('userId');
	const [userId, setUserId] = useState<number | undefined>(
		parseInt(localStorageUserId ?? '') || undefined,
	);

	function signIn(newUserId: number) {
		setUserId(newUserId);
		localStorage.setItem('userId', newUserId.toString());
	}

	function logout() {
		setUserId(undefined);
		localStorage.removeItem('userId');
	}

	return (
		<AuthContext.Provider value={{ userId, logout, signIn }}>
			{children}
		</AuthContext.Provider>
	);
}
