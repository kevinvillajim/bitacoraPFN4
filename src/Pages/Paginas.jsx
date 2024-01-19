import {useState, useEffect} from "react";
import SideBar from "../components/SideBar";
import "../App.css";
import ModalUser from "../components/ModalUser";
import Header from "../components/Header";
import Tabla from "../components/Tabla";
import {ModalNew} from "../components/ModalNew";
import {useFetch} from "../components/useFetch";

const logo = "logo.png";

const sideBarOptions = [
	{link: "/bitacoraPFN4/#/roles/", icon: "manage_accounts", name: "Roles"},
	{link: "/bitacoraPFN4/#/usuarios/", icon: "co_present", name: "Usuarios"},
	{link: "/bitacoraPFN4/#/bitacoras/", icon: "menu_book", name: "Bitacoras"},
	{link: "/bitacoraPFN4/#/paginas/", icon: "link", name: "Paginas"},
];

function Bitacoras() {
	const [showMenu, setShowMenu] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const [showModalNew, setShowModalNew] = useState(false);

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
					//console.log(data2);
				}
			} catch (error2) {
				console.error("Error al obtener datos de la persona:", error2);
			}
		};

		fetchData();
	}, [data2, loading2, error2]);

	const nombreCompleto =
		data2 && data2.primer_nombre + " " + data2.primer_apellido;
	const email = data && data.email;
	const avatar = data && data.img;

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
							avatar={avatar}
							setShowMenu={setShowMenu}
							setShowModal={setShowModal}
						/>
					</div>
					<div className={showModal ? "inline" : "hidden"}>
						<ModalUser />
					</div>
					<div className="p-[2rem] bg-[#e3e3e3] h-[calc(100%-65px)] ">
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
