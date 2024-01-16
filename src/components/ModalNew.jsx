import PropTypes from "prop-types";

export function ModalNew({setShowModalNew, formObject, api}) {
	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
				<div className="w-[40%] h-[90%] bg-white px-[2rem] py-[2rem] rounded-lg relative">
					<div className="w-[100%] text-end">
						<span
							className="material-symbols-outlined cursor-pointer"
							onClick={() => {
								setShowModalNew(false);
							}}
						>
							close
						</span>
					</div>
					<div className="h-[100%] w-[100%] flex justify-center items-center">
						<form action={api} method="POST">
							{formObject.map((item, index) => (
								<div key={index}>
									<label htmlFor={item.name} className={item.style}>
										{item.label}
									</label>
									<input
										type="text"
										name={item.name}
										id={item.name}
										className={`bg-[#e4b9a7] text-[#fff] w-[100%] px-[1rem] py-[0.5rem] ${item.style}`}
										value={item.value}
									/>
								</div>
							))}
							<input
								className="bg-[#dba18a] text-[#fff] rounded-md px-[1rem] py-[0.4rem] w-[100%] mt-[1rem]"
								type="submit"
								value="Crear"
							/>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

ModalNew.propTypes = {
	setShowModalNew: PropTypes.func.isRequired,
	formObject: PropTypes.array.isRequired,
	api: PropTypes.string.isRequired,
};
