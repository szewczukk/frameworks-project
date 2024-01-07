import { useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import { Album, albumsSchema, Post } from '@/lib/types';
import * as z from 'zod';
import { UsersContext } from '../contexts/UserContext';
import AlbumItem from '../common/AlbumItem';

const schema = z.object({
	title: z.string().min(1),
	body: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

export default function AlbumsList() {
	const [isLoading, setIsLoading] = useState(false);
	const { users } = useContext(UsersContext);
	const [albums, setAlbums] = useState<Album[]>([]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const newAlbums: Post[] = [];

			const response = await api.get('/albums');
			const responsePosts = albumsSchema.parse(response.data);
			responsePosts.forEach((album: Album) => {
				let isOld = albums.some(({ id }) => id === album.id);

				if (!isOld) {
					newAlbums.push(album);
				}
			});
			setAlbums([...albums, ...newAlbums]);

			setIsLoading(false);
		})();
	}, []);

	return (
		<div className="flex flex-col items-center">
			<h1 className="mb-10 mt-5 w-full text-center text-xl">Albums</h1>
			<div className="gap flex flex-wrap items-end justify-center gap-7">
				{isLoading
					? 'Loading...'
					: albums.length
					? albums.map((postData: Post) => {
							return (
								<AlbumItem
									key={postData.id}
									album={postData}
									owner={users.find((user) => user.id === postData.userId)}
								/>
							);
					  })
					: 'No data'}
			</div>
		</div>
	);
}
