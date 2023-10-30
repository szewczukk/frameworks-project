import Sidebar from '../common/Sidebar';

export default function Home() {
	return (
		<div className="flex h-screen items-start">
			<Sidebar />
			<div className="p-4">
				<h1>Hello, world!</h1>
			</div>
		</div>
	);
}
