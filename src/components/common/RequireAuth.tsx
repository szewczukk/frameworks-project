import { ReactNode } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

type Props = {
	children: ReactNode;
};

export default function RequireAuth({ children }: Props) {
	const { userId } = useAuthContext();

	if (!userId) {
		return <Navigate to="/login" />;
	}

	return children;
}
