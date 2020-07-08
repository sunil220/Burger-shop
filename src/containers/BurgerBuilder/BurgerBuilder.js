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
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	};

	componentDidMount() {
		this.props.onInitIngredients();
	}

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
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
	};

	render() {
		let disableInfo = { ...this.props.ings };

		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}
		let orderSummary = null;

		let burger = this.props.error ? (
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
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
		onIngredientRemoved: (igName) =>
			dispatch(actions.removeIngredient(igName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
