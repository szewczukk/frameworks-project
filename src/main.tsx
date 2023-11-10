import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './components/pages/Home';
import UserDetails from './components/pages/UserDetails';
import Root from './components/common/Root';
import PostsProvider from './components/contexts/posts/Provider';
import UsersProvider from './components/contexts/UserContext';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/users/:id',
				element: <UserDetails />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UsersProvider>
			<PostsProvider>
				<RouterProvider router={router} />
			</PostsProvider>
		</UsersProvider>
	</React.StrictMode>,
);
