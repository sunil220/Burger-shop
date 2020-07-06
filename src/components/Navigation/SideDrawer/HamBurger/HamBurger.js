import React from "react";
import classes from "./HamBurger.css";
const HamBurger = (props) => {
	return (
		<div className={classes.HamBurger} onClick={props.open}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default HamBurger;
