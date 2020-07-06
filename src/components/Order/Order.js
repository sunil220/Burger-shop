import React from "react";
import classes from "./Order.css";
const Order = (props) => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName],
		});
	}
	// console.log(ingredients)
	/* 	(4) [{…}, {…}, {…}, {…}]
	0: {name: "bacon", amount: 1}
	1: {name: "cheese", amount: 2}
	2: {name: "meat", amount: 1}
	3: {name: "salad", amount: 1}
	length: 4
	__proto__: Array(0)
	Order.js:13 
	(4) [{…}, {…}, {…}, {…}]
	0: {name: "bacon", amount: 0}
	1: {name: "cheese", amount: 1}
	2: {name: "meat", amount: 2}
	3: {name: "salad", amount: 1}
	length: 4
	__proto__: Array(0) */

	const ingredientOutut = ingredients.map((ig) => (
		<span key={ig.name} className={classes.IngredientBoxes}>
			{ig.name} ({ig.amount})
		</span>
	));
	return (
		<div className={classes.Order}>
			<h4>Customer: {props.customerName}</h4>
			<p>Ingredients: {ingredientOutut}</p>
			<p>
				Price: <strong>USD {+props.totalPrice.toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default Order;
