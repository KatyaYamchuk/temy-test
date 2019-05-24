import React, { Component } from "react";
import './App.css';
import RegistrComponent from './RegistrComponent';
import ListComponent from './ListComponent';
import {Unique, GetById, ConvertDate} from '../functions';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			users : [],
			countries : [],
			states : [],
			cities : [],
		}
		this.RegMethod = this.RegMethod.bind(this);
	}
	
	async getStates (userData) {
		const data = await fetch(`/states?${Unique(userData, "state_id")}`);
		const _data = await data.json();
		return _data;
	}

	async getCities (userData) {
		const data = await fetch(`/cities?${Unique(userData, "city_id")}`)
		const _data = await data.json();
		return _data;
	}	

	async getCountries (userData) {
		const data = await fetch(`/countries?${Unique(userData, "country_id")}`);
		const _data = await data.json();
		return _data;
	}	

	async getUsers () {
		const data = await fetch('/users');
		const _data = await data.json();
		return _data;
	}	
	
	async GetData(){
		let users = await this.getUsers();
		const countries = await this.getCountries(users);
		const states = await this.getStates(users);
		const cities = await this.getCities(users);
		
	    users = users.map( user => {
			user.country = GetById(user, "country_id", countries);
			user.state = GetById(user, "state_id", states);
			user.city = GetById(user, "city_id", cities);
			user.dateCreation = ConvertDate(user.createdAt);
			return user;
		})
		this.setState({users : users})
	}
	
	componentDidMount (){
		this.GetData();
	}



	async RegMethod(user){
		for (let key in user){
			if (user[key] == "") user[key] = null;
		}
		const response = await fetch("/users", {
	    method: "POST",
	    body: JSON.stringify(user),
	     headers: {
      		'Content-Type': 'application/json'
    	},
		})   
		    if (!response.ok) {
		        return Promise.reject(new Error(
		            'Response failed: ' + response.status + ' (' + response.statusText + ')'
		        ));
		    }
			this.GetData()
		}

    render() {
    	const {users} = this.state;
        return (
        	<div>
		        {
			       users.length == 0 ? null : (
					<div className="App">
		            	<div className="RegForm">
		                	<RegistrComponent RegMethod={this.RegMethod}/>
		                </div>
		                
		                <div className="UserList">
		                	<ListComponent users={users}/>
		                </div>
		            </div>
			        )
		        }
	        </div>            
        );
    }
}

export default App;
