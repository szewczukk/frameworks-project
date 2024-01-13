import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import api from '@/lib/api';
import {
	Album,
	albumSchema,
	albumsSchema,
	Photo,
	photosSchema,
} from '@/lib/types';
import { UsersContext } from '../contexts/UserContext';
import { useAuthContext } from '../contexts/AuthContext';
import NewAlbumDialog, { FormValues } from '../common/NewAlbumDialog';
import { useParams } from 'react-router-dom';
import PhotoItem from '../common/PhotoItem';
import NewPhotoDialog from '../common/NewPhotoDialog';

export default function PhotosList() {
	const params = useParams();
	const newPhotoRef = useRef<HTMLDialogElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { users } = useContext(UsersContext);
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [albums, setAlbums] = useState<Album[]>([]);
	const [selectedUserFilter, setSelectedUserFilter] = useState(-1);
	const { userId } = useAuthContext();

	useEffect(() => {
		(async () => {
			setIsLoading(true);

			const url =
				params.id === 'all' ? '/photos' : `/albums/${params.id}/photos`;

			const response = await api.get(url);
			const responsePhotos = photosSchema.parse(response.data);

			setPhotos(responsePhotos);

			const albumsRes = await api.get('/albums');
			const responseAlbums = albumsSchema.parse(albumsRes.data);

			setAlbums(responseAlbums);

			setIsLoading(false);
		})();
	}, []);

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedUserFilter(parseInt(e.target.value));
	};

	const handleNewPhotoDialog = async (values: FormValues) => {
		newPhotoRef.current?.close();

		const response = await api.post(`/photos`, {
			title: values.title,
			albumId: params.id,
			userId,
			url: values.url,
			thumbnailUrl: values.url,
		});

		setPhotos((prev) => [...prev, response.data]);
	};

	const handleShowDialog = () => {
		newPhotoRef.current?.showModal();
	};

	const deletePhoto = async (id: number) => {
		await api.delete(`/photos/${id}`);

		setPhotos((prevPosts) => prevPosts.filter((post) => post.id !== id));
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="mb-10 mt-5 w-full text-center text-xl">
				{(params.id !== 'all' ? 'Album ' + params.id : 'All') + ' Photos'}
			</h1>
			<div className="mb-10 flex items-center gap-4">
				{params.id !== 'all' ? (
					<button
						className="w-64 rounded border-2 border-black bg-slate-100 py-2 text-center text-black transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none"
						onClick={handleShowDialog}
					>
						ADD NEW PHOTO
					</button>
				) : (
					<select
						className="border border-black"
						onChange={handleChange}
						value={selectedUserFilter}
					>
						<option value="-1">All</option>
						{users.map((user) => (
							<option key={user.id} value={user.id}>
								{user.username}
							</option>
						))}
					</select>
				)}
			</div>

			<NewPhotoDialog onSubmit={handleNewPhotoDialog} ref={newPhotoRef} />
			<div className="gap flex flex-wrap items-end justify-center gap-7">
				{isLoading
					? 'Loading...'
					: photos.length
					? photos
							.filter((photo) => {
								if (selectedUserFilter === -1) {
									return true;
								}

								const photoAlbum = albums.find(
									(album) => album.id === photo.albumId,
								);

								return photoAlbum.userId === selectedUserFilter;
							})
							.map((photo) => {
								const photoOwnerId = albums.find(
									(album) => album.id == photo.albumId,
								)?.userId;

								return (
									<PhotoItem
										key={photo.id}
										photo={photo}
										owner={users.find((user) => user.id == photoOwnerId)!}
										handleDelete={deletePhoto}
									/>
								);
							})
					: 'No data'}
			</div>
		</div>
	);
}
