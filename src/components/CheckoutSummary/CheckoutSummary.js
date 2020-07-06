import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope It tastes well</h1>
			<div style={{ width: "auto", margin: "auto" }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<div>
				<Button btnType="Danger" clicked={props.checkoutCancelled}>
					Cancel
				</Button>
				<Button btnType="Success" clicked={props.checkoutContinued}>
					Continue
				</Button>
			</div>
		</div>
	);
};

export default CheckoutSummary;
