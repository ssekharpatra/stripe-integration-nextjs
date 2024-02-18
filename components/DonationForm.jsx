"use client";

import { useState } from "react";

const DonationForm = () => {
	const [amount, setAmount] = useState(20);
	const handleDonation = async () => {
		const response = await fetch("/api/payment", {
			method: "POST",
			body: JSON.stringify({ amount: amount }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		window.location.assign(data.url);
	};

	console.log("amount", amount, typeof amount);

	return (
		<div>
			<h1>Donation Form</h1>
			<input
				type="number"
				placeholder="Enter amount"
				onChange={(e) => setAmount(parseInt(e.target.value))}
				value={amount}
			/>
			<button onClick={handleDonation}>Donate</button>
		</div>
	);
};

export default DonationForm;
