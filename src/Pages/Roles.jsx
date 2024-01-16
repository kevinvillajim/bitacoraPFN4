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

function Roles() {
	const [showMenu, setShowMenu] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const [showModalNew, setShowModalNew] = useState(false);
	return (
		<>
			<div className={showMenu ? "grid grid-cols-1 md:grid-cols-5" : "flex"}>
				<div
					className={showMenu ? "col-span-1 md:col-span-1 h-screen" : "hidden"}
				>
					<SideBar logo={logo} options={sideBarOptions} />
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
						<div className="flex justify-between mb-[1rem]">
							<h1 className="text-[30px] font-bold text-gray-800">Roles</h1>
							<button
								onClick={() => {
									setShowModalNew(true);
								}}
								className="bg-[#dba18a] text-white rounded-lg px-[1rem] py-[0.5rem] mr-[7.2rem]"
							>
								Crear Rol
							</button>
						</div>
						<div className="h-[30rem] w-[90%] bg-white rounded-lg p-[1rem] overflow-auto">
							<Tabla
								url="http://127.0.0.1:8000/api/roles/"
								headers={[
									"Id",
									"Rol",
									"Usuario Creación",
									"Usuario Modificación",
									"Estado",
									"Creado",
									"Actualizado",
								]}
								table={[
									"rol",
									"usuario_creacion",
									"usuario_modificacion",
									"estado",
									"created_at",
									"updated_at",
								]}
							/>
						</div>
					</div>
				</div>
			</div>
			{showModalNew && (
				<ModalNew
					setShowModalNew={setShowModalNew}
					formObject={[
						{name: "rol", label: "Rol", style: ""},
						{
							name: "usuario_creacion",
							label: "",
							style: "hidden",
							value: localStorage.getItem("id"),
						},
						{
							name: "usuario_modificacion",
							label: "",
							style: "hidden",
							value: localStorage.getItem("id"),
						},
						{
							name: "estado",
							label: "Habilitado",
							style: "",
							value: "1",
						},
					]}
					api="http://127.0.0.1:8000/api/roles"
				/>
			)}
		</>
	);
}

export default Roles;
