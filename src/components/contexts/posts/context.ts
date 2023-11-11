import { Post, User } from '@/lib/types';
import { Dispatch, SetStateAction, createContext } from 'react';

type PostsContext = {
	posts: Post[];
	setPosts: Dispatch<SetStateAction<Post[]>>;
};

const PostsContext = createContext<PostsContext>({
	posts: [],
	setPosts: () => {},
});

export default PostsContext;
