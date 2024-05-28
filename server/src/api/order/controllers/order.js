"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email } = ctx.request.body;

    if (!products || !userName || !email) {
      console.error("Missing required fields: products, userName, or email.");
      return ctx.badRequest("Missing required fields: products, userName, or email.");
    }

    try {
      // Retrieve item information
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi.service("api::item.item").findOne(product.id);

          if (!item) {
            console.error(`Item with id ${product.id} not found.`);
            ctx.throw(404, `Item with id ${product.id} not found.`);
          }

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100), // Stripe expects the amount in cents, ensuring it's an integer
            },
            quantity: product.count,
          };
        })
      );

      // Create a Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000",
        line_items: lineItems,
        metadata: {
          userName,
          email,
        },
      });

      // Create the order in Strapi
      await strapi.service("api::order.order").create({
        data: {
          userName,
          products,
          stripeSessionId: session.id,
        },
      });

      // Return the session id
      ctx.response.status = 200;
      return { id: session.id };
    } catch (error) {
      console.error("Error creating order:", error);
      ctx.throw(500, "There was a problem creating the charge");
    }
  },
}));
