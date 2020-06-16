const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    choice: Number,
    bets: [],
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    total: Number,
    amount: Number

}, 
{ 
    timestamps: true 
});


module.exports = Coupon = mongoose.model("coupon", CouponSchema);
