import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders();
	}
	render() {
		let order = this.props.orders.map((order) => (
			<Order
				key={order.id}
				customerName={order.customer.name}
				ingredients={order.ingredients}
				totalPrice={+order.totalPrice}
			/>
		));

		// <Order customerName={} ingredients={} totalPrice={} />

		if (this.props.loading) {
			order = <Spinner />;
		}
		return <div>{order}</div>;
	}
}
const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrder()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
