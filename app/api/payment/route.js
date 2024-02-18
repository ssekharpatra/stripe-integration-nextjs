import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
	let data = await request.json();
	let donation = data.amount;
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					unit_amount: donation * 100,
					currency: "inr",
					product_data: {
						name: "Donation",
					},
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: "http://localhost:3000?success=true",
		cancel_url: "http://localhost:3000?canceled=true",
	});

	return NextResponse.json({ url: session.url });
}
