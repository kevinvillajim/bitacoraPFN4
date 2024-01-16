import PropTypes from "prop-types";
import {useEffect} from "react";
import {useFetch} from "../components/useFetch";

function Header({setShowMenu, setShowModal}) {
	const handleMenuClick = () => {
		setShowMenu && setShowMenu((prevShowMenu) => !prevShowMenu);
	};
	const handleModalClick = () => {
		setShowModal && setShowModal((prevShowModal) => !prevShowModal);
	};

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

	let colorBg = "#dba18a";
	let textColor = "[#000]";

	return (
		<>
			<header
				className={`w-[100%] h-[4rem] bg-[${colorBg}] flex justify-between items-center px-[2rem] shadow-sm`}
			>
				<div
					id="menu-principal"
					className="flex cursor-pointer items-center"
					onClick={handleMenuClick}
				>
					<span className={`material-symbols-outlined text-${textColor}`}>
						{" "}
						menu{" "}
					</span>
					<h2 className={`ml-[1rem] text-${textColor}`}>Home</h2>
				</div>
				<div
					className="flex cursor-pointer"
					id="show-modal"
					onClick={handleModalClick}
				>
					<img
						src={data && data.img}
						alt="avatar"
						className="w-[2.5rem] h-[2.5rem] rounded-full"
					/>
					<div className="flex items-center">
						<h2 className={`ml-[1rem] text-${textColor}`}>{nombreCompleto}</h2>
						<span
							id="more"
							className={`material-symbols-outlined text-${textColor}`}
						>
							expand_more
						</span>
					</div>
				</div>
			</header>
		</>
	);
}

Header.propTypes = {
	setShowMenu: PropTypes.func,
	setShowModal: PropTypes.func,
};

export default Header;
