import mongoose, {Schema, model, models } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: { type: String, required: true },
        productImage: { type: String }, 
        quantity: { type: Number, required: true, min: 1 },
        priceAtPurchase: { type: Number, required: true },
        discountPriceAtPurchase: { type: Number },
        deliveryChargeAtPurchase: { type: Number },
      },
    ],

      shippingAddress: {
      Name: { type: String, required: true },
      MobileNumber: { type: String, required: true },
      PinCode: { type: Number, required: true },
      Address: { type: String, required: true },
      City: { type: String, required: true },
      LandMark: { type: String },
      State: { type: String },
      Country: { type: String },
    },
    totalAmount: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending",
    },
    transactionId: { type: String },

    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
