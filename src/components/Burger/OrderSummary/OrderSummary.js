import React from "react";
import Aux from "../../../hoc/Hoc/Auxiliary";
import Button from "../../UI/Button/Button";

export default function orderSummary(props) {
	const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: "capitalize" }}>{igKey} </span>:{" "}
				{props.ingredients[igKey]}
			</li>
		);
	});
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingreditents:</p>
			<ul>{ingredientSummary}</ul>
			<p>
				Total Price:{" "}
				<strong>{props.totalPrice.toFixed(2) + " $"}</strong>
			</p>
			<p>Continue to Checkout?</p>
			<Button btnType={"Success"} clicked={props.purchaseContinued}>
				Continue
			</Button>
			<Button btnType={"Danger"} clicked={props.purchaseCancelled}>
				Cancel
			</Button>
		</Aux>
	);
}
