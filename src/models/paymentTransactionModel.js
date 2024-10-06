import mongoose,{Schema} from "mongoose";

const paymentTransactionSchema = new Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
    },
    code: {
        type: String,
        required: true,
        maxlength: 50,
    },
    merchantId: {
        type: String,
        required: true,
        maxlength: 50,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    providerReferenceId: {
        type: String,
        required: true,
        maxlength: 50,
    }
},
{
    timestamps: true
}
);

// Middleware to update the `updatedAt` field before saving
paymentTransactionSchema.pre('save', function (next) {
    // this.updatedAt = Date.now();
    //if something to do pre saving record to database
    next();
});

// Create the model
const PaymentTransaction=mongoose.models.PaymentTransaction || mongoose.model("PaymentTransaction",paymentTransactionSchema);


export {PaymentTransaction}
