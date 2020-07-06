import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import Navigation from "../../Navigation/NavigationItems/NavigationItems";
import HamBurger from "../SideDrawer/HamBurger/HamBurger";
const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<div className={classes.HamBurger}>
			<HamBurger open={props.open} />
		</div>
		<div className={classes.Logo}>
			<Logo />
		</div>

		<nav className={classes.DesktopOnly}>
			<Navigation />
		</nav>
	</header>
);

export default toolbar;
