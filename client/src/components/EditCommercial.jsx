import React, { useEffect, useRef, useState } from "react";
import ReactPrint from "react-to-print";
import axios from 'axios'
import { SERVER_URL } from "../../urls/urls";
import toast from 'react-hot-toast'
import { useParams } from "react-router-dom";
function EditCommercial() {
  const ref = useRef();
  const {id} = useParams()
  const [type,setType] = useState("COMMERCIAL INVOICE A")

  const [invoiceDate1, setInvoiceDate1] = useState("Invoice No. & Date");
  const [invoiceDate2, setInvoiceDate2] = useState("DMA/42/23-24");
  const [invoiceDate3, setInvoiceDate3] = useState("Dtd 19.03.2024");
  const [invoiceDate4, setInvoiceDate4] = useState("Ship. REF. : MAL24-0224");

  const [consignee1, setConsignee1] = useState("EL -WARDA FOR TOBACOO COMPANY");
  const [consignee2, setConsignee2] = useState(
    "AHMED FATHI AHMED EL - TALAWI AND PARTNERS"
  );
  const [consignee3, setConsignee3] = useState("AWEL TAREEK SHEBIN EL -KOEM");
  const [consignee4, setConsignee4] = useState(
    "QUESINA - MENOFYA , P.O BOX 95"
  );
  const [consignee5, setConsignee5] = useState("SHEBIN EL KOEM");
  const [consignee6, setConsignee6] = useState("EGYPT");

  const [coo, setCoo] = useState("Malawi");
  const [cofd, setCofd] = useState("Egypt");

  const [marks1, setMarks1] = useState("Net WT    : 44316.0 Kgs");
  const [marks2, setMarks2] = useState("Gross WT : 47371.2 Kgs");
  const [marks3, setMarks3] = useState("");
  const [marks4, setMarks4] = useState("");
  const [marks5, setMarks5] = useState("");

  const [no1, setNo1] = useState("& Kind of Pkgs");
  const [no2, setNo2] = useState("228 Cartons");
  const [no3, setNo3] = useState("");
  const [no4, setNo4] = useState("");
  const [no5, setNo5] = useState("");

  const [desc1, setDesc1] = useState("DFCMW/3");
  const [desc2, setDesc2] = useState("DFCMW/4");
  const [desc3, setDesc3] = useState("DFCMW/4");
  const [desc4, setDesc4] = useState("");
  const [desc5, setDesc5] = useState("");

  const [qty1, setQty1] = useState("10652.40");
  const [qty2, setQty2] = useState("11481.90");
  const [qty3, setQty3] = useState("22181.70");
  const [qty4, setQty4] = useState("");
  const [qty5, setQty5] = useState("");

  const [price1, setPrice1] = useState("2.40");
  const [price2, setPrice2] = useState("2.40");
  const [price3, setPrice3] = useState("2.40");
  const [price4, setPrice4] = useState("");
  const [price5, setPrice5] = useState("");

  const [total1, setTotal1] = useState("25,565.76");
  const [total2, setTotal2] = useState("27,556.56");
  const [total3, setTotal3] = useState("53,236.08");
  const [total4, setTotal4] = useState("");
  const [total5, setTotal5] = useState("");


  const [total, setTotal] = useState("106,358.4");
  const [words, setWords] = useState("one Hundred Six Thousand, Three Hundred Fifty Eight & 40/100");

  const [product,setProduct] = useState('UNMANUFACTURED MALAWI DARK FIRD TOBACCO- CROP 2023')

  const [acid,setAcid] = useState('1002405502024030052')




   // bank details
    const [selectedBank, setSelectedBank] = useState("");
  
    const [beneficiary,setBeneficiary] = useState('DMA TOBACCO TRADING LLC')
    const [bank,setBank] = useState('CBI BANK (COMMERCIAL BANK INTERNATIONAL)')
    const [branch,setBranch] = useState('JUMEIRAH BRANCH')
    const [accountNumber,setAccountNumber] = useState('100090172505')
    const [swift,setSwift] = useState('CLIBIAEAD')
    const [iban,setIban] = useState('AE330220000100090172505')
  
    const bankDetails = {
      "CBI": {
          beneficiary: "DMA TOBACCO TRADING LLC",
          bank: "CBI BANK (COMMERCIAL BANK INTERNATIONAL)",
          branch: "JUMEIRAH BRANCH",
          accountNumber: "100090172505",
          swift: "CLIBIAEAD",
          iban: "AE330220000100090172505",
      },
      "ENBD": {
          beneficiary: "DMA TOBACCO TRADING LLC",
          bank: "EMIRATES ENBD BANK",
          branch: "Al Muraqabbat Branch",
          accountNumber: "1025887751702",
          swift: "EBILAEAD",
          iban: "AE560260001025887751702",
      },
      "ARAB_AFRICAN": {
          beneficiary: "DMA TOBACCO TRADING LLC",
          bank: "ARAB AFRICAN INTERNATIONAL BANK (AAIB)",
          branch: "DUBAI BRANCH",
          accountNumber: "DUB-040801-3931-USD-001",
          swift: "ARAIAEAD",
          iban: "AE470070040801393109001",
      }
  };
  
  
  useEffect(() => {
    if (selectedBank && bankDetails[selectedBank]) {
        const details = bankDetails[selectedBank];
        setBeneficiary(details.beneficiary);
        setBank(details.bank);
        setBranch(details.branch);
        setAccountNumber(details.accountNumber);
        setSwift(details.swift);
        setIban(details.iban);
    }
  }, [selectedBank]);



  function numberToWords(amount) {
    const singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const twoDigits = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tensMultiple = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Million", "Billion"];

    if (amount === "0") return "Zero";

    let [integerPart, decimalPart] = amount.toString().split(".");
    integerPart = integerPart.replace(/,/g, '');
    let words = "";

    function getWords(num) {
        if (num.length === 0) return "";
        if (num.length === 1) return singleDigits[parseInt(num)];
        if (num.length === 2) {
            if (num[0] === '1') {
                return twoDigits[parseInt(num[1])];
            } else {
                return tensMultiple[parseInt(num[0])] + (num[1] !== '0' ? " " + singleDigits[parseInt(num[1])] : "");
            }
        }
        if (num.length === 3) {
            return singleDigits[parseInt(num[0])] + " Hundred " + getWords(num.slice(1));
        }
        let length = num.length;
        let group = Math.floor((length - 1) / 3);
        let groupValue = num.slice(0, length - group * 3);
        return getWords(groupValue) + " " + thousands[group] + " " + getWords(num.slice(length - group * 3));
    }

    words = getWords(integerPart).trim();

    if (decimalPart) {
        words += " & " + decimalPart + "/100";
    } else {
        words += " & 00/100";
    }

    return words.replace(/\s+/g, " ");
}

  const updateCommercial = async()=>{
    toast.loading("Updating Commerical Invoice")
    const data ={
      type,
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
      marks1,
      marks2,
      marks3,
      marks4,
      marks5,
      no1,
      no2,
      no3,
      no4,
      no5,
      desc1,
      desc2,
      desc3,
      desc4,
      desc5,
      qty1,
      qty2,
      qty3,
      qty4,
      qty5,
      price1,
      price2,
      price3,
      price4,
      price5,
      total1,
      total2,
      total3,
      total4,
      total5,
      total,
      words,
      product,
      acid
    }
    toast.dismiss()
    const res = await axios.post(`${SERVER_URL}/updateCommercial/${id}`,{data})
    if(res.data.success)
      {
        toast.success("Saved")
        document.getElementById('btn').click()

      }
      else
      {
        toast.error("Error")

      }
  }

  
  const getData = async()=>{
    const res = await axios.get(`${SERVER_URL}/getCommercial/${id}`)
    if(res.data.success)
      {
        const data = res.data.data;

        setAcid(data.acid)

        setInvoiceDate1(data.invoiceDate1);
        setInvoiceDate2(data.invoiceDate2);
        setInvoiceDate3(data.invoiceDate3);
        setInvoiceDate4(data.invoiceDate4);

        setConsignee1(data.consignee1);
        setConsignee2(data.consignee2);
        setConsignee3(data.consignee3);
        setConsignee4(data.consignee4);
        setConsignee5(data.consignee5);
        setConsignee6(data.consignee6);

        setCoo(data.coo);
        setCofd(data.cofd);

        setMarks1(data.marks1);
        setMarks2(data.marks2);
        setMarks3(data.marks3);
        setMarks4(data.marks4);
        setMarks5(data.marks5);

        setNo1(data.no1);
        setNo2(data.no2);
        setNo3(data.no3);
        setNo4(data.no4);
        setNo5(data.no5);

        setDesc1(data.desc1);
        setDesc2(data.desc2);
        setDesc3(data.desc3);
        setDesc4(data.desc4);
        setDesc5(data.desc5);

        setQty1(data.qty1);
        setQty2(data.qty2);
        setQty3(data.qty3);
        setQty4(data.qty4);
        setQty5(data.qty5);

        setPrice1(data.price1);
        setPrice2(data.price2);
        setPrice3(data.price3);
        setPrice4(data.price4);
        setPrice5(data.price5);

        setTotal1(data.total1);
        setTotal2(data.total2);
        setTotal3(data.total3);
        setTotal4(data.total4);
        setTotal5(data.total5);

        setTotal(data.total);
        setWords(data.words);
        setProduct(data.product);
              
      }
      else
      {
        toast.error("UNKNOWN ERROR")
      }
  }

  useEffect(()=>{
    getData()
  },[])



  const handleTotalChange = (qty, price, setTotal) => {

    if (!isNaN(qty) && !isNaN(price)) {
      setTotal((parseFloat(qty) * parseFloat(price)).toFixed(2));
    }
    else
    {
      console.log("error")
    }
  };

  useEffect(() => {
    const totals = [total1, total2, total3, total4, total5].map(total =>
      parseFloat(total.replace(/,/g, '')) || 0
    );
    const sum = totals.reduce((acc, curr) => acc + curr, 0);
    setTotal(sum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  }, [total1, total2, total3, total4, total5]);

  useEffect(()=>{
    const amount = total
    setWords(numberToWords(amount))
  },[total])

  return (
    <>
    <span className="flex justify-center">
    <button
            className="my-3 ml-10 px-5 py-1 border rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
           onClick={()=>{
            localStorage.setItem('commercialCopy',id)
            location.href='/'
           }}
          >
            Copy Commercial
          </button>
    </span>
      <div className="p-10 mt-10 border-2 border-black">
      <h2 className="text-center font-bold mb-4 underline">
          INVOICE TYPE
        </h2>
        <span className="flex justify-center ">
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value.toUpperCase())}
            className="border border-black p-1 rounded-md ml-3"
            placeholder="line 2"
          />
        </span>
        <h2 className="text-center font-bold mb-4 underline">
          Invoice Date column
        </h2>
        <span className="flex justify-center ">
          <input
            type="text"
            value={invoiceDate1}
            onChange={(e) => setInvoiceDate1(e.target.value)}
            className="border border-black p-1 rounded-md ml-3"
            placeholder="line 1"
          />
          <input
            type="text"
            value={invoiceDate2}
            onChange={(e) => setInvoiceDate2(e.target.value)}
            className="border border-black p-1 rounded-md ml-3"
            placeholder="line 2"
          />
          <input
            type="text"
            value={invoiceDate3}
            onChange={(e) => setInvoiceDate3(e.target.value)}
            className="border border-black p-1 rounded-md ml-3"
            placeholder="line 3"
          />
          <input
            type="text"
            value={invoiceDate4}
            onChange={(e) => setInvoiceDate4(e.target.value)}
            className="border border-black p-1 rounded-md ml-3"
            placeholder="line 4"
          />
        </span>
        <h2 className="text-center font-bold mb-4 underline">
          Country of origin & final destination
        </h2>
        <span className="flex justify-center ">
          <input
            type="text"
            value={coo}
            onChange={(e) => setCoo(e.target.value)}
            className="border border-black p-1 rounded-md ml-3"
            placeholder="line 2"
          />
          <input
            type="text"
            value={cofd}
            onChange={(e) => setCofd(e.target.value)}
            className="border border-black p-1 rounded-md ml-3"
            placeholder="line 3"
          />
        </span>
      </div>

      <div className="p-10 mt-10 border-2 border-black">

      <h2 className="text-center font-bold mb-2 mt-2 underline">
          Acid Number
        </h2>
        <span className="flex justify-center ">
          <input
            type="text"
            value={acid}
            readOnly
            // onChange={(e) =>setAcid(e.target.value)}
            className="border border-black p-1 rounded-md ml-3 w-1/6"
            placeholder="line 2"
          />
         
         
        </span>


        <h2 className="text-center font-bold mb-4 underline">
          CONSIGNEE column
        </h2>
        <span className="flex justify-center flex-wrap">
          <input
            type="text"
            value={consignee1}
            onChange={(e) => setConsignee1(e.target.value)}
            className="border border-black p-1 rounded-md ml-3 w-1/6"
            placeholder="line 2"
          />
          <input
            type="text"
            value={consignee2}
            onChange={(e) => setConsignee2(e.target.value)}
            className="border border-black p-1 rounded-md ml-3 w-1/4"
            placeholder="line 3"
          />
          <input
            type="text"
            value={consignee3}
            onChange={(e) => setConsignee3(e.target.value)}
            className="border border-black p-1 rounded-md ml-3 w-1/6"
            placeholder="line 4"
          />
          <input
            type="text"
            value={consignee4}
            onChange={(e) => setConsignee4(e.target.value)}
            className="border border-black p-1 rounded-md ml-3 w-1/6"
            placeholder="line 2"
          />
          <input
            type="text"
            value={consignee5}
            onChange={(e) => setConsignee5(e.target.value)}
            className="border border-black p-1 rounded-md ml-3"
            placeholder="line 3"
          />
          <input
            type="text"
            value={consignee6}
            onChange={(e) => setConsignee6(e.target.value)}
            className="border border-black p-1 rounded-md ml-3"
            placeholder="line 4"
          />
        </span>

        <h2 className="text-center font-bold mb-4 underline mt-5">
          DATA TABLE
        </h2>

        <table className="mx-auto mt-5">
          <thead>
            <tr>
              <th className="p-1 border border-black">Marks & Nos.</th>
              <th className="p-1 border border-black">No. & Kind of Pkgs</th>
              <th className="p-1 border border-black">Description of Goods</th>
              <th className="p-1 border border-black">Quantity</th>
              <th className="p-1 border border-black">PRICE/KG</th>
              <th className="p-1 border border-black">TOTAL USD($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-1 border border-black">
                <input onChange={(e) => setMarks1(e.target.value)} value={marks1} type="text" />
              </td>
              <td className="p-1 border border-black">
                <input onChange={(e) => setNo1(e.target.value)} value={no1} type="text" />
              </td>
              <td className="p-1 border border-black">
                <input onChange={(e) => setDesc1(e.target.value)} value={desc1} type="text" />
              </td>
              <td className="p-1 border border-black">
                <input  onChange={(e) => {
                      setQty1(e.target.value);
                      handleTotalChange(e.target.value, price1, setTotal1);
                    }}
                     value={qty1} type="text" />
              </td>
              <td className="p-1 border border-black">
                <input 
                 onChange={(e) => {
                  setPrice1(e.target.value);
                  handleTotalChange(qty1, e.target.value, setTotal1);
                }}
                value={price1} type="text" />
              </td>
              <td className="p-1 border border-black">
                <input onChange={(e) => setTotal1(e.target.value)} value={total1} type="text" />
              </td>
            </tr>
            <tr>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setMarks2(e.target.value)}
                  value={marks2}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setNo2(e.target.value)}
                  value={no2}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setDesc2(e.target.value)}
                  value={desc2}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => {
                    setQty2(e.target.value);
                    handleTotalChange(e.target.value, price2, setTotal2);
                  }}
                  value={qty2}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => {
                    setPrice2(e.target.value);
                    handleTotalChange(qty2, e.target.value, setTotal2);
                  }}
                  value={price2}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setTotal2(e.target.value)}
                  value={total2}
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setMarks3(e.target.value)}
                  value={marks3}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setNo3(e.target.value)}
                  value={no3}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setDesc3(e.target.value)}
                  value={desc3}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                 onChange={(e) => {
                  setQty3(e.target.value);
                  handleTotalChange(e.target.value, price3, setTotal3);
                }}
                  value={qty3}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => {
                    setPrice3(e.target.value);
                    handleTotalChange(qty3, e.target.value, setTotal3);
                  }}
                  value={price3}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setTotal3(e.target.value)}
                  value={total3}
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setMarks4(e.target.value)}
                  value={marks4}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setNo4(e.target.value)}
                  value={no4}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setDesc4(e.target.value)}
                  value={desc4}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => {
                    setQty4(e.target.value);
                    handleTotalChange(e.target.value, price4, setTotal4);
                  }}
                  value={qty4}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                 onChange={(e) => {
                  setPrice4(e.target.value);
                  handleTotalChange(qty4, e.target.value, setTotal4);
                }}
                  value={price4}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setTotal4(e.target.value)}
                  value={total4}
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setMarks5(e.target.value)}
                  value={marks5}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setNo5(e.target.value)}
                  value={no5}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setDesc5(e.target.value)}
                  value={desc5}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                 onChange={(e) => {
                  setQty5(e.target.value);
                  handleTotalChange(e.target.value, price5, setTotal5);
                }}
                  value={qty5}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => {
                    setPrice5(e.target.value);
                    handleTotalChange(qty5, e.target.value, setTotal5);
                  }}
                  value={price5}
                  type="text"
                />
              </td>
              <td className="p-1 border border-black">
                <input
                  onChange={(e) => setTotal5(e.target.value)}
                  value={total5}
                  type="text"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-center font-bold mb-4 underline">
          Total USD AND WORDS
        </h2>
        <span className="flex justify-center ">
          <input
            type="text"
            value={words}
            onChange={(e) =>setWords(e.target.value)}
            className="border border-black p-1 rounded-md ml-3 w-1/3"
            placeholder="line 2"
          />
          <input
            type="text"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="border border-black p-1 rounded-md ml-3"
            placeholder="line 3"
          />
         
        </span>

        <h2 className="text-center font-bold mb-2 mt-2 underline">
          Product
        </h2>
        <span className="flex justify-center ">
          <input
            type="text"
            value={product}
            onChange={(e) =>setProduct(e.target.value)}
            className="border border-black p-1 rounded-md ml-3 w-1/3"
            placeholder="line 2"
          />
         
         
        </span>

      </div>
      <div className="mb-5 mt-5 p-2" ref={ref}>
        <div className="flex w-full justify-between items-start">
          <span className="mr-5">
            <img
              width={350}
              src="https://res.cloudinary.com/dfethvtz3/image/upload/v1717529312/autoCargo/DMALOGO1_acyd0q.png"
              alt="Logo"
            />
          </span>
          <span>
            <p>DMA TOBACCO TRADING LLC</p>
            <p>Office. 120 | 2020 Building | Al Quoz-3|</p>
            <p>PB.128744</p>
            <p>Dubai United Arab Emirates | Tel.+971 4572 0340</p>
            <p>Logistics@dmadubai.com</p>
            <p>www.dmadubai.com</p>
          </span>
        </div>

        <div className="flex justify-center mt-5 w-full">
          <span className="border-2 border-black w-full">
            <p className="text-center font-bold">{type}</p>
          </span>
        </div>

        <div className="flex justify-between mt-5 w-full">
          <div className="border-4 border-black w-full">
            <span className="border-b-2 border-r-2 border-black px-2">
              <strong>SELLER</strong>
            </span>
            <p className="ml-3 font-semibold">DMA TOBACCO TRADING LLC</p>
            <p className="ml-3 font-semibold">
              Office. 120 | 2020 Building | Al Quoz-3|
            </p>
            <p className="ml-3 font-semibold">PB.128744</p>
            <p className="ml-3 font-semibold">
              Dubai United Arab Emirates | Tel.+971 4 572 0340
            </p>
          </div>
          <div className="border-t-4 border-l-2 border-r-4 border-black w-96">
            <p className="text-center font-semibold">{invoiceDate1}</p>
            <p className="text-center font-semibold">{invoiceDate2}</p>
            <p className="text-center font-semibold">{invoiceDate3}</p>
            <p className="text-center font-semibold">{invoiceDate4}</p>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="border-2 border-l-4 border-r-4 border-b-4 border-black w-full">
            <span className="border-b-2 border-r-2 border-black px-2">
              <strong>CONSIGNEE</strong>
            </span>
            <p className="ml-3 font-semibold">{consignee1}</p>
            <p className="ml-3 font-semibold">{consignee2}</p>
            <p className="ml-3 font-semibold">{consignee3}</p>
            <p className="ml-3 font-semibold">{consignee4}</p>
            <p className="ml-3 font-semibold">{consignee5}</p>
            <p className="ml-3 font-semibold">{consignee6}</p>
          </div>
          <div className="flex border-b-2 border-l-2 border-r-4 border-black w-96">
            <div className="border-2 border-t-2 border-black mt-10 w-1/2">
              <hr className="border-2 border-black" />
              <p className="text-center mt-3 font-semibold">
                Country of Origin
              </p>
              <p className="text-center font-semibold">{coo}</p>
            </div>
            <div className="border-2 border-black mt-10 w-1/2">
              <hr className="border-2 border-black" />
              <p className="text-center text-sm mt-3 font-semibold">
                Country of final destination
              </p>
              <p className="text-center font-semibold">{cofd}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="border-2 border-t-0 border-r-0 border-l-4 border-black w-full">
            <span className="r">
              <p className="my-5 font-semibold ml-2">
              ACID: {acid} <br />
 Egyptian Importer Tax ID: 100240550 <br />
