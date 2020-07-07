import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		/* 	axios
			.get(
				"https://composed-amulet-263513.firebaseio.com/ingredients.json"
			)
			.then((response) => {
				this.setState({ ingredients: response.data });
				this.updateTotalPrice(response.data);
			})
			.catch((error) => {
				this.setState({ error: true });
			}); */
	}

	/* 	updateTotalPrice = (ingredients) => {
		let price = Object.keys(ingredients).reduce((acc, igKey) => {
			let price = ingredients[igKey] * INGREDIENT_PRICES[igKey];
			return acc + price;
		}, 0);
		this.setState({ totalPrice: price });
		this.updatePurchaseState(ingredients);
	};
 */
	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	purchaseHandler = () => {
		const purchasingState = this.state.purchasing;

		this.setState({ purchasing: !purchasingState });
	};

	purchaseContinue = () => {
		this.props.history.push("/checkout");
	};

	render() {
		let disableInfo = { ...this.props.ings };

		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}
		let orderSummary = null;

		let burger = this.state.error ? (
			<p>
				Ingredients are unable to load ! Check your internet
				connectivity
			</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientsAdder={this.props.onIngredientAdded}
						ingredientsRemover={this.props.onIngredientRemoved}
						disable={disableInfo}
						totalPrice={this.props.totalPrice}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseContinued={this.purchaseContinue}
					purchaseCancelled={this.purchaseHandler}
					totalPrice={this.props.totalPrice}
				/>
			);
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		totalPrice: state.totalPrice,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (igName) =>
			dispatch({
				type: actionTypes.ADD_INGREDIENT,
				ingredientName: igName,
			}),
		onIngredientRemoved: (igName) =>
			dispatch({
				type: actionTypes.REMOVE_INGREDIENT,
				ingredientName: igName,
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
