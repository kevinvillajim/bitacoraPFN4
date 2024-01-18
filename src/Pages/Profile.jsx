import {useEffect, useState} from "react";
import SideBar from "../components/SideBar";
import "../App.css";
import ModalUser from "../components/ModalUser";
import Header from "../components/Header";
import {useFetch} from "../components/useFetch.js";

const logo = "/logo.png";

const sideBarOptions = [
	{link: "/bitacoraPFN4/#/roles/", icon: "manage_accounts", name: "Roles"},
	{link: "/bitacoraPFN4/#/usuarios/", icon: "co_present", name: "Usuarios"},
	{link: "/bitacoraPFN4/#/bitacoras/", icon: "menu_book", name: "Bitacoras"},
	{link: "/bitacoraPFN4/#/paginas/", icon: "link", name: "Paginas"},
];

function Profile() {
	const [showMenu, setShowMenu] = useState(true);
	const [showModal, setShowModal] = useState(false);

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

	// Llamada a la API para obtener otros datos (por ejemplo, datos de personas)
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

	const nombreCompleto =
		data2 && data2.primer_nombre + " " + data2.primer_apellido;

	let userName = nombreCompleto;
	let bio = data2 && data2.bio;
	let phone = data2 && data2.phone;
	let email = data && data.email;
	let contrasena = "***********************************************";
	let photo = data && data.img;

	return (
		<>
			<div className={showMenu ? "grid grid-cols-1 md:grid-cols-5" : "flex"}>
				<div
					className={showMenu ? "col-span-1 md:col-span-1 h-screen" : "hidden"}
				>
					<SideBar
						logo={logo}
						name={userName}
						email={email}
						options={sideBarOptions}
					/>
				</div>
				<div className={showMenu ? "col-span-1 md:col-span-4" : "w-screen"}>
					<div>
						<Header
							name={userName}
							avatar={photo}
							setShowMenu={setShowMenu}
							setShowModal={setShowModal}
						/>
					</div>
					<div className={showModal ? "inline" : "hidden"}>
						<ModalUser />
					</div>
					<div className="p-[2rem] bg-[#e3e3e3] h-full">
						<div className="h-[100%] w-[90%] bg-white rounded-lg p-[1rem]">
							<div id="body-container" className="mx-20">
								<section id="title-info" className="text-center">
									<h1
										id="title-personal-info"
										className="font-semibold text-4xl mb-2"
									>
										Personal info
									</h1>
									<h3 id="subtitle-info" className="font-light text-lg">
										Basic info, like your name and photo
									</h3>
								</section>

								<section
									id="profile-card-container"
									className="border border-gray-300 rounded-xl"
								>
									<div
										id="profile-container"
										className="flex justify-between items-center p-[1rem]"
									>
										<div id="profile-info-container">
											<h4 id="profile" className="font-semibold text-2xl mb-1">
												Profile
											</h4>
											<p
												id="profile-about"
												className="font-medium text-gray-500"
											>
												Some info may be visible to other people
											</p>
										</div>
										<a
											id="edit-button"
											href="/bitacoraPFN4/#/edit-profile"
											className="py-2 px-4 bg-[#dba18a] text-white rounded-md"
										>
											Edit
										</a>
									</div>

									<div
										id="photo-container"
										className="container-profile flex justify-between border border-x-0 border-gray-300"
									>
										<div className="left-container p-3 text-end">
											<h6 id="photo-title" className="title-profile text-end">
												PHOTO
											</h6>
										</div>
										<div className="right-container">
											<div
												id="photo-img-container"
												className="w-[100%] h-[100%] rounded-lg overflow-hidden"
											>
												<div
													id="photo-container"
													className="container-profile flex flex-col justify-between mb-3 text-end"
												>
													<div className="left-container p-3">
														<h6 id="photo-title" className="title-profile">
															PHOTO
														</h6>
													</div>
													<div className="right-container flex justify-center">
														<div
															id="photo-img-container"
															className="w-[100%] h-[100%] rounded-lg"
														>
															<img
																id="photo"
																alt="profile-photo"
																src={photo}
																className="w-[10rem] h-[10rem] object-cover"
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div
										id="name-container"
										className="container-profile flex justify-between border border-x-0 border-gray-300 "
									>
										<div className="left-container p-3">
											<h6 id="name-title" className="title-profile">
												NAME
											</h6>
										</div>
										<div className="right-container p-3">
											<p id="name" className="content-profile">
												{userName}
											</p>
										</div>
									</div>

									<div
										id="bio-container"
										className="container-profile flex justify-between border border-x-0 border-gray-300"
									>
										<div className="left-container p-3">
											<h6 id="bio-title" className="title-profile">
												BIO
											</h6>
										</div>
										<div className="right-container p-3">
											<p id="bio" className="content-profile">
												{bio}
											</p>
										</div>
									</div>

									<div
										id="phone-container"
										className="container-profile flex justify-between border border-x-0 border-gray-300 "
									>
										<div className="left-container p-3">
											<h6 id="phone-title" className="title-profile">
												PHONE
											</h6>
										</div>
										<div className="right-container p-3">
											<p id="phone" className="content-profile">
												{phone}
											</p>
										</div>
									</div>

									<div
										id="email-container"
										className="container-profile flex justify-between border border-x-0 border-gray-300"
									>
										<div className="left-container p-3">
											<h6 id="email-title" className="title-profile">
												EMAIL
											</h6>
										</div>
										<div className="right-container p-3">
											<p id="email-profile" className="content-profile">
												{email}
											</p>
										</div>
									</div>

									<div
										id="password-container"
										className="container-profile flex justify-between border border-x-0 border-b-0 border-gray-300"
									>
										<div className="left-container p-3">
											<h6 id="password-title" className="title-profile">
												PASSWORD
											</h6>
										</div>
										<div className="right-container p-3">
											<p id="password-profile" className="content-profile">
												{contrasena}
											</p>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
			;
		</>
	);
}

export default Profile;
