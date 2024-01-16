import PropTypes from "prop-types";
import {useState} from "react";
import SideBar from "../components/SideBar";
import "../App.css";
import ModalUser from "../components/ModalUser";
import Header from "../components/Header";
import Tabla from "../components/Tabla";
import {ModalNew} from "../components/ModalNew";

const logo = "/logo.png";

const sideBarOptions = [
	{link: "/roles/", icon: "manage_accounts", name: "Roles"},
	{link: "/usuarios/", icon: "co_present", name: "Usuarios"},
	{link: "/bitacoras/", icon: "menu_book", name: "Bitacoras"},
	{link: "/paginas/", icon: "link", name: "Paginas"},
];

function Usuarios({nombreCompleto, email, photo}) {
	const [showMenu, setShowMenu] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const [showModalNew, setShowModalNew] = useState(false);
	return (
		<>
			<div className={showMenu ? "grid grid-cols-1 md:grid-cols-5" : "flex"}>
				<div
					className={showMenu ? "col-span-1 md:col-span-1 h-screen" : "hidden"}
				>
					<SideBar
						logo={logo}
						name={nombreCompleto}
						email={email}
						options={sideBarOptions}
					/>
				</div>
				<div className={showMenu ? "col-span-1 md:col-span-4" : "w-screen"}>
					<div>
						<Header
							name={nombreCompleto}
							avatar={photo}
							setShowMenu={setShowMenu}
							setShowModal={setShowModal}
						/>
					</div>
					<div className={showModal ? "inline" : "hidden"}>
						<ModalUser />
					</div>
					<div className="p-[2rem] bg-[#e3e3e3] h-full">
						<div className="flex justify-between mb-[1rem]">
							<h1 className="text-[30px] font-bold text-gray-800">Usuarios</h1>
							<button
								className="bg-[#dba18a] text-white rounded-lg px-[1rem] py-[0.5rem] mr-[6rem]"
								onClick={() => {
									setShowModalNew(true);
								}}
							>
								Crear Usuario
							</button>
						</div>
						<div className="h-[30rem] w-[90%] bg-white rounded-lg p-[1rem] overflow-auto">
							<Tabla
								url="http://127.0.0.1:8000/api/usuarios/"
								headers={[
									"Id",
									"Usuario",
									"Habilitado",
									"Creado",
									"Actualizado",
									"Avatar",
								]}
								table={["email", "habilitado", "created_at", "updated_at"]}
							/>
						</div>
					</div>
				</div>
			</div>
			{showModalNew && (
				<ModalNew
					setShowModalNew={setShowModalNew}
					formObject={[
						{name: "email", label: "Email", style: ""},
						{name: "password", label: "Contraseña", style: ""},
						{
							name: "habilitado",
							label: "Habilitado",
							style: "hidden",
							value: "1",
						},
						{
							name: "img",
							label: "Avatar",
							style: "hidden",
							value: "/avatar.png",
						},
					]}
					api="http://127.0.0.1:8000/api/usuarios"
				/>
			)}
		</>
	);
}
Usuarios.propTypes = {
	nombreCompleto: PropTypes.string,
	email: PropTypes.func,
	photo: PropTypes.func,
};
export default Usuarios;
