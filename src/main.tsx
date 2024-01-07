import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import UserDetails from './components/pages/UserDetails';
import Root from './components/common/Root';
import UsersProvider from './components/contexts/UserContext';
import PostsProvider from './components/contexts/PostsContext';
import LoginPage from './components/pages/Login';
import AuthProvider from './components/contexts/AuthContext';
import DashboardPage from './components/pages/Dashboard';
import RequireAuth from './components/common/RequireAuth';
import AlbumsList from './components/pages/AlbumsList';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: (
					<RequireAuth>
						<DashboardPage />
					</RequireAuth>
				),
			},
			{
				path: '/users/:id',
				element: (
					<RequireAuth>
						<UserDetails />
					</RequireAuth>
				),
			},
			{
				path: '/albums',
				element: (
					<RequireAuth>
						<AlbumsList />
					</RequireAuth>
				),
			},
		],
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UsersProvider>
			<AuthProvider>
				<PostsProvider>
					<RouterProvider router={router} />
				</PostsProvider>
			</AuthProvider>
		</UsersProvider>
	</React.StrictMode>,
);
