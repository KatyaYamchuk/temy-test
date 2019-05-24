import React from "react";

const Textarea = ( {required, style, row, value, name, label, placeholder, maxLength, validator, valid_conditions, handler} ) => {
	return(
		<div className="form-group">
			<label>{label}</label>
			<textarea
				className="form-control" 
				name={name} 
				value={value} 
				placeholder={placeholder} 
				onChange={handler}
				style={style}
				maxLength={maxLength}
			/>
				{ !!validator ? validator.message(name, value, valid_conditions) : null}
		</div>
	)
}

export default Textarea;