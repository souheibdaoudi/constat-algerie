interface Product {
  id: string;
  entity: string;
  livemode: boolean;
  name: string;
  description: string | null;
  images: string[];
  metadata: any[]; // Assuming metadata is an array of any type
  created_at: number;
  updated_at: number;
}

interface Price {
  id: string;
  entity: string;
  livemode: boolean;
  amount: number;
  currency: string;
  metadata: any | null; // Depending on the actual type of metadata
  created_at: number;
  updated_at: number;
  product_id: string;
}
interface CheckoutParams {
  price_id: string;
  success_url: string;
  customer_email: string;
}

const create_checkout = async ({ price_id, success_url, customer_email }: CheckoutParams) => {
  // function body
};
interface Checkout {
  id: string;
  entity: string;
  livemode: boolean;
  amount: number;
  fees: number;
  pass_fees_to_customer: number;
  status: string;
  locale: string;
  description: string | null;
  metadata: any | null;
  success_url: string;
  failure_url: string | null;
  payment_method: string | null;
  invoice_id: string | null;
  customer_id: string;
  payment_link_id: string | null;
  created_at: number;
  updated_at: number;
  checkout_url: string;
}
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
}
interface Address {
  country: string;
  state: string;
  address: string;
}

interface ChecklistItem {
  id: string;
  label: string;
}

interface ImageDisplayProps {
  type: string;
  onChecklistPointSelect: (selectedChecklists: string[], checkedItems: Record<string, Record<string, boolean>>) => void;
}