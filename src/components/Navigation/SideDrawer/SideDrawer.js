import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Hoc/Auxiliary";
const sideDrawer = (props) => {
	let mobileBackdropClasses = [classes.SideDrawer, classes.Close];

	if (props.open) {
		mobileBackdropClasses = [classes.SideDrawer, classes.Open];
	}
	return (
		<Aux>
			<Backdrop show={props.open} backdropHandler={props.closed} />
			<div
				className={mobileBackdropClasses.join(" ")}
				onClick={props.closed}
			>
				<div className={classes.Logo}>
					<Logo />
				</div>

				<nav>
					<NavigationItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</Aux>
	);
};

export default sideDrawer;
