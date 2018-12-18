var mongoose = require("mongoose");
module.exports = mongoose.model("Car", {
    brand: String,
    buydate: Number,
    color: String,
    displacement: String,
    environmental: String,
    fuel: String,
    gearbox: String,
    id: Number,
    images: Object,
    km: Number,
    licence: Boolean,
    locality: Boolean,
    price: Number,
    series: String,
    type: String
})