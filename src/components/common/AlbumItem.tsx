import { Album, User } from '@/lib/types';
import { Link } from 'react-router-dom';

export default function AlbumItem({
	album,
	owner,
}: {
	album: Album;
	owner: User;
}) {
	const { id, title } = album;

	return (
		<div className="mb-8 flex h-64 w-[30%] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 text-center shadow">
			<div className="h-24">
				<b>Album name: </b>
				{title}
			</div>
			<div>
				<b>Owner: </b>
				{owner?.username}
			</div>
			<button className="w-100 rounded border bg-slate-500 py-2 text-slate-50 transition-colors hover:border-slate-500 hover:bg-transparent hover:text-slate-500 focus:outline-none disabled:border-0 disabled:bg-slate-50 disabled:text-slate-500">
				<Link className="w-100 h-100 block" to={`/albums/${id}`}>
					OPEN ALBUM
				</Link>
			</button>
		</div>
	);
}
