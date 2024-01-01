import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { Comment } from '@/lib/types';

type Props = {
	children: React.ReactNode;
};

export default function CommentsProvider({ children }: Props) {
	const [comments, setComments] = useState<Comment[]>([]);

	return (
		<CommentsContext.Provider value={{ comments, setComments }}>
			{children}
		</CommentsContext.Provider>
	);
}

type CommentsContext = {
	comments: Comment[];
	setComments: Dispatch<SetStateAction<Comment[]>>;
};

export const CommentsContext = createContext<CommentsContext>({
	comments: [],
	setComments: () => {},
});
