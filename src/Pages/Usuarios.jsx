import PropTypes from "prop-types";
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

function Usuarios() {
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

	// Llamada a la API para obtener otros datos (por ejemplo, datos de personas)
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
					<div className="p-[2rem] bg-[#e3e3e3] h-[calc(100%-65px)]">
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
							value: "avatar.png",
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
