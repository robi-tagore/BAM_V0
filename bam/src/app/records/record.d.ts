interface productN {
  name: string;
  model: string;
}
interface priceN {
  each?: string;
  total?: string;
  quantity?: string;
}

interface item {
  product: productN;
  price: priceN;
}

interface record {
  id: string;
  date: Date;

  customerId?: string;
  type: "incoming" | "outgoing";

  items: item[];
}
