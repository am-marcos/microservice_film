import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
    paymentIntentId: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
    paymentIntentId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
export { IPayment };
