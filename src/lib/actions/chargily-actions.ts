"use server";

const CHARGILY_BASE_URL = "https://pay.chargily.net/test/api/v2" as const;

export const create_product = async ({
  product_name,
}: {
  product_name: string;
}): Promise<Product | undefined> => {
  // Function to create a product
  // It takes product_name as input and returns a Promise that resolves to Product or undefined

  // Constructing request options
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`, // Adding authorization header with secret key
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: product_name }), // Constructing the body with product_name
  };

  try {
    const response = await fetch(`${CHARGILY_BASE_URL}/products`, options); // Sending a POST request to create a product
    const data = (await response.json()) as Product; // Parsing response JSON into Product type

    return data; // Returning the created product
  } catch (err) {
    console.error(err); // Logging errors if any occur during the process
  }
};

export const create_price = async ({
  amount,
  product_id,
}: {
  amount: number;
  product_id: string;
}): Promise<Price | undefined> => {
  // Function to create a price
  // It takes amount and product_id as input and returns a Promise that resolves to Price or undefined

  // Constructing request options
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`, // Adding authorization header with secret key
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, currency: "dzd", product_id }), // Constructing the body with amount, currency, and product_id
  };

  try {
    const response = await fetch(`${CHARGILY_BASE_URL}/prices`, options); // Sending a POST request to create a price
    const data = (await response.json()) as Price; // Parsing response JSON into Price type

    return data; // Returning the created price
  } catch (err) {
    console.error(err); // Logging errors if any occur during the process
  }
};

export const create_checkout = async ({
  price_id,
  success_url,
  customer_id,
}: {
  price_id: string;
  success_url: string;
  customer_id: string;
}): Promise<Checkout | undefined> => {
  const payload = {
    items: [{ price: price_id, quantity: 1 }],
    success_url,
    customer_id, // Add customer_id here
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(`${CHARGILY_BASE_URL}/checkouts`, options);
    const data = (await response.json()) as Checkout;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const create_customer = async (): Promise<Customer | undefined> => {
  const email = "constatalgerie@gmail.com"; // Define your customer email
  const name = "E-constat Algerie"; // Define your customer name (optional)

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name }),
  };

  try {
    const response = await fetch(`${CHARGILY_BASE_URL}/customers`, options);
    const data = (await response.json()) as Customer;
    return data;
  } catch (err) {
    console.error(err);
  }
};