import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import { postsSchema } from '@/lib/types';
import Post from '../common/Post';
import { UsersContext } from '../contexts/UserContext';
import { PostsContext } from '../contexts/PostsContext';

export default function UserDetails() {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const { users } = useContext(UsersContext);
	const { posts, setPosts } = useContext(PostsContext);

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
		<>
			<h1 className="mb-10 mt-5 w-full text-center text-xl">
				Hello, {user.username}!
			</h1>

			<div className="gap flex flex-wrap items-end justify-center gap-7">
				{isLoading
					? 'Loading...'
					: posts.length
					? posts.map((postData) => {
							return <Post key={postData.id} postData={postData} />;
					  })
					: 'No data'}
			</div>
		</>
	);
}
