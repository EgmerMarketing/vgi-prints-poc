import { NextResponse } from "next/server";
import { getProducts } from "@/lib/shopify";

export async function GET() {
  const products = await getProducts(50);
  return NextResponse.json(products);
}
