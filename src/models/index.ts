import mongoose from "mongoose";
import Product from "./Product";
import Cart from "./Cart";

// call this early in your route handlers to ensure models are registered
export function registerModels() {
  // `Product` and `Cart` modules already call mongoose.model(...) internally via the files above,
  // so this function is mostly an explicit guard for future models or alternate setups.
  if (!mongoose.models.Product) mongoose.model("Product", (Product as any).schema);
  if (!mongoose.models.Cart) mongoose.model("Cart", (Cart as any).schema);
}
