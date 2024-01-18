import "./App.css";
import {
	// BrowserRouter,
	// Route,
	// Routes,
	Navigate,
	createHashRouter,
	RouterProvider,
} from "react-router-dom";
import Roles from "./Pages/Roles";
import Usuarios from "./Pages/Usuarios";
import Bitacoras from "./Pages/Bitacoras";
import Paginas from "./Pages/Paginas";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import {useState, useEffect} from "react";
import Profile from "./Pages/Profile";
import ProfileEdit from "./Pages/ProfileEdit";

function App() {
	const [token, setToken] = useState(localStorage.getItem("token"));
	useEffect(() => {
		const handleStorageChange = () => {
			setToken(localStorage.getItem("token"));
		};
		window.addEventListener("storage", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);
	const handleLogin = (newToken) => {
		setToken(newToken);
	};
	// Verificar si el usuario está autenticado
	const isAuthenticated = !!token;

	const router = createHashRouter([
		{
			path: "/",
			element: !isAuthenticated ? (
				<Navigate to="/login" replace />
			) : (
				<Profile />
			),
		},
		{
			path: "/login",
			element: isAuthenticated ? (
				<Navigate to="/usuarios" replace />
			) : (
				<Login onLogin={handleLogin} />
			),
		},
		{
			path: "/profile",
			element: !isAuthenticated ? (
				<Navigate to="/login" replace />
			) : (
				<Profile />
			),
		},
		{
			path: "/edit-profile",
			element: !isAuthenticated ? (
				<Navigate to="/login" replace />
			) : (
				<ProfileEdit />
			),
		},
		{
			path: "/usuarios",
			element: !isAuthenticated ? (
				<Navigate to="/login" replace />
			) : (
				<Usuarios />
			),
		},
		{
			path: "/roles",
			element: !isAuthenticated ? <Navigate to="/login" replace /> : <Roles />,
		},
		{
			path: "/bitacoras",
			element: !isAuthenticated ? (
				<Navigate to="/login" replace />
			) : (
				<Bitacoras />
			),
		},
		{
			path: "/paginas",
			element: !isAuthenticated ? (
				<Navigate to="/login" replace />
			) : (
				<Paginas />
			),
		},
		{
			path: "/signup",
			element: <Signup />,
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return (
		<>
			<RouterProvider router={router} />

			{/* <BrowserRouter>
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/"
						element={
							!isAuthenticated ? <Navigate to="/login" replace /> : <Profile />
						}
					/>
					<Route
						path="/login"
						element={
							isAuthenticated ? (
								<Navigate to="/usuarios" replace />
							) : (
								<Login onLogin={handleLogin} />
							)
						}
					/>
					<Route
						path="/profile"
						element={
							!isAuthenticated ? <Navigate to="/login" replace /> : <Profile />
						}
					/>
					<Route
						path="/edit-profile"
						element={
							!isAuthenticated ? (
								<Navigate to="/login" replace />
							) : (
								<ProfileEdit />
							)
						}
					/>
					<Route
						path="/usuarios"
						element={
							!isAuthenticated ? <Navigate to="/login" replace /> : <Usuarios />
						}
					/>
					<Route
						path="/roles"
						element={
							!isAuthenticated ? <Navigate to="/login" replace /> : <Roles />
						}
					/>
					<Route
						path="/bitacoras"
						element={
							!isAuthenticated ? (
								<Navigate to="/login" replace />
							) : (
								<Bitacoras />
							)
						}
					/>
					<Route
						path="/paginas"
						element={
							!isAuthenticated ? <Navigate to="/login" replace /> : <Paginas />
						}
					/>
				</Routes>
			</BrowserRouter> */}
		</>
	);
}

export default App;
