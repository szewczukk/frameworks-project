import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export default function Drawer({ children }: Props) {
	return (
		<div className="drawer lg:drawer-open">
			<input id="nav-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col items-center justify-center">
				<label
					htmlFor="nav-drawer"
					className="btn btn-primary drawer-button lg:hidden"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block h-6 w-6 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</label>
				{children}
			</div>
			<div className="drawer-side">
				<label
					htmlFor="nav-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
					<li>
						<a>Sidebar Item 1</a>
					</li>
					<li>
						<a>Sidebar Item 2</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
