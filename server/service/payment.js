import axios from "axios";

async function generateAccessToken() {
  const { data } = await axios({
    url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    method: "POST",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
  });
  return data.access_token;
}

export async function createOrder(cart) {
  const access_token = await generateAccessToken();

  const items = cart.map((item) => ({
    name: item.product_name || "Unnamed Product",
    quantity: item.quantity.toString(),
    category: "PHYSICAL_GOODS",
    unit_amount: {
      currency_code: "USD",
      value: Number(item.product_price).toFixed(2),
    },
  }));

  const totalAmount = cart
    .reduce((sum, item) => sum + item.product_price * item.quantity, 0)
    .toFixed(2);

  const { data } = await axios({
    url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    data: {
      intent: "CAPTURE",
      purchase_units: [
        {
          items,
          amount: {
            currency_code: "USD",
            value: totalAmount,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalAmount,
              },
            },
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        brand_name: "dutyMoti",
      },
    },
  });

  return data.id;
}

export async function capturePayment(orderId) {
  const access_token = await generateAccessToken();

  const { data } = await axios({
    url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return data;
}
