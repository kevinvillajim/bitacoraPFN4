import {useNavigate} from "react-router-dom";
import AuthUser from "../components/AuthUser";
import {useState} from "react";

function Login() {
	const {http} = AuthUser();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();

	const login = () => {
		setErrorMessage(null);
		http.post("/login", {email: email, password: password}).then((res) => {
			console.log(res.data);
			if (!res.data.status) {
				setErrorMessage(res.data.message);
			} else {
				console.log(res.data);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("id", res.data.id);
				navigate("/roles");
				window.location.reload();
			}
		});
	};

	return (
		<>
			<div className="w-screen h-screen bg-[#F9EBEA]">
				<div className="flex flex-col items-center">
					<img className="w-[10rem] my-[1rem]" src="logo.png" alt="logo" />
					<div className="w-[20rem] p-[1rem] bg-[#fff] text-center space-y-[1rem] shadow-lg">
						<h2 className="text-[#797675]">Bienvenido Ingresa con tu cuenta</h2>
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
									onClick={login}
								/>
							</div>
							<div className="w-[100%] flex justify-between">
								<p>No tienes cuenta?</p>

								<div>
									<a href="/bitacoraPFN4/#/signup" className="text-[#dba18a]">
										<span>Registrate</span>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-[#fff] opacity-25 mt-[1rem] rounded-md shadow-md hover:opacity-100">
						<h3 className="px-[1rem] py-[0.5rem] font-bold">
							Información de Acceso
						</h3>
						<hr />
						<div className="px-[1rem] py-[0.5rem] space-y-[0.15rem]">
							<h3 className="font-bold">Admin</h3>
							<h5>user: admin@admin</h5>
							<h5>pass: 123456</h5>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
