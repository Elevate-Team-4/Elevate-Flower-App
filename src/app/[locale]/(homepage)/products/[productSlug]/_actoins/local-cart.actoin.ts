/* eslint-disable no-console */

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
};

const CART_STORAGE_KEY = "elevate-flower-cart";

function getCart(): Cart {
  if (typeof window === "undefined") {
    return { items: [], totalItems: 0 };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return { items: [], totalItems: 0 };
    }

    const cart: Cart = JSON.parse(stored);
    return cart;
  } catch (error) {
    console.error("Error reading local cart:", error);
    return { items: [], totalItems: 0 };
  }
}

export function addToCartLocalStorage(productId: string, quantity: number = 1): Cart {
  const currentCart = getCart();

  // Check if product already exists in cart
  const existingProduct = currentCart.items.findIndex((item) => item.productId === productId);

  if (existingProduct >= 0) {
    // Update existing item quantity
    currentCart.items[existingProduct].quantity += quantity;
  } else {
    // Add new item
    currentCart.items.push({
      productId,
      quantity,
    });
  }

  // Update total items count
  currentCart.totalItems = currentCart.items.reduce((total, item) => total + item.quantity, 0);

  // Save to localStorage
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentCart));
  } catch (error) {
    console.error("Error saving to local cart:", error);
    throw new Error("Failed to save item to cart");
  }

  return currentCart;
}
