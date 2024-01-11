import { useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import { Album, albumsSchema } from '@/lib/types';
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

			const response = await api.get('/albums');
			const responseAlbums = albumsSchema.parse(response.data);

			setAlbums(responseAlbums);

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
					? albums.map((album) => {
							return (
								<AlbumItem
									key={album.id}
									album={album}
									owner={users.find((user) => user.id === album.userId)!}
								/>
							);
					  })
					: 'No data'}
			</div>
		</div>
	);
}
