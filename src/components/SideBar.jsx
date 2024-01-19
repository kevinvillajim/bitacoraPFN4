import PropTypes from "prop-types";

function SideBar({logo, enterprise, title, options, name, email}) {
	let colorBg = "#f6e8e0";
	let textColor = "[#000]";

	return (
		<>
			<div id="left-menu" className={`bg-[${colorBg}] w-[100%] h-dvh`}>
				<div className="flex items-center p-[1rem]">
					<img alt="logo" src={logo} className="w-[100%] h-[100%] " />
					<h1 className={`text-${textColor} ml-[0.5rem] text-[20px]`}>
						{enterprise}
					</h1>
				</div>
				<hr className={`border-${textColor}`} />
				<div className="p-[1rem] flex flex-col items-center">
					<h2 className={`text-${textColor} text-[20px]`}>{email}</h2>
					<h2 className={`text-${textColor} text-[25px]`}> {name} </h2>
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
	name: PropTypes.string,
	email: PropTypes.string,
};

export default SideBar;
