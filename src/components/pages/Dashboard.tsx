import { z } from 'zod';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

const userSchema = z.object({
	id: z.number(),
	name: z.string(),
	username: z.string(),
	email: z.string(),
	address: z.object({
		street: z.string(),
		suite: z.string(),
		city: z.string(),
		zipcode: z.string(),
		geo: z.object({
			lat: z.string(),
			lng: z.string(),
		}),
	}),
	phone: z.string(),
	website: z.string(),
	company: z.object({
		name: z.string(),
		catchPhrase: z.string(),
		bs: z.string(),
	}),
});

type User = z.infer<typeof userSchema>;

export default function DashboardPage() {
	const { userId } = useAuthContext();
	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		(async () => {
			const result = await api.get(`/users/${userId}`);
			const responseUser = userSchema.parse(result.data);

			setUser(responseUser);
		})();
	}, []);

	return (
		<div>
			{user ? (
				<>
					<h1>Hello, {user.name}</h1>
				</>
			) : (
				<p>Loading..</p>
			)}
		</div>
	);
}
