import PropTypes from "prop-types";

function Header({setShowMenu, setShowModal, name, avatar}) {
	const handleMenuClick = () => {
		setShowMenu && setShowMenu((prevShowMenu) => !prevShowMenu);
	};
	const handleModalClick = () => {
		setShowModal && setShowModal((prevShowModal) => !prevShowModal);
	};

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
						src={avatar}
						alt="avatar"
						className="w-[2.5rem] h-[2.5rem] rounded-full object-cover"
					/>
					<div className="flex items-center">
						<h2 className={`ml-[1rem] text-${textColor}`}>{name}</h2>
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
	name: PropTypes.string,
	avatar: PropTypes.string,
};

export default Header;
