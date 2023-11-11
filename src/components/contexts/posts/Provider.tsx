import { useState } from 'react';
import PostsContext from './context';
import { Post } from '@/lib/types';

type Props = {
	children: React.ReactNode;
};

export default function PostsProvider({ children }: Props) {
	const [posts, setPosts] = useState<Post[]>([]);

	return (
		<PostsContext.Provider value={{ posts, setPosts }}>
			{children}
		</PostsContext.Provider>
	);
}
