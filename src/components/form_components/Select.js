import React from "react";

const Select = ({name, label, style, value, options, placeholder, required, validator, valid_conditions, handler}) => {
    return(
        <div className="form-group">
            <label className={required == "true" ? "required" : null} htmlFor={name}>{label}</label>
            <select
              className="form-control"
              name={name}
              onChange={handler}
              style={style}
              value={value}
              >
              <option value="" selected disabled>{placeholder}</option>
                 {
                  options.map( option => (<option key={option.id} value={option.id}>{option.name}</option>))
                 }
            </select>
            { !!validator ? validator.message(name, value, valid_conditions) : null}
      </div>)
}

export default Select;