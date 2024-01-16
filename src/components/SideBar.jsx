import PropTypes from "prop-types";
import {useEffect} from "react";
import {useFetch} from "../components/useFetch";

function SideBar({logo, enterprise, title, options}) {
	let colorBg = "#f6e8e0";
	let textColor = "[#000]";

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

	return (
		<>
			<div id="left-menu" className={`bg-[${colorBg}] w-[100%] h-[100%]`}>
				<div className="flex items-center p-[1rem]">
					<img alt="logo" src={logo} className="w-[100%] h-[100%] " />
					<h1 className={`text-${textColor} ml-[0.5rem] text-[20px]`}>
						{enterprise}
					</h1>
				</div>
				<hr className={`border-${textColor}`} />
				<div className="p-[1rem] flex flex-col items-center">
					<h2 className={`text-${textColor} text-[20px]`}>{email}</h2>
					<h2 className={`text-${textColor} text-[25px]`}>
						{" "}
						{nombreCompleto}{" "}
					</h2>
				</div>
				<hr className={`border-${textColor}`} />
				<div className="p-[1rem]">
					<h2 className={`text-center text-${textColor}`}>{title}</h2>
					<div className="flex justify-center h-[20rem]">
						<div className="">
							{options.map((opcion, key) => (
								<div key={key} className="mb-[1rem]">
									<a href={opcion.link}>
										<h3
											className={`text-${textColor} flex cursor-pointer my-[1rem]`}
										>
											<span className="material-symbols-outlined mr-[1rem]">
												{opcion.icon}
											</span>
											{opcion.name}
										</h3>
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

SideBar.propTypes = {
	logo: PropTypes.string,
	enterprise: PropTypes.string,
	title: PropTypes.string,
	options: PropTypes.array,
};

export default SideBar;
