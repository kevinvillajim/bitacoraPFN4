function ModalUser() {
	function logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		window.location.reload();
	}

	return (
		<>
			<div
				id="modal-user"
				className="bg-[#343b40] bg-opacity-90 absolute right-4 rounded-xl border border-[#E5e5e5] p-[0.5rem]"
			>
				<a
					className="hover:bg-[#2e2e2e] cursor-pointer rounded-xl p-[0.5rem] my-[1rem] flex items-center"
					href="/bitacoraPFN4/#/profile"
				>
					<span className="material-symbols-outlined mr-[0.3rem] text-[#fff]">
						{" "}
						person{" "}
					</span>
					<span className="text-modal text-[#fff]">My Profile</span>
				</a>
				<hr className="border-[#fff]" />
				<div
					id="logout"
					className="hover:bg-[#be6570] cursor-pointer rounded-xl p-[0.5rem] flex items-center mt-[0.5rem]"
					onClick={logout}
				>
					<span className="material-symbols-outlined mr-[0.3rem] text-[#fff]">
						{" "}
						logout{" "}
					</span>
					<span className="text-modal text-[#fff]">Logout</span>
				</div>
			</div>
		</>
	);
}

export default ModalUser;
