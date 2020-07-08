import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error,
	};
};

export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post(
				"https://composed-amulet-263513.firebaseio.com/orders.json",
				orderData
			)
			.then((response) => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch((error) => {
				dispatch(purchaseBurgerFail(error));
			});
	};
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error,
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrder = () => {
	return (dispatch) => {
		dispatch(fetchOrderStart());
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

				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch((err) => {
				dispatch(fetchOrdersFail(err));
			});
	};
};
