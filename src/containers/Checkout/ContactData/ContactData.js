import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
class ContactData extends Component {
	state = {
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
					isEmail: false,
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
					isNumeric: true,
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

		formIsValid: false,
	};

	componentDidMount() {}

	orderHandler = (event) => {
		event.preventDefault();

		const formData = {};

		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}

		let order = {
			customer: formData,
			ingredients: this.props.ings,
			totalPrice: this.props.totalPrice.toFixed(2).toString(),
		};

		this.props.onOrderBurger(order);
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

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
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

		if (this.props.loading) {
			form = <Spinner />;
		}
		return <div className={classes.ContactData}>{form}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData) =>
			dispatch(actions.purchaseBurger(orderData)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
