export interface Product {
  id: string;
  name: string;
  handle: string;
  price: number;
  image: string;
  category: string;
  collection: string;
  description: string;
  sizes: string[];
}

export interface Collection {
  handle: string;
  name: string;
  description: string;
  locked: boolean;
  passcode: string;
  image: string;
}

export const collections: Collection[] = [
  {
    handle: "ridgeline-academy",
    name: "Ridgeline Academy",
    description: "Official apparel for Ridgeline Academy students, staff, and supporters.",
    locked: true,
    passcode: "ridgeline123",
    image: "https://placehold.co/600x400/D35400/ffffff?text=Ridgeline+Academy",
  },
  {
    handle: "nvca",
    name: "NVCA",
    description: "Northern Valley Charter Academy spirit wear and uniforms.",
    locked: true,
    passcode: "nvca123",
    image: "https://placehold.co/600x400/2D5A2D/ffffff?text=NVCA",
  },
  {
    handle: "dvhs",
    name: "DVHS",
    description: "Desert Valley High School gear — show your Scorpion pride.",
    locked: true,
    passcode: "dvhs123",
    image: "https://placehold.co/600x400/1A1A1A/ffffff?text=DVHS",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Cotton Tee",
    handle: "classic-cotton-tee",
    price: 24.99,
    image: "https://placehold.co/400x400/1a1a1a/ffffff?text=Cotton+Tee",
    category: "T-Shirts",
    collection: "public",
    description:
      "Our go-to cotton tee. Soft ringspun fabric with a relaxed fit — perfect for everyday wear or custom printing. Available in a range of sizes.",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "2",
    name: "Performance Polo",
    handle: "performance-polo",
    price: 34.99,
    image: "https://placehold.co/400x400/2D5A2D/ffffff?text=Polo",
    category: "Polos",
    collection: "public",
    description:
      "Moisture-wicking polo built for comfort and style. Great for school staff, coaches, and events. Embroider your logo for a polished look.",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "3",
    name: "Heavyweight Hoodie",
    handle: "heavyweight-hoodie",
    price: 49.99,
    image: "https://placehold.co/400x400/D35400/ffffff?text=Hoodie",
    category: "Hoodies",
    collection: "public",
    description:
      "Thick 10 oz fleece hoodie with a kangaroo pocket and adjustable drawcord. Built to last through seasons of spirit weeks.",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "4",
    name: "Structured Snapback Hat",
    handle: "structured-snapback-hat",
    price: 22.99,
    image: "https://placehold.co/400x400/1a1a1a/D35400?text=Hat",
    category: "Hats",
    collection: "public",
    description:
      "Classic structured snapback with a flat brim. Perfect for embroidered logos and school crests.",
    sizes: ["One Size"],
  },
  {
    id: "5",
    name: "Ridgeline Spirit Tee",
    handle: "ridgeline-spirit-tee",
    price: 27.99,
    image: "https://placehold.co/400x400/D35400/ffffff?text=Ridgeline+Tee",
    category: "T-Shirts",
    collection: "ridgeline-academy",
    description:
      "Show your Ridgeline Academy pride with this premium spirit tee. Screen-printed with the official crest.",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "6",
    name: "NVCA Staff Polo",
    handle: "nvca-staff-polo",
    price: 38.99,
    image: "https://placehold.co/400x400/2D5A2D/ffffff?text=NVCA+Polo",
    category: "Polos",
    collection: "nvca",
    description:
      "Official NVCA staff polo with embroidered school logo. Moisture-wicking performance fabric.",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "7",
    name: "DVHS Varsity Hoodie",
    handle: "dvhs-varsity-hoodie",
    price: 54.99,
    image: "https://placehold.co/400x400/1A1A1A/D35400?text=DVHS+Hoodie",
    category: "Hoodies",
    collection: "dvhs",
    description:
      "Desert Valley High School varsity hoodie. Heavyweight fleece with embroidered Scorpion logo.",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "8",
    name: "Ridgeline Dad Hat",
    handle: "ridgeline-dad-hat",
    price: 19.99,
    image: "https://placehold.co/400x400/D35400/1a1a1a?text=RA+Hat",
    category: "Hats",
    collection: "ridgeline-academy",
    description:
      "Relaxed-fit dad hat with embroidered Ridgeline Academy logo. Adjustable strap closure.",
    sizes: ["One Size"],
  },
];

export function getProductsByCollection(collectionHandle: string): Product[] {
  if (collectionHandle === "all") return products;
  return products.filter((p) => p.collection === collectionHandle);
}

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}
