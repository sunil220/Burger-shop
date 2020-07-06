import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";
const Burger = (props) => {
	let transfromedIngredients = Object.keys(props.ingredients)
		.map((igKey) => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (transfromedIngredients.length === 0) {
		transfromedIngredients = (
			<p className={classes.Burger_mid}>
				Please start adding ingredients
			</p>
		);
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transfromedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default Burger;
