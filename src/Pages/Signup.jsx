import {useNavigate} from "react-router-dom";
import AuthUser from "../components/AuthUser";
import {useState} from "react";

function Signup() {
	const {http} = AuthUser();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();

	const signup = () => {
		setErrorMessage(null);

		// Realiza la solicitud de registro
		http
			.post("/register", {email: email, password: password})
			.then(() => {
				// Si la solicitud de registro es exitosa, realiza la autenticación
				http
					.post("/login", {email: email, password: password})
					.then((res) => {
						// Si la autenticación es exitosa, guarda el token en el almacenamiento local
						localStorage.setItem("token", res.data.token);
						localStorage.setItem("id", res.data.id);
						// Navega a la página "/roles" y recarga la ventana
						navigate("/roles");
						window.location.reload();
					})
					.catch((authError) => {
						// Manejar error de autenticación
						setErrorMessage(
							authError.response?.data?.message || "Error de autenticación"
						);
					});
			})
			.catch((error) => {
				// Manejar error de registro
				if (error.response?.status === 422) {
					setErrorMessage(error.response?.data?.message || "Error de registro");
				} else {
					setErrorMessage("Ocurrió un error durante el registro");
				}
			});
	};

	return (
		<>
			<div className="w-screen h-screen bg-[#F9EBEA]">
				<div className="flex flex-col items-center">
					<img className="w-[10rem] my-[1rem]" src="logo.png" alt="logo" />
					<div className="w-[20rem] p-[1rem] bg-[#fff] text-center space-y-[1rem] shadow-lg">
						<h2 className="text-[#797675]">Registrate</h2>
						<div className="space-y-[1rem]">
							<div className="relative">
								{errorMessage && (
									<span className="text-[red] text-[13px] font-semibold">
										{errorMessage}
									</span>
								)}
								<input
									className="w-[100%] h-[2.3rem] border border-slate-300 rounded-md px-[1rem] text-[#797675]"
									type="email"
									name="email"
									placeholder="Email"
									id="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
								<span className="material-symbols-outlined absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[#797675]">
									mail
								</span>
							</div>
							<div className="relative">
								<input
									className="w-[100%] h-[2.3rem] border border-slate-300 rounded-md px-[1rem] text-[#797675]"
									type="password"
									name="password"
									placeholder="Password"
									id="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<span className="material-symbols-outlined absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[#797675]">
									lock
								</span>
							</div>
							<div className="w-[100%] flex justify-end">
								<input
									className="py-[0.4rem] px-[0.8rem] bg-[#dba18a] text-[#fff] rounded-md w-[100%]"
									type="button"
									value="Ingresar"
									onClick={signup}
								/>
							</div>
							<div className="w-[100%] flex justify-between">
								<p>Ya eres miembro?</p>

								<div>
									<a href="/login" className="text-[#dba18a]">
										<span>Inicia Sesión</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Signup;
