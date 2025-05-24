export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number; 
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product)
  => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export interface SearchPageFilters {
  query: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export const formatCurrency = (amount: number): string => {
  return `R$ ${amount.toFixed(2).replace('.', ',')}`;
};

export const clientSideSearchProducts = (products: Product[], filters: SearchPageFilters): Product[] => {
  let results = products;

  if (filters.query) {
    const lowerQuery = filters.query.toLowerCase();
    results = results.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery)
    );
  }

  results = results.filter(product =>
    product.price >= filters.minPrice && product.price <= filters.maxPrice
  );

  return results;
};