"use client";

import {
  create_checkout,
  create_price,
  create_product,
  create_customer,
} from "@/lib/actions/chargily-actions";

import { useRouter } from "next/navigation";

interface Product_details {
  product_name: string;
  product_price: number;
}
export const useChargily = () => {
  const router = useRouter();

  const pay = async ({ product_name, product_price }: Product_details) => {
    try {
      const customer = await create_customer(); // Create customer with predefined details
      if (!customer) throw new Error("failed to create a customer");
  
      const product = await create_product({ product_name });
      if (!product) throw new Error("failed to create a product");
  
      const price = await create_price({
        amount: product_price,
        product_id: product?.id,
      });
      if (!price) throw new Error("failed to create a price");
  
      const checkout = await create_checkout({
        price_id: price.id,
        success_url: "https://99fe-154-251-185-159.ngrok-free.app/?payment=success", // Success URL back to your home page with a query param
        customer_id: customer.id, // Pass the customer ID here
      });
      
      if (!checkout?.checkout_url) throw new Error("failed to create a checkout");
  
      router.push(checkout?.checkout_url);
    } catch (err) {
      console.error(err);
    }
  };
  

  return { pay };
};
