

import React,{ useRef, useState, useEffect, useCallback } from "react"
import ReactPrint from "react-to-print"
import axios from "axios"
import { SERVER_URL } from "../../../urls/urls"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { Building2, Printer, Save, DollarSign, Package, FileText, Euro,Globe, CreditCard } from "lucide-react"
import MyAxiosInstance from "../../utils/axios"
function EditProformaV2() {
  const axiosInstance = MyAxiosInstance()
  const ref = useRef()
  const { id } = useParams()

  // Invoice date state
  const [invoiceDate1, setInvoiceDate1] = useState("Invoice No. & Date")
  const [invoiceDate2, setInvoiceDate2] = useState("DMA/42/23-24")
  const [invoiceDate3, setInvoiceDate3] = useState("Dtd 19.03.2024")
  const [invoiceDate4, setInvoiceDate4] = useState("Ship. REF. : MAL24-0224")

  // Consignee state
  const [consignee1, setConsignee1] = useState("EL -WARDA FOR TOBACOO COMPANY")
  const [consignee2, setConsignee2] = useState("AHMED FATHI AHMED EL - TALAWI AND PARTNERS")
  const [consignee3, setConsignee3] = useState("AWEL TAREEK SHEBIN EL -KOEM")
  const [consignee4, setConsignee4] = useState("QUESINA - MENOFYA , P.O BOX 95")
  const [consignee5, setConsignee5] = useState("SHEBIN EL KOEM")
  const [consignee6, setConsignee6] = useState("EGYPT")

  // Country state
  const [coo, setCoo] = useState("Malawi")
  const [cofd, setCofd] = useState("Egypt")

  // Product state
  const [product, setProduct] = useState("UNMANUFACTURED MALAWI DARK FIRD TOBACCO- CROP 2023")

  // Invoice items state
  const [invoiceItems, setInvoiceItems] = useState([
    {
      marks: "Net WT    : 44316.0 Kgs",
      no: "& Kind of Pkgs",
      desc: "DFCMW/3",
      qty: "10652.40",
      price: "2.40",
      total: "25,565.76",
    },
    {
      marks: "Gross WT : 47371.2 Kgs",
      no: "228 Cartons",
      desc: "DFCMW/4",
      qty: "11481.90",
      price: "2.40",
      total: "27,556.56",
    },
    {
      marks: "",
      no: "",
      desc: "DFCMW/4",
      qty: "22181.70",
      price: "2.40",
      total: "53,236.08",
    },
  ])

  // Total state
  const [total, setTotal] = useState("106,358.4")
  const [words, setWords] = useState("one Hundred Six Thousand, Three Hundred Fifty Eight & 40/100")

  // Bank details state
  const [selectedBank, setSelectedBank] = useState("")
  const [beneficiary, setBeneficiary] = useState("DMA TOBACCO TRADING LLC")
  const [bank, setBank] = useState("CBI BANK (COMMERCIAL BANK INTERNATIONAL)")
  const [branch, setBranch] = useState("JUMEIRAH BRANCH")
  const [accountNumber, setAccountNumber] = useState("100090172505")
  const [swift, setSwift] = useState("CLIBIAEAD")
  const [iban, setIban] = useState("AE330220000100090172505")

 // currency
  const [currency,setCurrency] = useState('USD')


  // Bank details mapping
  const bankDetails = {
    CBI: {
      beneficiary: "DMA TOBACCO TRADING LLC",
      bank: "CBI BANK (COMMERCIAL BANK INTERNATIONAL)",
      branch: "JUMEIRAH BRANCH",
      accountNumber: "100090172505",
      swift: "CLIBIAEAD",
      iban: "AE330220000100090172505",
    },
    ENBD: {
      beneficiary: "DMA TOBACCO TRADING LLC",
      bank: "EMIRATES ENBD BANK",
      branch: "Al Muraqabbat Branch",
      accountNumber: "1025887751702",
      swift: "EBILAEAD",
      iban: "AE560260001025887751702",
    },
    ARAB_AFRICAN: {
      beneficiary: "DMA TOBACCO TRADING LLC",
      bank: "ARAB AFRICAN INTERNATIONAL BANK (AAIB)",
      branch: "DUBAI BRANCH",
      accountNumber: "DUB-040801-3931-USD-001",
      swift: "ARAIAEAD",
      iban: "AE470070040801393109001",
    },
  }

  // Update bank details when bank selection changes
  useEffect(() => {
    if (selectedBank && bankDetails[selectedBank]) {
      const details = bankDetails[selectedBank]
      setBeneficiary(details.beneficiary)
      setBank(details.bank)
      setBranch(details.branch)
      setAccountNumber(details.accountNumber)
      setSwift(details.swift)
      setIban(details.iban)
    }
    else
    {
      setBeneficiary("")
      setBank("")
      setBranch("")
      setAccountNumber("")
      setSwift("")
      setIban("")
    }
  }, [selectedBank])

  // Convert number to words
  const numberToWords = useCallback((amount) => {
    const singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]
    const twoDigits = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ]
    const tensMultiple = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
    const thousands = ["", "Thousand", "Million", "Billion"]

    if (amount === "0") return "Zero"

    let [integerPart, decimalPart] = amount.toString().split(".")
    integerPart = integerPart.replace(/,/g, "")
    let words = ""

    function getWords(num) {
      if (num.length === 0) return ""
      if (num.length === 1) return singleDigits[Number.parseInt(num)]
      if (num.length === 2) {
        if (num[0] === "1") {
          return twoDigits[Number.parseInt(num[1])]
        } else {
          return (
            tensMultiple[Number.parseInt(num[0])] + (num[1] !== "0" ? " " + singleDigits[Number.parseInt(num[1])] : "")
          )
        }
      }
      if (num.length === 3) {
        return singleDigits[Number.parseInt(num[0])] + " Hundred " + getWords(num.slice(1))
      }
      const length = num.length
      const group = Math.floor((length - 1) / 3)
      const groupValue = num.slice(0, length - group * 3)
      return getWords(groupValue) + " " + thousands[group] + " " + getWords(num.slice(length - group * 3))
    }

    words = getWords(integerPart).trim()

    if (decimalPart) {
      words += " & " + decimalPart + "/100"
    } else {
      words += " & 00/100"
    }

    return words.replace(/\s+/g, " ")
  }, [])

  // Update proforma invoice
  const updateProforma = async () => {
    toast.loading("Updating Proforma Invoice")
    const data = {
      currency,
      invoiceDate1,
      invoiceDate2,
      invoiceDate3,
      invoiceDate4,
      consignee1,
      consignee2,
      consignee3,
      consignee4,
      consignee5,
      consignee6,
      coo,
      cofd,
      invoiceItems,
      total,
      words,
      product,
      beneficiary,
      bank,
      branch,
      accountNumber,
      swift,
      iban,
    }
    try {
      const res = await axiosInstance.post(`${SERVER_URL}/updateProforma/${id}`, { data })
      if (res.data.success) {
        toast.success("Saved")
        document.getElementById("printBtn").click()
      } else {
        toast.error("Error")
      }
    } catch (error) {
      toast.error("Error updating invoice")
      console.error(error)
    } finally {
      toast.dismiss()
    }
  }

  // Get proforma data
  const getData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${SERVER_URL}/getProforma/${id}`)
      if (res.data.success) {
        const data = res.data.data

        setInvoiceDate1(data.invoiceDate1)
        setInvoiceDate2(data.invoiceDate2)
        setInvoiceDate3(data.invoiceDate3)
        setInvoiceDate4(data.invoiceDate4)

        setConsignee1(data.consignee1)
        setConsignee2(data.consignee2)
        setConsignee3(data.consignee3)
        setConsignee4(data.consignee4)
        setConsignee5(data.consignee5)
        setConsignee6(data.consignee6)

        setCoo(data.coo)
        setCofd(data.cofd)

        setBeneficiary(data.beneficiary)
        setBank(data.bank)
        setCurrency(data.currency ? data.currency : 'USD')
        setBranch(data.branch)
        setAccountNumber(data.accountNumber)
        setSwift(data.swift)
        setIban(data.iban)

        // Handle both old and new data structures
        if (data.invoiceItems) {
          setInvoiceItems(data.invoiceItems)
        } else {
          // Convert old structure to new structure
          const items = []
          for (let i = 1; i <= 5; i++) {
            if (data[`desc${i}`]) {
              items.push({
                marks: data[`marks${i}`] || "",
                no: data[`no${i}`] || "",
                desc: data[`desc${i}`] || "",
                qty: data[`qty${i}`] || "",
                price: data[`price${i}`] || "",
                total: data[`total${i}`] || "",
              })
            }
          }
          setInvoiceItems(items)
        }

        setTotal(data.total)
        setWords(data.words)
        setProduct(data.product)
      } else {
        toast.error("UNKNOWN ERROR")
      }
    } catch (error) {
      toast.error("Error fetching invoice data")
      console.error(error)
    }
  }, [id])

  // Load data on component mount
  useEffect(() => {
    getData()
  }, [getData])

  // Add invoice item
  const addInvoiceItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        marks: "",
        no: "",
        desc: "",
        qty: "",
        price: "",
        total: "",
      },
    ])
  }

  // Remove invoice item
  const removeInvoiceItem = (index) => {
    const updatedItems = [...invoiceItems]
    updatedItems.splice(index, 1)
    setInvoiceItems(updatedItems)
  }

  // Update invoice item
  const updateInvoiceItem = (index, field, value) => {
    const updatedItems = [...invoiceItems]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }

    // If qty or price is updated, recalculate the total
    if (field === "qty" || field === "price") {
      const qty = field === "qty" ? value : updatedItems[index].qty
      const price = field === "price" ? value : updatedItems[index].price

      if (!isNaN(qty) && !isNaN(price)) {
        const calculatedTotal = (Number.parseFloat(qty) * Number.parseFloat(price)).toFixed(2)
        updatedItems[index].total = calculatedTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }

    setInvoiceItems(updatedItems)
  }

  // Update total when individual totals change
  useEffect(() => {
    const sum = invoiceItems.reduce((acc, item) => {
      return acc + (Number.parseFloat(item.total.replace(/,/g, "")) || 0)
    }, 0)

    setTotal(sum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }, [invoiceItems])

  // Update words when total changes
  useEffect(() => {
    const amount = total
    setWords(numberToWords(amount))
  }, [total, numberToWords])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Form Section */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="mr-2" /> Edit Proforma Invoice
          </h1>

          {/* Invoice Date Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5" /> Invoice Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Title</label>
                <input
                  type="text"
                  value={invoiceDate1}
                  onChange={(e) => setInvoiceDate1(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceDate2}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  value={invoiceDate3}
                  onChange={(e) => setInvoiceDate3(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Reference</label>
                <input
                  type="text"
                  value={invoiceDate4}
                  onChange={(e) => setInvoiceDate4(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Country Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <Globe className="mr-2 h-5 w-5" /> Country Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country of Origin</label>
                <input
                  type="text"
                  value={coo}
                  onChange={(e) => setCoo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country of Final Destination</label>
                <input
                  type="text"
                  value={cofd}
                  onChange={(e) => setCofd(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Consignee Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <Building2 className="mr-2 h-5 w-5" /> Consignee Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={consignee1}
                  onChange={(e) => setConsignee1(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={consignee2}
                  onChange={(e) => setConsignee2(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                <input
                  type="text"
                  value={consignee3}
                  onChange={(e) => setConsignee3(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                <input
                  type="text"
                  value={consignee4}
                  onChange={(e) => setConsignee4(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={consignee5}
                  onChange={(e) => setConsignee5(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={consignee6}
                  onChange={(e) => setConsignee6(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <Package className="mr-2 h-5 w-5" /> Product Information
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            {currency == 'USD' ? <DollarSign  className="mr-2 h-5 w-5" /> : <Euro  className="mr-2 h-5 w-5" />} Invoice Items </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Marks & Numbers</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">No. & Kind of Pkgs</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price/KG</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total {currency}</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.marks}
                          onChange={(e) => updateInvoiceItem(index, "marks", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.no}
                          onChange={(e) => updateInvoiceItem(index, "no", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.desc}
                          onChange={(e) => updateInvoiceItem(index, "desc", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.qty}
                          onChange={(e) => updateInvoiceItem(index, "qty", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.price}
                          onChange={(e) => updateInvoiceItem(index, "price", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.total}
                          onChange={(e) => updateInvoiceItem(index, "total", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => removeInvoiceItem(index)}
                          className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                          title="Remove Item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6L6 18M6 6l12 12"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <button
                onClick={addInvoiceItem}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Item
              </button>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="w-1/3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Total Amount:</span>
                  <input
                    type="text"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    className="w-1/2 px-2 py-1 border border-gray-300 rounded-md text-right font-bold"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Amount in Words:</span>
                  <input
                    type="text"
                    value={words}
                    onChange={(e) => setWords(e.target.value)}
                    className="w-2/3 px-2 py-1 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <CreditCard className="mr-2 h-5 w-5" /> Bank Details
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex w-full">
           <div className="mb-4 w-full mr-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose a Currency --</option>
                  <option value="USD">USD</option>
                  <option value="EURO">EURO</option>
                </select>
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose a Bank --</option>
                  <option value="CBI">CBI</option>
                  <option value="ENBD">ENBD</option>
                  <option value="ARAB_AFRICAN">ARAB AFRICAN</option>
                </select>
              </div>
           </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary</label>
                  <input
                    type="text"
                    value={beneficiary}
                    onChange={(e) => setBeneficiary(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
                  <input
                    type="text"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Swift Code</label>
                  <input
                    type="text"
                    value={swift}
                    onChange={(e) => setSwift(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
                  <input
                    type="text"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={updateProforma}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save className="mr-2 h-5 w-5" /> Update Invoice
            </button>
            <ReactPrint
              trigger={() => (
                <button id="printBtn" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <Printer className="mr-2 h-5 w-5" /> Print Invoice
                </button>
              )}
              content={() => ref.current}
              documentTitle="Proforma_Invoice"
            />
            <button
              onClick={() => {
                localStorage.setItem("proformaCopy", id)
                window.location.href = "/proforma"
              }}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <FileText className="mr-2 h-5 w-5" /> Copy Proforma
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Preview */}
       <div className="max-w-5xl mx-auto p-6 bg-white mb-10" ref={ref}>
             <div className="flex justify-between items-start mb-6">
               <div className="w-1/3">
                 <img
                   src="https://res.cloudinary.com/dfethvtz3/image/upload/v1717529312/autoCargo/DMALOGO1_acyd0q.png"
                   alt="DMA Logo"
                   className="max-w-full h-auto"
                 />
               </div>
               <div className="w-1/3 text-right">
                 <p className="font-semibold">DMA TOBACCO TRADING LLC</p>
                 <p className="text-sm text-gray-600">Office. 120 | 2020 Building | Al Quoz-3| PB.128744</p>
                 <p className="text-sm text-gray-600">Dubai United Arab Emirates | Tel.+971 4572 0340</p>
                 <p className="text-sm text-gray-600">Logistics@dmadubai.com</p>
                 <p className="text-sm text-gray-600">www.dmadubai.com</p>
               </div>
             </div>
     
             <div className="border-2 border-gray-800 mb-6">
               <h1 className="text-center font-bold text-xl py-2 bg-gray-100">PROFORMA INVOICE</h1>
             </div>
     
             <div className="flex mb-6">
               <div className="w-2/3 border-2 border-gray-800 p-4">
                 <div className="border-b border-gray-800 pb-2 mb-2">
                   <strong>SELLER</strong>
                 </div>
                 <p className="font-semibold">DMA TOBACCO TRADING LLC</p>
                 <p className="font-semibold">Office. 120 | 2020 Building | Al Quoz-3|</p>
                 <p className="font-semibold">PB.128744</p>
                 <p className="font-semibold">Dubai United Arab Emirates | Tel.+971 4 572 0340</p>
               </div>
               <div className="w-1/3 border-2 border-gray-800 border-l-0 p-4">
                 <p className="text-center font-semibold">{invoiceDate1}</p>
                 <p className="text-center font-semibold">{invoiceDate2}</p>
                 <p className="text-center font-semibold">{invoiceDate3}</p>
                 <p className="text-center font-semibold">{invoiceDate4}</p>
               </div>
             </div>
     
             <div className="flex mb-6">
               <div className="w-2/3 border-2 border-gray-800 p-4">
                 <div className="border-b border-gray-800 pb-2 mb-2">
                   <strong>CONSIGNEE</strong>
                 </div>
                 <p className="font-semibold">{consignee1}</p>
                 <p className="font-semibold">{consignee2}</p>
                 <p className="font-semibold">{consignee3}</p>
                 <p className="font-semibold">{consignee4}</p>
                 <p className="font-semibold">{consignee5}</p>
                 <p className="font-semibold">{consignee6}</p>
               </div>
               <div className="w-1/3 border-2 border-gray-800 border-l-0 p-4">
                 <div className="flex h-full">
                   <div className="w-1/2 border-r border-gray-800 flex flex-col justify-center items-center">
                     <p className="text-center font-semibold mb-2">Country of Origin</p>
                     <p className="text-center font-semibold">{coo}</p>
                   </div>
                   <div className="w-1/2 flex flex-col justify-center items-center">
                     <p className="text-center font-semibold mb-2">Country of final destination</p>
                     <p className="text-center font-semibold">{cofd}</p>
                   </div>
                 </div>
               </div>
             </div>
     
             <div className="flex mb-6">
               <div className="w-2/3 border-2 border-gray-800 p-4">
                 <p className="text-center font-semibold">{product}</p>
               </div>
               <div className="w-1/3 border-2 border-gray-800 border-l-0 p-4">
                 <div className="border-b border-gray-800 pb-2 mb-2 text-center">
                   <strong>Term Of Delivery & Payment</strong>
                 </div>
                 <p className="text-center font-semibold">CIF Alexandria Old Port, Egypt</p>
                 <p className="text-center font-semibold">100% By TT (CAD)</p>
                 <p className="text-center font-semibold">Cash Against Documents</p>
               </div>
             </div>
     
             <table className="w-full border-2 border-gray-800 mb-6">
               <thead>
                 <tr className="bg-gray-100">
                   <th className="border-2 border-gray-800 p-2 text-sm">Marks & Nos.</th>
                   <th className="border-2 border-gray-800 p-2 text-sm">No. & Kind of Pkgs</th>
                   <th className="border-2 border-gray-800 p-2 text-sm">Description of Goods</th>
                   <th className="border-2 border-gray-800 p-2 text-sm">Quantity</th>
                   <th className="border-2 border-gray-800 p-2 text-sm">PRICE/KG</th>
                   <th className="border-2 border-gray-800 p-2 text-sm">TOTAL {currency}({currency == 'USD' ? '$' : '€'})</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td className="border-2 border-gray-800 p-2 align-top">
                     {invoiceItems.map((item, index) => (
                       <React.Fragment key={index}>
                         {item.marks}
                         {index < invoiceItems.length - 1 && item.marks && <br />}
                       </React.Fragment>
                     ))}
                   </td>
                   <td className="border-2 border-gray-800 p-2 align-top">
                     {invoiceItems.map((item, index) => (
                       <React.Fragment key={index}>
                         {item.no}
                         {index < invoiceItems.length - 1 && item.no && <br />}
                       </React.Fragment>
                     ))}
                   </td>
                   <td className="border-2 border-gray-800 p-2 align-top">
                     {invoiceItems.map((item, index) => (
                       <React.Fragment key={index}>
                         {item.desc}
                         {index < invoiceItems.length - 1 && item.desc && <br />}
                       </React.Fragment>
                     ))}
                   </td>
                   <td className="border-2 border-gray-800 p-2 align-top">
                     {invoiceItems.map((item, index) => (
                       <React.Fragment key={index}>
                         {item.qty}
                         {index < invoiceItems.length - 1 && item.qty && <br />}
                       </React.Fragment>
                     ))}
                   </td>
                   <td className="border-2 border-gray-800 p-2 align-top">
                     {invoiceItems.map((item, index) => (
                       <React.Fragment key={index}>
                         {item.price}
                         {index < invoiceItems.length - 1 && item.price && <br />}
                       </React.Fragment>
                     ))}
                   </td>
                   <td className="border-2 border-gray-800 p-2 align-top">
                     {invoiceItems.map((item, index) => (
                       <React.Fragment key={index}>
                         {item.total}
                         {index < invoiceItems.length - 1 && item.total && <br />}
                       </React.Fragment>
                     ))}
                   </td>
                 </tr>
               </tbody>
             </table>
     
             <div className="border-2 border-gray-800 p-4">
               <div className="flex justify-between mb-2">
                 <p>Amount chargeable (In Words)</p>
                 <p className="font-bold">Total {currency}({currency == 'USD' ? '$' : '€'}) {total}</p>
               </div>
               <p className="mb-4">( {currency} {words} only).</p>
     
               <div className="flex justify-between">
                 <div className="w-2/3">
                   <p className="font-bold underline mb-2">Bank Details</p>
                   <div className="grid grid-cols-3 gap-2 mb-1">
                     <p className="font-bold col-span-1">Name of the Beneficiary:</p>
                     <p className="col-span-2">{beneficiary}</p>
                   </div>
                   <div className="grid grid-cols-3 gap-2 mb-1">
                     <p className="font-bold col-span-1">Bank Account with:</p>
                     <p className="col-span-2">{bank}</p>
                   </div>
                   <div className="grid grid-cols-3 gap-2 mb-1">
                     <p className="font-bold col-span-1">Branch:</p>
                     <p className="col-span-2">{branch}</p>
                   </div>
                   <div className="grid grid-cols-3 gap-2 mb-1">
                     <p className="font-bold col-span-1">Account no:</p>
                     <p className="col-span-2">{accountNumber}</p>
                   </div>
                 </div>
                 <div className="w-1/3 flex justify-end mr-8 items-center">
            <img
             onDoubleClick={()=>{
              document.getElementById('Seal').style.display = 'none'
            }}
            id="Seal"
              src="https://res.cloudinary.com/dfethvtz3/image/upload/v1717530100/autoCargo/0c020972-51f3-4eb8-8b3e-13409fc9cec1.png"
              alt="Seal"
              className="w-32 h-32"
            />
          </div>
               </div>
     
               <div className="flex justify-between mt-4 border-t border-gray-300 pt-2">
                 <div className="flex gap-2">
                   <p className="font-bold">Swift Code:</p>
                   <p>{swift}</p>
                 </div>
                 <div className="flex gap-2">
                   <p className="font-bold">IBAN:</p>
                   <p>{iban}</p>
                 </div>
               </div>
             </div>
           </div>
    </div>
  )
}

export default EditProformaV2

