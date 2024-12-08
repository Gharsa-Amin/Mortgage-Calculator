import React from "react";
import "./MortgageFunction.scss";
import image from "../../images/icon-calculator.svg";
import images from "../../images/illustration-empty.svg";
function calculateMortgage(amount, rate, term, type) {
	const principal = parseFloat(amount);
	const annualInterestRate = parseFloat(rate);
	const termInYears = parseInt(term);
	const numberOfPayments = termInYears * 12;

	if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(termInYears)) {
		return 0;
	}

	const monthlyInterestRate = annualInterestRate / 100 / 12;

	if (type === "repayment") {
		const numerator =
			monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
		const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
		const monthlyPayment = principal * (numerator / denominator);

		return monthlyPayment.toFixed(2);
	}

	if (type === "interest-only") {
		const monthlyInterestPayment = principal * monthlyInterestRate;
		return monthlyInterestPayment.toFixed(2);
	}

	return 0;
}

const MortgageCalculator = ({ amount, rate, term, type }) => {
	const monthlyPayment = calculateMortgage(amount, rate, term, type);

	return (
		<div className="result">
			<h2>Your results</h2>
			<h3>Your monthly repayments £{monthlyPayment}</h3>
			<p>
				Your results are shown below based on the information you provided. To
				adjust the results, edit the form and click "calculate repayments"
				again.
			</p>
			<img src={images} />
		</div>
	);
};

export default MortgageCalculator;