Foreign Exporter Registration Type: Company Registration Number <br />
Foreign Exporter ID: 1180637 <br />
Foreign Exporter Country: UNITED ARAB EMIRATES <br />
Foreign Exporter Country Code: AE
              </p>
            </span>
          </div>
          <div className="flex justify-end border-b-2 border-r-4 border-black w-96">
            <div className="border-2 border-l-4 border-b-4 my-1 border-black w-full">
              <p className="border-2 text-center border-black border-b-4 p-1 px-1 font-semibold text-sm">
                Term Of Delivery & Payment
              </p>
              <p className="p-1 px-1 font-semibold text-sm text-center">
                CIF Alexandria Old Port , Egypt
              </p>
              <p className="p-1 px-1 font-semibold text-sm text-center">
                100 % By TT (CAD)
              </p>
              <p className="p-1 px-1 font-semibold text-sm text-center">
                Cash Against Documents
              </p>
            </div>
          </div>
        </div>

        <center>
          <table className="w-full bg-white border-2 border-black">
            <thead>
              <tr>
                <th className=" border-2 border-l-4 border-black">
                  <p className="text-sm">Marks & Nos.</p>
                </th>
                <th className=" border-2 border-black">
                  <p className="text-sm"> No. & Kind of Pkgs</p>
                </th>
                <th className=" border-2 border-black">
                  <p className="text-sm"> Description of Goods</p>
                </th>
                <th className=" border-2 border-black">
                  <p className="text-sm">Quantity</p>
                </th>
                <th className=" border-2 border-black">
                  <p className="text-sm">PRICE/KG</p>
                </th>
                <th className=" border-2 border-black border-r-4">
                  <p className="text-sm">TOTAL USD($)</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td className="px-4 border-r-2 border-l-4 border-black">

              </td>
              <td className="px-4 border-r-2  border-black">

              </td>
              <td className="px-4 text-sm border-r-2  border-black">
            {product && product}
              </td>
              <td className="px-4 border-r-2  border-black">

              </td>
              <td className="px-4 border-r-2  border-black">

              </td>
              <td className="px-4 border-r-4 border-black">

              </td>
              </tr>
              <tr>
                <td className="px-4 text-sm border-2 border-l-4 border-t-0 border-black">
                  {marks1}
                  {marks2 && <br />}
                  {marks2}
                  {marks3 && <br />}
                  {marks3}
                  {marks4 && <br />}
                  {marks4}
                  {marks5 && <br />}
                  {marks5}
                </td>
                <td className="px-4 text-sm border-2 border-t-0 border-black">
                  {no1}
                  {no2 && <br />}
                  {no2}
                  {no3 && <br />}
                  {no3}
                  {no4 && <br />}
                  {no4}
                  {no5 && <br />}
                  {no5}
                </td>
                <td className="px-4 text-sm  border-2 border-t-0 border-black">
                 
                  {desc1}
                  {desc2 && <br />}
                  {desc2}
                  {desc3 && <br />}
                  {desc3}
                  {desc4 && <br />}
                  {desc4}
                  {desc5 && <br />}
                  {desc5}
                </td>
                <td className="px-4 text-sm border-2 border-t-0 border-black">
               
                  {qty1}
                  {qty2 && <br />}
                  {qty2}
                  {qty3 && <br />}
                  {qty3}
                  {qty4 && <br />}
                  {qty4}
                  {qty5 && <br />}
                  {qty5}
                </td>
                <td className="px-4 text-sm border-2 border-t-0 border-black">
                  {price1}
                  {price2 && <br />}
                  {price2}
                  {price3 && <br />}
                  {price3}
                  {price4 && <br />}
                  {price4}
                  {price5 && <br />}
                  {price5}
                </td>
                <td className="px-4 text-sm border-2 border-t-0 border-r-4 border-black">
                  {total1}
                  {total2 && <br />}
                  {total2}
                  {total3 && <br />}
                  {total3}
                  {total4 && <br />}
                  {total4}
                  {total5 && <br />}
                  {total5}
                </td>
              </tr>
              <tr className="border-l-4 border-black border-b-4 border-r-4">
                <td colSpan={6}>
                  <div className="border-0 border-black w-full">
                    <span className="px-9 flex justify-between">
                      <p>Amount chargeable (In Words) </p>
                      <p className="font-semibold">Total USD($) {total}</p>
                    </span>
                    <p className="text-start ml-2">
                        ( US Dollars {words} only).
                    </p>
                    <div className="flex justify-between">
                      <span>
                        <p className="text-start ml-1 underline font-semibold">
                          Bank Details
                        </p>
                        <p className="text-start ml-1">
                          <strong className="mr-[85px]">
                            Name of the Beneficiary :
                          </strong>{" "}
                          {beneficiary}
                        </p>
                        <p className="text-start ml-1">
                          <strong className="mr-[125px]">
                            Bank Account with :
                          </strong>{" "}
                          {bank}
                        </p>
                        <p className="text-start ml-1">
                          <strong className="mr-[215px]">Branch : </strong>
                          {branch}
                        </p>
                        <p className="text-start ml-1">
                          <strong className="mr-[180px]">Account no :</strong>{" "}
                          {accountNumber}
                        </p>
                      </span>

                      <span className="mr-5">
                        <img
                          width={150}
                          src="https://res.cloudinary.com/dfethvtz3/image/upload/v1717530100/autoCargo/0c020972-51f3-4eb8-8b3e-13409fc9cec1.png"
                          alt="Seal"
                        />
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <p>Swift Code </p>
                      <p>{swift}</p>
                      <p>IBAN</p>
                      <p className="mr-16">{iban}</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* <div className="border-2 w-full">
            <div className="border-4 border-black w-full">
              <span className="px-9 flex justify-between">
                <p>Amount chergeable ( In Words) </p>
                <p>Total USD($) 105,868.32</p>
              </span>
              <p className="text-start ml-2">
                ( US Dollars one Hundred five Thousand,Eight Hundred Sixty Eight
                & 32/100 only).
              </p>
              <div className="flex justify-between">
                <span>
                  <p className="text-start ml-1 underline font-semibold">
                    Bank Details
                  </p>
                  <p className="text-start ml-1">
                    <strong className="mr-[85px]">
                      Name of the Beneficiary :
                    </strong>{" "}
                    DMA TOBACCO TRADING LLC
                  </p>
                  <p className="text-start ml-1">
                    <strong className="mr-[125px]">Bank Account with :</strong>{" "}
                    CBI BANK <small>(COMMERCIAL BANK INTERNATIONAL)</small>
                  </p>
                  <p className="text-start ml-1">
                    <strong className="mr-[215px]">Branch : </strong>JUMEIRAH
                    BRAANCH{" "}
                  </p>
                  <p className="text-start ml-1">
                    <strong className="mr-[180px]">Account no :</strong>{" "}
                    100090172505
                  </p>
                </span>

                <span className="mr-5">
                  <img
                  width={150}
                    src="https://res.cloudinary.com/dfethvtz3/image/upload/v1717530100/autoCargo/0c020972-51f3-4eb8-8b3e-13409fc9cec1.png"
                    alt="Seal"
                  />
                </span>
              </div>

              <div className="flex justify-between">
                <p>Swift Code </p>
                <p>CLIBIAEAD</p>
                <p>IBAN</p>
                <p className="mr-16">AE330220000100090172505</p>
              </div>
            </div>
          </div> */}
        </center>
      </div>

     
      <ReactPrint
        trigger={() => (
          <button
            className="my-3 hidden px-5 py-1 border rounded-md bg-green-500 hover:bg-green-600 cursor-pointer text-white"
            id="btn"
          >
            Download PDF
          </button>
        )}
        content={() => ref.current}
        documentTitle={`FILE`}
      />
      <span className="flex justify-center mb-10">
      <button
            className="my-3 px-5 py-1 border rounded-md bg-green-500 hover:bg-green-600 cursor-pointer text-white"
           onClick={updateCommercial}
          >
            Update Invoice
          </button>

          <button
            className="my-3 ml-10 px-5 py-1 border rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
           onClick={()=>{
            localStorage.setItem('commercialCopy',id)
            location.href='/'
           }}
          >
            Copy Commercial
          </button>

      </span>
  
      <span className="flex justify-center">
      
      </span>
          
    </>
  );
}

export default EditCommercial;
