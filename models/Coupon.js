const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    bets: {
        type: Array,
        required: true
    },
    currentBets: {
        type: Array,
        requred: true
    },
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    },
    won: {
        type: Boolean,
        default: false
    }
}, 
{ 
    timestamps: true 
});

CouponSchema.methods.checkIfFinished = function(cb) {
    return cb(this.bets.every(bet => bet.bet.finished))
}


module.exports = Coupon = mongoose.model("coupon", CouponSchema);
