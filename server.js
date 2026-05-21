/*const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/create-checkout-session",async (req, res) => {
    const items = req.body.items || [];

    const lineitems = items.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.id,
            },
            unit_amount: 1000,
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineitems,
        success_url:"http://localhost:4242/success.html",
        cancel_url:"http://localhost:4242/cancel.html",
    });

    res.json({ url:session.url});
});

app.listen(4242, () => {
    console.log("Server running on http://localhost:4242");
});
*/