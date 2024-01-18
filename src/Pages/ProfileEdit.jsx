import {useState} from "react";
import SideBar from "../components/SideBar";
import "../App.css";
import ModalUser from "../components/ModalUser";
import Header from "../components/Header";
import {useEffect} from "react";
import {useFetch} from "../components/useFetch";

const logo = "/logo.png";
const name = "Kevin";
const rol = "admin";

const sideBarOptions = [
	{link: "/bitacoraPFN4/#/roles/", icon: "manage_accounts", name: "Roles"},
	{link: "/bitacoraPFN4/#/usuarios/", icon: "co_present", name: "Usuarios"},
	{link: "/bitacoraPFN4/#/bitacoras/", icon: "menu_book", name: "Bitacoras"},
	{link: "/bitacoraPFN4/#/paginas/", icon: "link", name: "Paginas"},
];

function ProfileEdit() {
	const userId = localStorage.getItem("id");
	const url = `http://127.0.0.1:8000/api/usuarios/${userId}`;
	const {data, loading, error} = useFetch(url);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!loading && !error && data) {
					//console.log("Correcto");
				}
			} catch (error) {
				console.error("Error al obtener datos del usuario:", error);
			}
		};

		fetchData();
	}, [data, loading, error]);

	const url2 = `http://127.0.0.1:8000/api/personas/${userId}`;
	const {data: data2, loading: loading2, error: error2} = useFetch(url2);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!loading2 && !error2 && data2) {
					//console.log("Correcto");
				}
			} catch (error2) {
				console.error("Error al obtener datos de la persona:", error2);
			}
		};

		fetchData();
	}, [data2, loading2, error2]);

	const [formulario, setFormulario] = useState({
		primer_nombre: "",
		primer_apellido: "",
		bio: "",
		phone: "",
		usuario_modificacion: "",
		email: "",
		password: "",
		img: "",
		usuario_creacion: "",
		habilitado: "",
		fecha: "",
	});

	useEffect(() => {
		if (data && data2) {
			setFormulario({
				primer_nombre: data2.primer_nombre,
				primer_apellido: data2.primer_apellido,
				bio: data2.bio,
				phone: data2.phone,
				email: data.email,
				password: data.password,
				img: data.img,
				usuario_creacion: data2.usuario_creacion,
				usuario_modificacion: localStorage.getItem("id"),
				habilitado: data.habilitado,
				fecha: data.fecha,
			});
		}
	}, [data, data2]);

	const manejarCambio = (e) => {
		if (e.target.name === "img") {
			let reader = new FileReader();
			reader.onloadend = () => {
				setFormulario({
					...formulario,
					img: reader.result,
				});
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			setFormulario({
				...formulario,
				[e.target.name]: e.target.value,
			});
		}
	};

	const manejarEnvio = async () => {
		const datosFormulario = JSON.stringify(formulario);
		const urlsAPI = [
			`http://127.0.0.1:8000/api/usuarios/${userId}`,
			`http://127.0.0.1:8000/api/personas/${userId}`,
		];

		// Utilizar Promise.all para esperar a que todas las peticiones se completen
		Promise.all(
			urlsAPI.map((url) =>
				fetch(url, {
					method: "PUT",
					body: datosFormulario,
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						return response.text();
					})
					.then((text) => {
						try {
							const data = JSON.parse(text);
							console.log(data);
						} catch (error) {
							console.log(error);
						}
					})
					.catch((error) => {
						console.error("Error:", error);
					})
			)
		)
			.then(() => {
				// Todas las peticiones han sido completadas con éxito
				// Recargar la página
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error en alguna de las peticiones:", error);
			});
	};

	const [showMenu, setShowMenu] = useState(true);
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<div className={showMenu ? "grid grid-cols-1 md:grid-cols-5" : "flex"}>
				<div
					className={showMenu ? "col-span-1 md:col-span-1 h-screen" : "hidden"}
				>
					<SideBar logo={logo} name={name} rol={rol} options={sideBarOptions} />
				</div>
				<div className={showMenu ? "col-span-1 md:col-span-4" : "w-screen"}>
					<div>
						<Header
							name={name}
							avatar={"/avatar.png"}
							setShowMenu={setShowMenu}
							setShowModal={setShowModal}
						/>
					</div>
					<div className={showModal ? "inline" : "hidden"}>
						<ModalUser />
					</div>
					<div className="p-[2rem] bg-[#e3e3e3] h-full">
						<div className="h-[100%] w-[90%] bg-white px-[6rem] py-[4rem]">
							<div id="body-container">
								<section id="back-container" className="mb-1">
									<a
										href="/bitacoraPFN4/#/profile"
										id="back"
										className="text-[#dba18a] text-lg font-medium flex items-center"
									>
										<span className="material-symbols-outlined">
											{" "}
											arrow_back_ios{" "}
										</span>{" "}
										Back
									</a>
								</section>
								<section
									id="profile-card-container2"
									className="p-3 border border-solid border-gray-300 rounded-xl"
								>
									<div id="profile-container2" className="mb-1">
										<div id="profile-info-container">
											<h4 id="profile" className="text-lg font-medium">
												Change Info
											</h4>
											<p id="profile-about" className="text-gray-500">
												Changes will be reflected to every service
											</p>
										</div>
									</div>
									<form id="frm-edit">
										<div
											id="photo-t-container"
											className="flex items-center my-[2rem]"
										>
											<div className="photo-container relative">
												<img
													id="photo"
													alt="profile-photo"
													src={formulario.img}
													className="w-[100px] h-[100px]"
												/>

												<label
													htmlFor="img"
													className="absolute bottom-[15%] right-[38%] cursor-pointer"
												>
													<span
														id="change-photo-icon"
														className="material-symbols-outlined"
													>
														photo_camera
													</span>
													<input
														id="img"
														type="file"
														accept="image/*"
														name="img"
														className="hidden"
														onChange={manejarCambio}
													/>
												</label>
											</div>
											<div id="photo-text-container" className="ml-2">
												<h6 id="name-title2" className="title-profile">
													CHANGE PHOTO
												</h6>
											</div>
										</div>
										<div className="frm-container mb-[1rem] flex flex-col">
											<label
												className="frm-label mb-[10px]"
												htmlFor="frm-input-name"
											>
												Name
											</label>
											<input
												className="frm-input bg-[#f6e8e0] py-[0.6rem] px-[1rem] rounded-xl"
												name="primer_nombre"
												id="frm-input-name"
												type="text"
												placeholder="Enter your name..."
												value={formulario.primer_nombre || ""}
												onChange={manejarCambio}
											/>
											<label
												className="frm-label  my-[10px]"
												htmlFor="frm-input-lastname"
											>
												Last Name
											</label>
											<input
												className="frm-input bg-[#f6e8e0] py-[0.6rem] px-[1rem] rounded-xl"
												name="primer_apellido"
												id="frm-input-lastname"
												type="text"
												placeholder="Enter your lastname..."
												value={formulario.primer_apellido || ""}
												onChange={manejarCambio}
											/>
										</div>
										<div className="frm-container mb-[1rem] flex flex-col">
											<label
												className="frm-label mb-[10px]"
												htmlFor="frm-input-bio"
											>
												Bio
											</label>
											<input
												className="frm-input bg-[#f6e8e0] py-[0.6rem] px-[1rem] rounded-xl"
												name="bio"
												id="frm-input-bio"
												type="text"
												placeholder="Enter your bio..."
												value={formulario.bio || ""}
												onChange={manejarCambio}
											/>
										</div>
										<div className="frm-container mb-[1rem] flex flex-col">
											<label
												className="frm-label mb-[10px]"
												htmlFor="frm-input-phone"
											>
												Phone
											</label>
											<input
												className="frm-input bg-[#f6e8e0] py-[0.6rem] px-[1rem] rounded-xl"
												name="phone"
												id="frm-input-phone"
												type="text"
												placeholder="Enter your phone..."
												value={formulario.phone || ""}
												onChange={manejarCambio}
											/>
										</div>
										<div className="frm-container mb-[1rem] flex flex-col">
											<label
												className="frm-label mb-[10px]"
												htmlFor="frm-input-email"
											>
												Email
											</label>
											<input
												className="frm-input bg-[#f6e8e0] py-[0.6rem] px-[1rem] rounded-xl"
												name="email"
												id="frm-input-email"
												type="email"
												placeholder="Enter your email..."
												value={formulario.email || ""}
												required
												onChange={manejarCambio}
											/>
										</div>
										<div className="frm-container mb-[1rem] flex flex-col">
											<label
												className="frm-label mb-[10px]"
												htmlFor="frm-input-password"
											>
												Password
											</label>
											<input
												className="frm-input bg-[#f6e8e0] py-[0.6rem] px-[1rem] rounded-xl"
												name="password"
												id="frm-input-password"
												type="password"
												placeholder="Enter your password..."
												value={formulario.password || ""}
												required
												onChange={manejarCambio}
											/>
											<input
												className="hidden"
												name="usuario_modificacion"
												type="text"
												value={localStorage.getItem("id")}
												readOnly
											/>
										</div>
										<input
											id="btn-frm"
											type="button"
											value="Save"
											className="w-24 h-10 bg-[#dba18a] text-white font-medium rounded border-none"
											onClick={manejarEnvio}
										/>
									</form>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfileEdit;
