import {useState} from "react";
import SideBar from "../components/SideBar";
import "../App.css";
import ModalUser from "../components/ModalUser";
import Header from "../components/Header";
import Tabla from "../components/Tabla";

const logo = "/logo.png";
const name = "Kevin";
const rol = "admin";

const sideBarOptions = [
	{link: "/roles/", icon: "manage_accounts", name: "Roles"},
	{link: "/usuarios/", icon: "co_present", name: "Usuarios"},
	{link: "/bitacoras/", icon: "menu_book", name: "Bitacoras"},
	{link: "/paginas/", icon: "link", name: "Paginas"},
];

function Bitacoras() {
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
						<div>
							<h1 className="text-[30px] font-bold text-gray-800">Bitacoras</h1>
						</div>
						<div className="h-[90%] w-[90%] bg-white rounded-lg p-[1rem]">
							<Tabla
								url="http://127.0.0.1:8000/api/bitacoras/"
								headers={[
									"Id",
									"Bitacora",
									"Id Usuario",
									"Fecha",
									"Hora",
									"ip",
									"so",
									"navegador",
								]}
								table={[
									"bitacora",
									"id_usuario",
									"fecha",
									"hora",
									"ip",
									"so",
									"navegador",
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Bitacoras;
