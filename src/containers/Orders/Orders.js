import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
export class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	};
	componentDidMount() {
		axios
			.get("/orders.json")
			.then((response) => {
				let fetchedOrders = [];
				Object.keys(response.data).map(
					(ky) => fetchedOrders.push({ ...response.data[ky], id: ky })
					// console.log(fetchedOrders);

					/*   (2) [{…}, {…}]
                    0:
                    customer: {address: {…}, email: "asunilsingh2205@gmail.com", name: "Sunil Adari"}
                    id: "-MBThEiimmR6MGZDGk7B"
                    ingredients: {bacon: 1, cheese: 2, meat: 1, salad: 1}
                    totalPrice: 10
                    __proto__: Object
                    1:
                    customer: {address: {…}, email: "pavaniramu4@gmail.com", name: "Pavani Adari"}
                    id: "-MBThS_k8L6W6BkOE-4y"
                    ingredients: {bacon: 0, cheese: 1, meat: 2, salad: 1}
                    totalPrice: 8
                    __proto__: Object
                    length: 2
                    __proto__: Array(0) */
				);
				this.setState({ loading: false, orders: fetchedOrders });
			})
			.catch((err) => {
				this.setState({ loading: false });
				console.log(err);
			});
	}
	render() {
		let order = this.state.orders.map((order) => (
			<Order
				key={order.id}
				customerName={order.customer.name}
				ingredients={order.ingredients}
				totalPrice={+order.totalPrice}
			/>
		));

		// <Order customerName={} ingredients={} totalPrice={} />

		if (this.state.loading) {
			order = <Spinner />;
		}
		return <div>{order}</div>;
	}
}

export default withErrorHandler(Orders, axios);
