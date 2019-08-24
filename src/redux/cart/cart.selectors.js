import { createSelector } from 'reselect';

const selectCart = state => state.cart;

//Create memoized  selector (For Performance Improvements)
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems,
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0,
    ),
);
