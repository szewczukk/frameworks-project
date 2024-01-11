import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import { Post, postsSchema } from '@/lib/types';
import UserPost from '../common/UserPost';
import * as z from 'zod';
import { UsersContext } from '../contexts/UserContext';
import { useAuthContext } from '../contexts/AuthContext';

const schema = z.object({
	title: z.string().min(1),
	body: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

export default function UserDetails() {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const { users } = useContext(UsersContext);
	const [posts, setPosts] = useState<Post[]>([]);
	const { userId } = useAuthContext();

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const response = await api.get(`/users/${params.id}/posts`);
			const responsePosts = postsSchema.parse(response.data);

			setPosts(responsePosts);

			setIsLoading(false);
		})();
	}, [params.id]);

	if (!params.id) {
		return <h1>Users id not provided</h1>;
	}

	const user = users.find((user) => user.id === parseInt(params.id as string));

	if (!user) {
		return <h1>User not found</h1>;
	}

	return (
		<div className="flex flex-col items-center">
			<h1 className="mb-10 mt-5 w-full text-center text-xl">{user.username}</h1>
			<div className="gap flex flex-wrap items-end justify-center gap-7">
				{isLoading
					? 'Loading...'
					: posts.length
					? posts.map((postData) => {
							return (
								<UserPost
									key={postData.id}
									postData={postData}
									isOwner={postData.userId === userId}
									owner={users.find((user) => user.id === postData.userId)!}
									setPosts={setPosts}
								/>
							);
					  })
					: 'No data'}
			</div>
		</div>
	);
}
