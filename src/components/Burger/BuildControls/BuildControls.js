import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
	{ label: "Salad", type: "salad", salad: 0.5 },
	{ label: "Bacon", type: "bacon", bacon: 1.5 },
	{ label: "Cheese", type: "cheese", cheese: 1.3 },
	{ label: "Meat", type: "meat", meat: 2 },
];
export default function buildControls(props) {
	return (
		<div className={classes.BuildControls}>
			<h3>
				Price of the Burger: &nbsp;
				<p className={classes.PriceHeading}>
					{Math.abs(props.totalPrice.toFixed(2)) + " $"}
				</p>
			</h3>

			{controls.map((ctrl) => (
				<BuildControl
					key={ctrl.label}
					label={ctrl.label + " :" + ctrl[ctrl.type] + "$"}
					added={() => props.ingredientsAdder(ctrl.type)}
					removed={() => props.ingredientsRemover(ctrl.type)}
					disabled={props.disable[ctrl.type]}
				/>
			))}

			<button
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.ordered}
			>
				{props.isAuth ? "CheckOut" : "Sign Up To Order"}
			</button>
		</div>
	);
}
