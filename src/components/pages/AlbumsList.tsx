import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import api from '@/lib/api';
import { Album, albumSchema, albumsSchema } from '@/lib/types';
import { UsersContext } from '../contexts/UserContext';
import AlbumItem from '../common/AlbumItem';
import { useAuthContext } from '../contexts/AuthContext';
import NewAlbumDialog, { FormValues } from '../common/NewAlbumDialog';

export default function AlbumsList() {
	const newAlbumRef = useRef<HTMLDialogElement>(null);
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

	const handleNewAlbumDialog = async (values: FormValues) => {
		newAlbumRef.current?.close();

		const response = await api.post('/posts/', { title: values.title, userId });
		const responseAlbum = albumSchema.parse(response.data);

		setAlbums((prev) => [...prev, responseAlbum]);
	};

	const handleShowDialog = () => {
		newAlbumRef.current?.showModal();
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="mb-10 mt-5 w-full text-center text-xl">Albums</h1>
			<div className="mb-10 flex items-center gap-4">
				<button
					className="w-64 rounded border-2 border-black bg-slate-100 py-2 text-center text-black transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
					onClick={handleShowDialog}
				>
					ADD NEW ALBUM
				</button>
				<select className="border border-black" onChange={handleChange}>
					<option value="-1" selected>
						All
					</option>
					{users.map((user) => (
						<option value={user.id}>{user.username}</option>
					))}
				</select>
			</div>
			<NewAlbumDialog onSubmit={handleNewAlbumDialog} ref={newAlbumRef} />
			<div className="gap flex flex-wrap items-end justify-center gap-7">
				{isLoading
					? 'Loading...'
					: albums.length
					? albums
							.filter((album) => {
								if (selectedUserFilter === -1) {
									return true;
								}

								return album.userId === selectedUserFilter;
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
