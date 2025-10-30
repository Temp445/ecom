"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Trash2, Plus, Minus, ShoppingBag, Sparkles, Lock, TrendingDown, CheckCircle2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image"
import Shopping from "@/assets/icons/Shopping.png"

interface Product {
  _id: string;
  name: string;
  pathUrl: string;
  price: number;
  discountPrice?: number;
  stock: number;
  thumbnail?: string;
  image?: string;
  images?: string[];
}

interface CartItem {
  _id: string;
  productId: Product;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

interface CartPageProps {
  userId?: string;
}

export default function Cart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { refreshCart } = useCart();
  const router = useRouter();
  const { user } = useAuth();

  const fetchCart = async () => {
    try {
      setLoading(true);

      if (user?._id) {
        const res = await axios.get(`/api/cart?userId=${user?._id}`);
        setCart(res.data.cart);
      } else {
        const localCartString = localStorage.getItem("guestCart");
        const localCart = localCartString ? JSON.parse(localCartString) : [];
        
        const fakeCart: Cart = {
          items: localCart.map((item: any) => ({
            _id: item.product._id,
            productId: item.product,
            quantity: item.quantity,
          })),
        };
        setCart(fakeCart);
      }
    } catch (error: any) {
      console.error("Failed to load cart:", error);
      toast.error(error.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user?._id]);

  useEffect(() => {
    const mergeLocalCart = async () => {
      if (!user?._id) return;

      const localCartString = localStorage.getItem("guestCart");
      if (!localCartString) return;
      
      const localCart = JSON.parse(localCartString);
      if (localCart.length === 0) return;

      try {
        const { data } = await axios.get(`/api/cart?userId=${user}`);
        const dbCartItems = data.cart?.items || [];

        const dbProductIds = dbCartItems.map(
          (item: CartItem) => item.productId._id?.toString?.() || item.productId._id
        );

        const uniqueLocalItems = localCart.filter(
          (item: any) => !dbProductIds.includes(item.product._id)
        );

        if (uniqueLocalItems.length > 0) {
          const token = localStorage.getItem("token");
          await axios.post(
            "/api/cart",
            {
              items: uniqueLocalItems.map((item: any) => ({
                productId: item.product._id,
                quantity: item.quantity,
              })),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        localStorage.removeItem("guestCart");
        await fetchCart();
      } catch (err) {
        console.error("Failed to merge cart:", err);
        toast.error("Failed to merge cart items");
      }
    };

    mergeLocalCart();
  }, [user?._id]);

  const handleQuantityUpdate = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;

    try {
      setUpdatingId(itemId);

      setCart((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items.map((item) =>
            (user?._id ? item._id : item.productId._id) === itemId
              ? { ...item, quantity: newQty }
              : item
          ),
        };
      });

      if (user?._id) {
        const res = await axios.put(`/api/cart/${itemId}`, { quantity: newQty });
        if (res.data.success) {
          await refreshCart();
          toast.success("Quantity updated");
        }
      } else {
        const guestCartString = localStorage.getItem("guestCart");
        let guestCart = guestCartString ? JSON.parse(guestCartString) : [];
        
        const index = guestCart.findIndex(
          (item: any) => item.product._id === itemId
        );
        
        if (index > -1) {
          guestCart[index].quantity = newQty;
          localStorage.setItem("guestCart", JSON.stringify(guestCart));
          await refreshCart();
        }
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
      await fetchCart();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (itemId: string) => {
    // if (!confirm("Remove this item from cart?")) return;

    try {
      setUpdatingId(itemId);

      if (user?._id) {
        const res = await axios.delete(`/api/cart/${itemId}`);
        if (res.data.success) {
          setCart((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              items: prev.items.filter((item) => item._id !== itemId),
            };
          });
          await refreshCart();
          toast.success("Item removed");
        }
      } else {
        const guestCartString = localStorage.getItem("guestCart");
        let guestCart = guestCartString ? JSON.parse(guestCartString) : [];
        
        guestCart = guestCart.filter((item: any) => item.product._id !== itemId);
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        
        setCart((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            items: prev.items.filter((item) => item.productId._id !== itemId),
          };
        });
        await refreshCart();
        toast.success("Item removed");
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Failed to remove item");
    } finally {
      setUpdatingId(null);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        </div>
      </div>
    );
  }

  const isLoggedIn = !!user;

  if (!cart?.items?.length) {
    return (
      <div className=" bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className=" rounded-full flex items-center justify-center mx-auto mb-6">
            <Image src={Shopping} alt="cart" className="w-52 h-52"></Image>
          </div>
          
          
          {isLoggedIn ? (
            <>
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Your cart is empty</h2>

              <p className="text-slate-600 mb-8">Nothing here yet — start exploring our products!</p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </>
          ) : (
          <div className="flex flex-col items-center justify-center  px-6 text-center bg-gray-50 rounded-2xl shadow-sm">
    

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
        Can’t see your cart items?
      </h2>

      <p className="text-gray-600 max-w-md mb-8">
        Log in to retrieve the products you added earlier and continue shopping seamlessly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/login"
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Login
        </Link>

        <Link
          href="/"
          className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
          )}
        </div>
      </div>
    );
  }

  const totalAmount = cart.items.reduce(
    (sum, item) =>
      sum + (item.productId.discountPrice || item.productId.price) * item.quantity,
    0
  );

  const totalPriceSave = cart.items.reduce(
    (sum, item) =>
     sum + ( (item.productId.price) - (item.productId.discountPrice || item.productId.price) ) * item.quantity, 0
  )

  const itemCount = cart.items.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-black text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">My Cart</h1>
                <p className="text-blue-100 text-sm">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
              </div>
            </div>
            <Link
              href="/"
              className="px-6 py-2 bg-white text-black backdrop-blur-sm rounded-lg font-medium transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
          

            <div className="space-y-4">
              {cart.items.map((item) => {
                const stock = item.productId.stock || 999;
                const inStock = stock >= item.quantity;
                const isUpdating = updatingId === (user?._id ? item._id : item.productId._id);
                const itemPrice = item.productId.discountPrice || item.productId.price;
                const hasDiscount = (item.productId.discountPrice ?? 0 ) > 0 && (item.productId.discountPrice ?? 0) < item.productId.price;
                const discountPercent = hasDiscount 
                  ? Math.round(((item.productId.price - item.productId.discountPrice!) / item.productId.price) * 100)
                  : 0;

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-slate-200"
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      
                      <div className="relative flex-shrink-0">
                        <Link href={`/products/${item.productId.pathUrl}`}>
                        <img
                          src={
                            item.productId.thumbnail ||
                            item.productId.image ||
                            item.productId.images?.[0] ||
                            "/placeholder.png"
                          }
                          alt={item.productId.name}
                          className="w-full md:w-32 h-32 object-cover rounded-lg bg-slate-100"
                        /></Link>
                        {hasDiscount && (
                          <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {discountPercent}% OFF
                          </div>
                        )}
                      </div>

                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-slate-800 mb-1">
                              {item.productId.name || "Unnamed Product"}
                            </h3>
                            <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                              inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                              <CheckCircle2 size={12} />
                              {inStock ? "In Stock" : "Out of Stock"}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDelete(user?._id ? item._id : item.productId._id)}
                            disabled={isUpdating}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-2xl font-bold text-slate-800 font-sans">₹{itemPrice.toLocaleString()}</span>
                              {hasDiscount && (
                                <span className="text-sm text-slate-400 line-through font-sans">₹{item.productId.price.toLocaleString()}</span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600">
                              Subtotal: <span className="font-semibold text-slate-800 font-sans">₹{(itemPrice * item.quantity).toLocaleString()}</span>
                            </p>
                          </div>

                          <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden w-fit">
                            <button
                              onClick={() =>
                                handleQuantityUpdate(
                                  user?._id ? item._id : item.productId._id,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1 || isUpdating}
                              className="px-4 py-4 hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-6 py-2 font-semibold bg-slate-50 border-x border-slate-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityUpdate(
                                  user?._id ? item._id : item.productId._id,
                                  item.quantity + 1
                                )
                              }
                              disabled={isUpdating || item.quantity >= stock}
                              className="px-4 py-4 hover:bg-emerald-600 hover:text-white  disabled:cursor-not-allowed transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-slate-800">
                  <span>Price ({itemCount} items)</span>
                  <span className="font-semibold font-sans">₹{(totalAmount + totalPriceSave).toLocaleString()}</span>
                </div>
                
                {totalPriceSave > 0 && (
                  <div className="flex justify-between text-slate-800">
                    <span>Discount</span>
                    <span className="font-sans text-green-600">-₹{totalPriceSave.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
                <span className="text-lg font-bold text-slate-800">Total</span>
                <span className="text-xl font-sans font-semibold">₹{totalAmount.toLocaleString()}</span>
              </div>
              
              {totalPriceSave > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-green-800 font-medium font-sans text-center">
                     You're saving ₹{totalPriceSave.toLocaleString()} on this order!
                  </p>
                </div>
              )}

              <button
                className="w-full bg-emerald-700 text-white py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl mb-4"
              >
                Proceed to Checkout
              </button>

              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Lock size={14} />
                <span>Secure checkout</span>
              </div>

      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}