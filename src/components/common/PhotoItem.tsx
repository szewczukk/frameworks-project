import { Photo, User } from '@/lib/types';

export default function PhotoItem({
	photo,
	owner,
	handleDelete,
}: {
	photo: Photo;
	owner: User;
	handleDelete: (id: number) => void;
}) {
	const { title, thumbnailUrl } = photo;

	return (
		<div className="h-120 mb-8 flex w-[30%] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 text-center shadow">
			<div className="h-24">
				<b>Photo title: </b>
				{title}
			</div>
			<div className="mb-2">
				<b>Owner: </b>
				{owner?.username}
			</div>
			<img className="m-auto h-64 w-64" src={thumbnailUrl} alt={title} />
			<button
				disabled={owner?.id !== 1}
				onClick={() => handleDelete(photo.id)}
				className="w-100 mt-5 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none disabled:border-0 disabled:bg-slate-50 disabled:text-slate-500"
			>
				DELETE PHOTO
			</button>
		</div>
	);
}
