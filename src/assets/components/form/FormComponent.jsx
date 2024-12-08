import { useState } from "react";
import MortgageCalculator from "../MortgageFunction/MortgageFunction";
import "./FormComponent.scss";
import img from "../../images/mortgage cute wolfie .jpg";
const initialValues = {
	amount: "",
	term: "",
	rate: "",
	type: "",
};

export default function FormComponent() {
	const [amount, setAmount] = useState(initialValues);
	const [error, setError] = useState({});

	function handleChangeSubmit(event) {
		const { name, value } = event.target;
		setAmount((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	function formValidation() {
		const formErrors = {};
		if (!amount.amount) {
			formErrors.amount = "Please fill the amount field";
		}
		if (!amount.term) {
			formErrors.term = "Please fill the term field";
		}
		if (!amount.rate) {
			formErrors.rate = "Please fill the rate field";
		}
		if (!amount.type) {
			formErrors.type =
				"Please select a mortgage type (Repayment or Interest-Only)";
		}

		return formErrors;
	}

	function formSubmit(event) {
		event.preventDefault();

		const formErrors = formValidation();
		if (Object.keys(formErrors).length > 0) {
			setError(formErrors);
		}
	}

	return (
		<>
			<form id="form" onSubmit={formSubmit}>
				<div className="title">
					<img className="form-image" src={img} />
					<h1 className="title__header">Mortgage Calculator</h1>
					<button
						type="reset"
						id="reset"
						onClick={() => setAmount(initialValues)}
					>
						Clear all
					</button>
				</div>

				<div className="form-header">
					<label htmlFor="amount" id="label-id">
						Mortgage Amount
						<input
							type="number"
							min="0"
							className="amount-title"
							name="amount"
							value={amount.amount}
							onChange={handleChangeSubmit}
						/>
					</label>
					{error.amount && <p className="error">{error.amount}</p>}
				</div>

				<div className="form-header">
					<label htmlFor="term" id="label-id">
						Mortgage Term (Years)
						<input
							type="number"
							min="1"
							className="amount-title"
							name="term"
							value={amount.term}
							onChange={handleChangeSubmit}
						/>
					</label>
					{error.term && <p className="error">{error.term}</p>}
				</div>

				<div className="form-header">
					<label htmlFor="rate" id="label-id">
						Interest Rate (%)
						<input
							type="number"
							min="0"
							max="100"
							className="amount-title"
							step="0.01"
							id="rate"
							name="rate"
							value={amount.rate}
							onChange={handleChangeSubmit}
						/>
					</label>
					{error.rate && <p className="error">{error.rate}</p>}
				</div>

				<div className="repayment">
					<label htmlFor="repayment">Repayment</label>
					<input
						type="radio"
						name="type"
						id="repayment"
						value="repayment"
						checked={amount.type === "repayment"}
						onChange={handleChangeSubmit}
					/>
				</div>

				<div className="interest-only">
					<label htmlFor="interest-only">Interest Only</label>
					<input
						type="radio"
						name="type"
						id="interest-only"
						value="interest-only"
						checked={amount.type === "interest-only"}
						onChange={handleChangeSubmit}
					/>
				</div>

				{error.type && <p className="error">{error.type}</p>}

				<button type="submit">Calculate Repayments</button>
			</form>

			{!error.amount && !error.term && !error.rate && !error.type && (
				<MortgageCalculator
					amount={amount.amount}
					rate={amount.rate}
					term={amount.term}
					type={amount.type}
				/>
			)}
		</>
	);
}
