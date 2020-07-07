import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import ContactData from "../../containers/Checkout/ContactData/ContactData";
export class Checkout extends Component {
	checkoutCancelHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinueHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};
	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.props.ings}
					checkoutCancelled={this.checkoutCancelHandler}
					checkoutContinued={this.checkoutContinueHandler}
				/>
				<Route
					path={this.props.match.path + "/contact-data"}
					component={ContactData}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
	};
};

export default connect(mapStateToProps)(Checkout);
