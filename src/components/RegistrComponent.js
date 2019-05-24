import React, { Component } from "react";
import SimpleReactValidator from 'simple-react-validator';
import Input from './form_components/Input';
import Textarea from './form_components/Textarea';
import Select from './form_components/Select';

const defaultUserData = {
	id: "",
	name: "",
	email: "",
	phone_number: "",
	address: "",
    about_me: "",
	country_id: "",
	state_id: "",
	city_id: "",
	createdAt: "",
}

class RegistrComponent extends Component {
    constructor(props){
	    super(props);
	    
	    this.state = {
	  	userData : defaultUserData,

		locationData : {
		  	countries : [],
		  	states : [],
		  	cities : [],
		},
			isEmailValid: true,
			isNameValid: true,
			isPhoneNumValid: true,
			isCountryValid: true,
			isCityValid: true,
			isStateValid: true,
	  } 
	  
	  this.validator = new SimpleReactValidator(
	  	{
	  		className: 'text-danger',
	  	}
	  );

	  this.changeHandler = this.changeHandler.bind(this);
	  this.changeHandlerCountry = this.changeHandlerCountry.bind(this);
	  this.changeHandlerStates = this.changeHandlerStates.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.verificationFields = this.verificationFields.bind(this);
	  this.hideError = this.hideError.bind(this);
  }
  
  componentDidMount () {
  	fetch('/countries')
	.then( res => res.json())
	.then( res => {
		this.setState({locationData: {...this.state.locationData,countries:res}})
		}
	)
  }
	
  hideError(){
	for (let key in this.state){
		if (key !== "locationData" && key !== "userData"){
			this.setState({[key]:true})
		}
	}
	this.validator.hideMessages();
  }

  changeHandler (e) {
  	this.hideError();
	const name = e.target.name;
	const value = e.target.value;
	this.setState( {userData: {...this.state.userData,[name]:value}} )
  }

  changeHandlerCountry (e) {
  	this.hideError();
	const value = e.target.value;
	this.setState( {userData: {...this.state.userData, country_id : value}} );
	fetch(`/states?country_id=${value}`)
	.then( res => res.json())
	.then( res => {
		this.setState({locationData: {...this.state.locationData,states:res}})
		}
	)
  }

  changeHandlerStates (e) {
  	this.hideError();
	const value = e.target.value;
	this.setState( {userData: {...this.state.userData, state_id : value}} );
	if (this.state.userData.city_id !== "") this.setState( {userData: {...this.state.userData, city_id : ""}} );
	fetch(`/cities?state_id=${value}`)
	.then( res => res.json())
	.then( res => {
		this.setState({locationData: {...this.state.locationData,cities:res}})
		}
	)
  }
 
  verificationFields(fieldValid, isValid) {
	if (this.validator.fieldValid(fieldValid)) {
  		this.setState({[isValid]:true})
	}else{
		this.setState({[isValid]:false});
	}
  }
  
  handleSubmit (e) {
  	e.preventDefault();
  	this.verificationFields('email','isEmailValid');
  	this.verificationFields('name','isNameValid');
  	this.verificationFields('phone_number','isPhoneNumValid');
  	this.verificationFields('country_id','isCountryValid');
  	this.verificationFields('city_id','isCityValid');
  	this.verificationFields('state_id','isStateValid');

	 if (this.validator.allValid()) {
	    
	    this.props.RegMethod(this.state.userData);
		this.setState({userData : defaultUserData });
		this.validator.hideMessages();
	 
	 } else {
	    this.validator.showMessages();
	    this.forceUpdate();
	  }
  }

  render() {
  	const {locationData, userData} = this.state;
    return (
    	<div>
    		{
	    		locationData.countries.length == 0 ? null : (
				<form onSubmit={this.handleSubmit}>
					<h2>Registration form</h2>
						<Input 
							type="email"
							required="true"
							style= {{borderColor:`${this.state.isEmailValid?'black':'red'}`}}
							value={userData.email}
							placeholder="email"
							name="email"
							label="Email"
							validator={this.validator}
							valid_conditions='required'
							handler={this.changeHandler}
						/>

						<Input 
							type= "text"
							required= "true"
							style= {{borderColor:`${this.state.isNameValid?'black':'red'}`}}
							value={userData.name}
							placeholder="name"
							name="name"
							label="Name"
							validator={this.validator}
							valid_conditions='required|alpha_space'
							handler={this.changeHandler}
						/>
						
						<Input 
							type= "phone_number"
							required= "true"
							style= {{borderColor:`${this.state.isPhoneNumValid?'black':'red'}`}}
							value={userData.phone_number}
							placeholder="phone number"
							name="phone_number"
							label="Phone Number"
							validator={this.validator}
							valid_conditions='required|numeric'
							handler={this.changeHandler}
						/>

						<Input 
							type= "address"
							required= "false"
							style= {{borderColor:'black'}}
							value={userData.address}
							placeholder="address"
							name="address"
							label="Address"
							handler={this.changeHandler}
						/>

						<Textarea 
							required= "false"
							style= {{borderColor:'black'}}
							value={userData.about_me}
							placeholder="about me"
							maxLength="500"
							name="about_me"
							label="About me"
							handler={this.changeHandler}
						/>

						<Select
							  name="country_id"
							  label="Select country"
							  style= {{borderColor:`${this.state.isCountryValid?'black':'red'}`}}
							  required="true"
							  value={userData.country_id}
							  options={locationData.countries}
							  placeholder="Country" 
							  validator={this.validator}
							  valid_conditions='required'
							  handler={this.changeHandlerCountry}
						  />

						{
					   	  userData.country_id !== "" ?
						  (
						  	<Select
							  name="state_id"
							  label="Select state"
							  style= {{borderColor:`${this.state.isStateValid?'black':'red'}`}}
							  required="true"
							  value={userData.state_id}
							  options={locationData.states}
							  placeholder="State"
							  validator={this.validator}
							  valid_conditions='required'
							  handler={this.changeHandlerStates}
						  />
						  ) : null
						}

						{
					   	  userData.state_id !== "" ?
						  (
						  	<Select
							  name="city_id"
							  label="Select city"
							  style= {{borderColor:`${this.state.isCityValid?'black':'red'}`}}
							  required="true"
							  value={userData.city_id}
							  options={locationData.cities}
							  placeholder="City" 
							  validator={this.validator}
							  valid_conditions='required'
							  handler={this.changeHandler}
						  />
						  ) : null
						}
						<button type="submit" className="btn btn-primary">Submit</button>
				</form>
				  )
			}
		</div>
    );
  }
}
export default RegistrComponent;
