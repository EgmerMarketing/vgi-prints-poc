import { NextResponse } from "next/server";
import { getCollectionProducts } from "@/lib/shopify";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params;
  const products = await getCollectionProducts(handle);
  return NextResponse.json(products);
}
