"use server";

import { revalidatePath } from "next/cache";
import { likeProduct as likeProductinDb } from "./products";
export async function likeproductAction(id: string) {
  const newLikes = await likeProductinDb(id);
  revalidatePath(`/products/${id}`);
  return newLikes;
}
