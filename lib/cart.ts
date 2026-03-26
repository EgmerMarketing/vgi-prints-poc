"use client";

const CART_ID_KEY = "vgi_cart_id";

async function shopifyCartFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

export function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_ID_KEY);
}

export function setStoredCartId(id: string) {
  localStorage.setItem(CART_ID_KEY, id);
}

export async function createCart(variantId: string, quantity: number): Promise<{ id: string; checkoutUrl: string }> {
  const data = await shopifyCartFetch<{
    cartCreate: { cart: { id: string; checkoutUrl: string } };
  }>(
    `mutation cartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
      }
    }`,
    { lines: [{ merchandiseId: variantId, quantity }] }
  );
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<{ id: string; checkoutUrl: string }> {
  const data = await shopifyCartFetch<{
    cartLinesAdd: { cart: { id: string; checkoutUrl: string } };
  }>(
    `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
      }
    }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] }
  );
  return data.cartLinesAdd.cart;
}

export async function addToCartAndRedirect(variantId: string, quantity: number) {
  let cartId = getStoredCartId();
  let cart: { id: string; checkoutUrl: string };

  if (cartId) {
    cart = await addToCart(cartId, variantId, quantity);
  } else {
    cart = await createCart(variantId, quantity);
    setStoredCartId(cart.id);
  }

  window.location.href = cart.checkoutUrl;
}
