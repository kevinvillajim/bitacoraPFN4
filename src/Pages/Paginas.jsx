import {useState} from "react";
import SideBar from "../components/SideBar";
import "../App.css";
import ModalUser from "../components/ModalUser";
import Header from "../components/Header";
import Tabla from "../components/Tabla";
import {ModalNew} from "../components/ModalNew";

const logo = "/logo.png";
const name = "Kevin";
const rol = "admin";

const sideBarOptions = [
	{link: "/#/roles/", icon: "manage_accounts", name: "Roles"},
	{link: "/#/usuarios/", icon: "co_present", name: "Usuarios"},
	{link: "/#/bitacoras/", icon: "menu_book", name: "Bitacoras"},
	{link: "/#/paginas/", icon: "link", name: "Paginas"},
];

function Bitacoras() {
	const [showMenu, setShowMenu] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const [showModalNew, setShowModalNew] = useState(false);
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
					<div className="p-[2rem] bg-[#e3e3e3] h-full ">
						<div className="flex justify-between mb-[1rem]">
							<h1 className="text-[30px] font-bold text-gray-800">Páginas</h1>
							<button
								onClick={() => {
									setShowModalNew(true);
								}}
								className="bg-[#dba18a] text-white rounded-lg px-[1rem] py-[0.5rem] mr-[7.2rem]"
							>
								Crear Página
							</button>
						</div>
						<div className="h-[30rem] w-[90%] bg-white rounded-lg p-[1rem] overflow-auto">
							<Tabla
								url="http://127.0.0.1:8000/api/paginas/"
								headers={[
									"Id",
									"Usuario Creacion",
									"Usuario Modificación",
									"Url",
									"Estado",
									"Nombre",
									"Descripción",
									"Tipo",
									"Icono",
								]}
								table={[
									"usuario_creacion",
									"usuario_modificacion",
									"url",
									"estado",
									"nombre",
									"descripcion",
									"tipo",
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
							name: "img",
							label: "",
							style: "hidden",
							value:
								"https://via.placeholder.com/640x480.png/0077bb?text=magni",
						},
						{
							name: "url",
							label: "Link",
							style: "",
						},
						{
							name: "estado",
							label: "Estado",
							style: "",
							value: "1",
						},
						{
							name: "nombre",
							label: "Nombre del Sitio",
							style: "",
						},
						{
							name: "descripcion",
							label: "Descripción",
							style: "",
						},
						{
							name: "nombre",
							label: "Nombre del Sitio",
							style: "",
						},
						{
							name: "tipo",
							label: "Tipo",
							style: "",
						},
					]}
					api="http://127.0.0.1:8000/api/paginas"
				/>
			)}
		</>
	);
}

export default Bitacoras;
