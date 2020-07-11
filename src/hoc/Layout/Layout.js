import React from "react";
import Aux from "../Hoc/Auxiliary";
import Classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends React.Component {
	state = {
		showSideDrawer: false,
	};
	sideDrawerClosed = () => {
		let updatedSideDrawer = this.state.showSideDrawer;
		this.setState({ showSideDrawer: !updatedSideDrawer });
	};
	render() {
		return (
			<Aux>
				<Toolbar
					open={this.sideDrawerClosed}
					isAuth={this.props.isAuthenticated}
				/>
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosed}
					isAuth={this.props.isAuthenticated}
				/>
				<main className={Classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
