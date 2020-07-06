import React from "react";
import Aux from "../Hoc/Auxiliary";
import Classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
				<Toolbar open={this.sideDrawerClosed} />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosed}
				/>
				<main className={Classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
