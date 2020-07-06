import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
export default class ContactData extends Component {
	state = {
		ingredients: null,
		totalPrice: 0,
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your Email",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "street",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			Zip: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "ZIP",
				},
				value: "",
				validation: {
					required: true,
					minLength: 6,
					maxLength: 6,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				value: "fastest",
				validation: {},
				valid: true,
			},
		},
		loading: false,
		formIsValid: false,
	};

	componentDidMount() {
		this.setState({
			ingredients: this.props.ingredients,
			totalPrice: this.props.price,
		});
	}

	orderHandler = (event) => {
		this.setState({ loading: true });
		event.preventDefault();

		const formData = {};

		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}

		let order = {
			customer: formData,
			ingredients: this.state.ingredients,
			totalPrice: this.state.totalPrice.toFixed(2).toString(),
		};

		axios
			.post(
				"https://composed-amulet-263513.firebaseio.com/orders.json",
				order
			)
			.then((response) => {
				this.setState({ loading: false });

				this.props.history.push("/");
			})
			.catch((error) => {
				this.setState({ loading: false });
			});
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		/* 		if ( rules )
		{
			All rules which doesn't have validation property it won't check
		} */

		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.minLength && isValid;
		}

		return isValid;
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};
		/* 	{
			name: {...
			},
			email: {...
			},
			....
		} */
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier],
		};
		/*  {elementType: "input",
				
				value: "",}
        */
		updatedFormElement.value = event.target.value;
		//console.log(updatedFormElement);

		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);

		updatedFormElement.touched = true;

		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;

		for (let inputIdentifier in updatedOrderForm) {
			formIsValid =
				updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid,
		});
	};

	render() {
		let formElementsArray = [];

		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}
		// console.log(formElementsArray)
		/* (5) [{…}, {…}, {…}, {…}, {…}]
		>0: id: "name"
			>config:
				>elementConfig:
					placeholder: "Your Name"
					type: "text"
				>__proto__: Object
				elementType: "input"
				value: ""
			
		__proto__: Object
		>1: {id: "email", config: {…}}
		>2: {id: "street", config: {…}}
		>3: {id: "Zip", config: {…}}
		>4: {id: "deliveryMethod", config: {…}}
		length: 5 */

		let form = (
			<div>
				<h4>Enter your Contact details</h4>
				<form onSubmit={this.orderHandler}>
					{formElementsArray.map((formElement) => (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							changed={(event) =>
								this.inputChangedHandler(event, formElement.id)
							}
						/>
					))}
					<Button
						btnType="Success"
						disabled={!this.state.formIsValid}
					>
						Order
					</Button>
				</form>
			</div>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}
		return <div className={classes.ContactData}>{form}</div>;
	}
}
