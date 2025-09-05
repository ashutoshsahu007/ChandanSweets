import { cartActions } from "./cartSlice";

// Fetch user cart
export const fetchCartAsync = (userId, token) => async (dispatch) => {
  const res = await fetch(
    `https://restro-a8f84-default-rtdb.firebaseio.com/users/${userId}/cart.json?auth=${token}`
  );
  const data = await res.json();

  if (!data) {
    dispatch(cartActions.setCart([]));
    return;
  }

  const loadedCart = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
  dispatch(cartActions.setCart(loadedCart));
};

// Add product to cart
export const addToCartAsync = (userId, token, product) => async (dispatch) => {
  const res = await fetch(
    `https://restro-a8f84-default-rtdb.firebaseio.com/users/${userId}/cart/${product.id}.json?auth=${token}`,
    {
      method: "PUT",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    }
  );
  await res.json();

  dispatch(cartActions.addToCart(product));
};

// Remove product from cart
export const removeFromCartAsync =
  (userId, token, productId) => async (dispatch) => {
    await fetch(
      `https://restro-a8f84-default-rtdb.firebaseio.com/users/${userId}/cart/${productId}.json?auth=${token}`,
      { method: "DELETE" }
    );

    dispatch(cartActions.removeFromCart(productId));
  };
