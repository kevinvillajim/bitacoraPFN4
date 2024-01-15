import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./App.css";
import Roles from "./Pages/Roles";
import Usuarios from "./Pages/Usuarios";
import Bitacoras from "./Pages/Bitacoras";
import Paginas from "./Pages/Paginas";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import {useState, useEffect} from "react";
import Signup from "./Pages/Signup";

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

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/"
						element={
							!isAuthenticated ? <Navigate to="/login" replace /> : <Roles />
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
			</BrowserRouter>
		</>
	);
}

export default App;
