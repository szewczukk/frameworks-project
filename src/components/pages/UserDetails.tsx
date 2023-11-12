import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import { Post, postsSchema } from '@/lib/types';
import UserPost from '../common/UserPost';
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
			const newPosts: Post[] = [];

			responsePosts.forEach((post: Post) => {
				let isOld = posts.some(({ id }) => id === post.id);

				if (!isOld) {
					newPosts.push(post);
				}
			});

			setPosts([...posts, ...newPosts]);

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
							return <UserPost key={postData.id} postData={postData} />;
					  })
					: 'No data'}
			</div>
		</>
	);
}
