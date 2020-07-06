import React from "react";
import classes from "./NavigationItem.css";
import { NavLink } from "react-router-dom";
const navigationItem = (props) => (
	<li className={classes.NavigationItem}>
		<NavLink
			to={props.link}
			exact={props.exact} //this exact is passed from parent link which is just exact for '/'
			activeClassName={classes.active}
		>
			{props.children}
		</NavLink>
	</li>
);

export default navigationItem;
