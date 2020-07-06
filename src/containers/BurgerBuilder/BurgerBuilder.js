import React, { Component } from "react";
import Aux from "../../hoc/Hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 1.3,
	meat: 2,
	bacon: 1.5,
};
class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 0,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		axios
			.get(
				"https://composed-amulet-263513.firebaseio.com/ingredients.json"
			)
			.then((response) => {
				this.setState({ ingredients: response.data });
				this.updateTotalPrice(response.data);
			})
			.catch((error) => {
				this.setState({ error: true });
			});
	}

	updateTotalPrice = (ingredients) => {
		let price = Object.keys(ingredients).reduce((acc, igKey) => {
			let price = ingredients[igKey] * INGREDIENT_PRICES[igKey];
			return acc + price;
		}, 0);
		this.setState({ totalPrice: price });
		this.updatePurchaseState(ingredients);
	};

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({ purchasable: sum > 0 });
	};

	addIngredientHandler = (type) => {
		let oldCount = this.state.ingredients[type];
		let updatedCount = oldCount + 1;
		let updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[type] = updatedCount;

		let oldPrice = this.state.totalPrice;
		let ingredientPrice = INGREDIENT_PRICES[type];

		let newPrice = oldPrice + ingredientPrice;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		let oldCount = this.state.ingredients[type];
		if (oldCount === 0) {
			return;
		}
		let updatedCount = oldCount - 1;
		let updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[type] = updatedCount;

		let oldPrice = this.state.totalPrice;
		let ingredientPrice = INGREDIENT_PRICES[type];
		let newPrice = oldPrice - ingredientPrice;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		const purchasingState = this.state.purchasing;

		this.setState({ purchasing: !purchasingState });
	};

	purchaseContinue = () => {
		const queryParams = [];

		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					"=" +
					encodeURIComponent(this.state.ingredients[i])
			);
		}
		queryParams.push("price=" + this.state.totalPrice);
		const queryString = queryParams.join("&");
		this.props.history.push({
			pathname: "/checkout",
			search: queryString,
		});
	};

	render() {
		let disableInfo = { ...this.state.ingredients };

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

		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientsAdder={this.addIngredientHandler}
						ingredientsRemover={this.removeIngredientHandler}
						disable={disableInfo}
						totalPrice={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseContinued={this.purchaseContinue}
					purchaseCancelled={this.purchaseHandler}
					totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
