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
	const [userId, setUserId] = useState<number | undefined>();

	function signIn(userId: number) {
		setUserId(userId);
	}

	function logout() {
		setUserId(undefined);
	}

	return (
		<AuthContext.Provider value={{ userId, logout, signIn }}>
			{children}
		</AuthContext.Provider>
	);
}
