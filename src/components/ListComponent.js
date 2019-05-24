import React, { Component } from "react";

const ListComponent = (props) => {
	const {users} = props;
	return(
		<div>
			<h3>User List</h3>
			{
				users.map( item => 
					(
						<li key={item.id}>
								{item.name}, 
								{item.email}, 
								{item.phone_number}, 
								{item.country.name}, 
								{item.state.name}, 
								{item.city.name},
								Date of creation: {item.dateCreation}
						</li>)
					)
			}
		</div>
	)
} 

export default ListComponent;