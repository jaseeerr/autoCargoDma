const mongoose = require("mongoose")
const Schema = mongoose.Schema

const invoiceItemSchema = new Schema({
  marks: String,
  no: String,
  desc: String,
  qty: String,
  price: String,
  total: String,
})

const proformaSchema = new Schema(
  {
    invoiceDate1: String,
    invoiceDate2: String,
    invoiceDate3: String,
    invoiceDate4: String,
    consignee1: String,
    consignee2: String,
    consignee3: String,
    consignee4: String,
    consignee5: String,
    consignee6: String,
    coo: String,
    cofd: String,
    invoiceItems: [invoiceItemSchema],
    total: String,
    words: String,
    product: String,
    beneficiary: String,
    bank: String,
    branch: String,
    accountNumber: String,
    currency:String,
    swift: String,
    iban: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model("Proforma", proformaSchema)

