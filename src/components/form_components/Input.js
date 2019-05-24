import React from "react";

const Input = ( {type, required, style, value, name, label, placeholder, validator, valid_conditions, handler} ) => {
	return(
		<div className="form-group">
			<label className={required == "true" ? "required" : null}>{label}</label>
			<input 
				type={type}
				className="form-control" 
				name={name} 
				value={value} 
				placeholder={placeholder} 
				onChange={handler}
				style={style} 
			/>
			{ !!validator ? validator.message(name, value, valid_conditions) : null}
		</div>
	)
}

export default Input;