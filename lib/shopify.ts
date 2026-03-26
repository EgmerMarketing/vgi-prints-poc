const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: {
    edges: Array<{
      node: { id: string; title: string; availableForSale: boolean };
    }>;
  };
  collections: { edges: Array<{ node: { handle: string } }> };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: { url: string; altText: string | null } | null;
  products: { edges: Array<{ node: ShopifyProduct }> };
}

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}

const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  images(first: 1) {
    edges {
      node {
        url
        altText
      }
    }
  }
  variants(first: 20) {
    edges {
      node {
        id
        title
        availableForSale
      }
    }
  }
  collections(first: 5) {
    edges {
      node {
        handle
      }
    }
  }
`;

// Collection handles that are locked (school stores) — excluded from public shop
// These must match the actual Shopify collection handles exactly
export const LOCKED_COLLECTION_HANDLES = ["ridgeline", "nvca", "dvhs", "ridgeline-academy"];

// Fetch all products (for shop page) — excludes locked school store products
export async function getProducts(first = 50): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
    `query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node { ${PRODUCT_FIELDS} }
        }
      }
    }`,
    { first }
  );
  return data.products.edges
    .map((e) => e.node)
    .filter(
      (p) =>
        !p.collections.edges.some((e) =>
          LOCKED_COLLECTION_HANDLES.includes(e.node.handle)
        )
    );
}

// Fetch a single product by handle
export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(
    `query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ${PRODUCT_FIELDS}
      }
    }`,
    { handle }
  );
  return data.productByHandle;
}

// Fetch products in a Shopify collection by handle
export async function getCollectionProducts(handle: string): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    collectionByHandle: { products: { edges: Array<{ node: ShopifyProduct }> } } | null;
  }>(
    `query GetCollectionProducts($handle: String!) {
      collectionByHandle(handle: $handle) {
        products(first: 50) {
          edges {
            node { ${PRODUCT_FIELDS} }
          }
        }
      }
    }`,
    { handle }
  );
  return data.collectionByHandle?.products.edges.map((e) => e.node) ?? [];
}

// Helpers
export function getProductPrice(product: ShopifyProduct): number {
  return parseFloat(product.priceRange.minVariantPrice.amount);
}

export function getProductImage(product: ShopifyProduct): string {
  return (
    product.images.edges[0]?.node.url ??
    `https://placehold.co/400x400/1A1A1A/ffffff?text=${encodeURIComponent(product.title)}`
  );
}

export function getProductSizes(product: ShopifyProduct): string[] {
  return product.variants.edges.map((e) => e.node.title).filter((t) => t !== "Default Title");
}
