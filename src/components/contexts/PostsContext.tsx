import { Post } from '@/lib/types';
import { Dispatch, SetStateAction, createContext } from 'react';
import { useState } from 'react';

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

type PostsContext = {
	posts: Post[];
	setPosts: Dispatch<SetStateAction<Post[]>>;
};

export const PostsContext = createContext<PostsContext>({
	posts: [],
	setPosts: () => {},
});
