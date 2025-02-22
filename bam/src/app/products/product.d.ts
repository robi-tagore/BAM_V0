interface productType {
  name: string;
  description: string;
  TLI: string;
}

interface brand {
  name: string;
  description: string;
  website: string;
  rating: string;
}

interface modelN {
  id: string;
  properties: Object;
}

interface Product {
  name: string;
  type: productType;
  brand: brand;
  description: string;

  stock: string;
  price: string;
  models: modelN[];
}
