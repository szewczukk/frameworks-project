import { ChangeEvent, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import { Album, albumsSchema } from '@/lib/types';
import * as z from 'zod';
import { UsersContext } from '../contexts/UserContext';
import AlbumItem from '../common/AlbumItem';
import { useAuthContext } from '../contexts/AuthContext';

const schema = z.object({
	title: z.string().min(1),
	body: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

export default function AlbumsList() {
	const [isLoading, setIsLoading] = useState(false);
	const { users } = useContext(UsersContext);
	const [albums, setAlbums] = useState<Album[]>([]);
	const [selectedUserFilter, setSelectedUserFilter] = useState(-1);
	const { userId } = useAuthContext();

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const response = await api.get('/albums');
			const responseAlbums = albumsSchema.parse(response.data);

			setAlbums(responseAlbums);

			setIsLoading(false);
		})();
	}, []);

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedUserFilter(parseInt(e.target.value));
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="mb-10 mt-5 w-full text-center text-xl">Albums</h1>
			<select className="mb-10 border border-black" onChange={handleChange}>
				<option value="-1" selected>
					All
				</option>
				{users.map((user) => (
					<option value={user.id}>{user.username}</option>
				))}
			</select>
			<div className="gap flex flex-wrap items-end justify-center gap-7">
				{isLoading
					? 'Loading...'
					: albums.length
					? albums
							.filter((album) => {
								if (selectedUserFilter === -1) {
									return true;
								}

								return album.userId === userId;
							})
							.map((album) => {
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
