import React, { useEffect, useRef, useState } from "react";
import ReactPrint from "react-to-print";
import axios from "axios"
import toast,{Toaster} from 'react-hot-toast'
import { SERVER_URL } from "../../urls/urls";
const Commercial1 = () => {
  const ref = useRef();
  const [formattedDate, setFormattedDate] = useState("1/jan/2023");
  const [comInvoice, setComInvoice] = useState("IGST/PA/70/23-24");
  const [company, setCompany] = useState(
    "UNMANUFACTURED INDIAN DARK AIR CURED TOBACCO, crop 2023"
  );
  const [port, setPort] = useState("CIF ALEXANDRIA OLD PORT, EGYPT");
  const [supplier, setSupplier] = useState("MESSRS");
  const [ad1, setAd1] = useState("TOBLEAF INTERNATIONAL");
  const [ad2, setAd2] = useState("6TH OCTOBER CITY, TOURIST AREA NR.6");
  const [ad3, setAd3] = useState("PLOT NR 76, APP.NO. 2");
  const [ad4, setAd4] = useState("GIZA - EGYPT");
  const [acid, setAcid] = useState("4730227452023120206");
  const [pt1, setPt1] = useState("90 days from arrival");
  const [pt2, setPt2] = useState("91 days from arrival");
  const [pt3, setPt3] = useState("92 days from arrival");
  const [pt4, setPt4] = useState("93 days from arrival");
  const [pt5, setPt5] = useState("");
  const [pt6, setPt6] = useState("");
  const [total, setTotal] = useState(0);
  const [signature, setSignature] = useState("ranju");
  const [signPic, setSignPic] = useState(
    "https://res.cloudinary.com/dfethvtz3/image/upload/v1716369804/autoCargo/image_ywat4p.png"
  );
  // ORIGIN	GRADE	NET KGs	GROSS WEIGHT	PRICE/ KG $	No. of Cartons	AMOUNT ($ USD)
  const [h1, setH1] = useState("ORIGIN");
  const [h2, setH2] = useState("GRADE");
  const [h3, setH3] = useState("NET KGs");
  const [h4, setH4] = useState("GROSS WEIGHT");
  const [h5, setH5] = useState("PRICE/ KG $");
  const [h6, setH6] = useState("No. of Cartons");
  const [h7, setH7] = useState("AMOUNT ($ USD)");
  const [v1, setV1] = useState("india");
  const [v2, setV2] = useState("asd");
  const [v3, setV3] = useState("44000");
  const [v4, setV4] = useState("asd");
  const [v5, setV5] = useState("1.99");
  const [v6, setV6] = useState("asd");
  const [v7, setV7] = useState("asd");
  const [amounts,setAmounts] = useState([])
 
  
  const [data, setData] = useState([]);

  const [span,setSpan] = useState(5)

  const saveInvoice = async()=>{

    const data1 = {
      commercialInvoice:comInvoice,
      date:formattedDate,
      
      address1:ad1,
      address2:ad2,
      address3:ad3,
      address4:ad4,
      signature:signPic,
      company:company,
      acid,
      pt1,
      pt2,
      pt3,
      pt4,
      pt5,
      pt6,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      h7,
      values:data,
      total


      
    }
      toast.loading("Loading...")
    const res = await axios.post(`${SERVER_URL}/save`,data1)
    toast.dismiss()
    if(res.data.success)
      {
        toast.success("New Entry Saved")
        setTimeout(()=>{
            location.reload()
        },1500)
      }
      else
      {
        toast.error("Error Saving New Entry")
      }

  }
  const addData = () => {
    const newData = {
      v1,
      v2,
      v3,
      v4,
      v5,
      v6,
      v7,
    };

    setData([...data, newData]);

  
    let headlist = []
    if (h1.length > 0) {
      headlist.push(h1);
    }
    if (h2.length > 0) {
      headlist.push(h2);
    }
    if (h3.length > 0) {
      headlist.push(h3);
    }
    if (h4.length > 0) {
      headlist.push(h4);
    }
    if (h5.length > 0) {
      headlist.push(h5);
    }
    if (h6.length > 0) {
      headlist.push(h6);
    }
    if (h7.length > 0) {
      headlist.push(h7);
    }

    const kgPos = headlist.indexOf('NET KGs');
    const pricePos = headlist.indexOf('PRICE/ KG $');
    const amountPos = headlist.indexOf('AMOUNT ($ USD)')
    console.log('amt pos ',amountPos)


    const calculateAmount = () => {
      const values = [v1,v2,v3,v4,v5,v6,v7]
      const netKgs = parseFloat(values[kgPos]) || 0;
      const pricePerKg = parseFloat(values[pricePos]) || 0;
      let total = netKgs * pricePerKg
     
      
      setAmounts([...amounts, total])      
      total = total.toLocaleString();
      values[amountPos] = '$ '+total
      const newData = {
        v1:values[0],
        v2:values[1],
        v3:values[2],
        v4:values[3],
        v5:values[4],
        v6:values[5],
        v7:values[6],
      };
  
      setData([...data, newData]);
      return total;
    };

    const total =  calculateAmount()
    console.log("total ",total)


  };

  useEffect(() => {
    if (signature == "ranju") {
      setSignPic(
        "https://res.cloudinary.com/dfethvtz3/image/upload/v1716369804/autoCargo/image_ywat4p.png"
      );
    } else {
      setSignPic(
        "https://res.cloudinary.com/dfethvtz3/image/upload/v1717405000/autoCargo/signature2_cbvnnu.jpg"
      );
    }
  }, [signature]);

  const formatDate = (date) => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    if (inputDate) {
      setFormattedDate(formatDate(inputDate));
    } else {
      setFormattedDate("");
    }
  };

  useEffect(() => {
    let count = 0;
    if (h1) {
      count++;
    }
    if (h2) {
      count++;
    }
    if (h3) {
      count++;
    }
    if (h4) {
      count++;
    }
    if (h5) {
      count++;
    }
    if (h6) {
      count++;
    }
    if (h7) {
      count++;
    }

    if(count==7)
      {
        setSpan(5)
      }
      else if(count==6)
        {
          setSpan(4)
        }
        else if(count==5)
          {
            setSpan(3)
          }
          else if(count==4)
            {
              setSpan(2)
            }
            else if(count==3)
              {
                setSpan(1)
              }
   
  }, [h1, h2, h3, h4, h5, h6, h7]);

  const calcTotal = () => {
    console.log()
    const sum = amounts.reduce((acc, current) => acc + Number(current), 0);
    const formattedSum = sum.toLocaleString();
    console.log('sum',formattedSum)
    setTotal(formattedSum);
  };

  useEffect(()=>{
    calcTotal()
   
  },[amounts])
  return (
    <div className="container mx-auto p-4">
      {/* forms */}
     
      <div className="p-4 border-2">
        <h1 className="text-black text-center font-semibold underline">
          Edit Data
        </h1>

        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">
                COMMERCIAL INVOICE No
              </span>
              <input
                type="text"
                value={comInvoice}
                onChange={(e) => setComInvoice(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="COMMERCIAL INVOICE No"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Date</span>
              <input
                type="date"
                onChange={handleDateChange}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
              />
            </label>
          </div>
          {/* <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className="block">
            <span className="text-black font-semibold">Supplier</span>
            <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} className="mt-1 block w-full border-2 rounded-md border-gray-300" placeholder="Supplier" />
          </label>
        </div> */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Address Line 1</span>
              <input
                type="text"
                value={ad1}
                onChange={(e) => setAd1(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Address Line 1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Address Line 2</span>
              <input
                type="text"
                value={ad2}
                onChange={(e) => setAd2(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Address Line 2"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Address Line 3</span>
              <input
                type="text"
                value={ad3}
                onChange={(e) => setAd3(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Address Line 3"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Address Line 4</span>
              <input
                type="text"
                value={ad4}
                onChange={(e) => setAd4(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Address Line 4"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Signature</span>
              <select
                onChange={(e) => setSignature(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
              >
                <option value="">Select Signature</option>
                <option value="ranju">Ranju</option>
                <option value="salah">Salah</option>
                {/* <option value="signature3">Signature 3</option> */}
              </select>
            </label>
          </div>
        </div>
        <hr className="border border-black  rounded-2xl" />
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Company</span>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Company"
              />
            </label>
          </div>
          {/* <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className="block">
            <span className="text-black font-semibold">Port</span>
            <input type="text" value={port} onChange={(e) => setPort(e.target.value)} className="mt-1 block w-full border-2 rounded-md border-gray-300" placeholder="Port" />
          </label>
        </div> */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">ACID</span>
              <input
                type="text"
                value={acid}
                onChange={(e) => setAcid(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="ACID"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Payment Term 1</span>
              <input
                type="text"
                value={pt1}
                onChange={(e) => setPt1(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Payment Term 1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Payment Term 2</span>
              <input
                type="text"
                value={pt2}
                onChange={(e) => setPt2(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Payment Term 2"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Payment Term 3</span>
              <input
                type="text"
                value={pt3}
                onChange={(e) => setPt3(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Payment Term 3"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Payment Term 4</span>
              <input
                type="text"
                value={pt4}
                onChange={(e) => setPt4(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Payment Term 4"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Payment Term 5</span>
              <input
                type="text"
                value={pt5}
                onChange={(e) => setPt5(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Payment Term 5"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">Payment Term 6</span>
              <input
                type="text"
                value={pt6}
                onChange={(e) => setPt6(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="Payment Term 6"
              />
            </label>
          </div>
        </div>
        <hr className="border border-black  rounded-2xl" />
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">H1</span>
              <input
                type="text"
                value={h1}
                onChange={(e) => setH1(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="H1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">H2</span>
              <input
                type="text"
                value={h2}
                onChange={(e) => setH2(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="H2"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">H3</span>
              <input
                type="text"
                value={h3}
                onChange={(e) => setH3(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="H3"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">H4</span>
              <input
                type="text"
                value={h4}
                onChange={(e) => setH4(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="H4"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">H5</span>
              <input
                type="text"
                value={h5}
                onChange={(e) => setH5(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="H5"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">H6</span>
              <input
                type="text"
                value={h6}
                onChange={(e) => setH6(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="H6"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">H7</span>
              <input
                type="text"
                value={h7}
                onChange={(e) => setH7(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="H7"
              />
            </label>
          </div>
        </div>
        <hr className="border  border-black rounded-2xl" />
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">V1</span>
              <input
                type="text"
                value={v1}
                onChange={(e) => setV1(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="V1"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">V2</span>
              <input
                type="text"
                value={v2}
                onChange={(e) => setV2(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="V2"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">V3</span>
              <input
                type="text"
                value={v3}
                onChange={(e) => setV3(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="V3"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">V4</span>
              <input
                type="text"
                value={v4}
                onChange={(e) => setV4(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="V4"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">V5</span>
              <input
                type="text"
                value={v5}
                onChange={(e) => setV5(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="V5"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">V6</span>
              <input
                type="text"
                value={v6}
                onChange={(e) => setV6(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="V6"
              />
            </label>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className="block">
              <span className="text-black font-semibold">V7</span>
              <input
                type="text"
                value={v7}
                onChange={(e) => setV7(e.target.value)}
                className="mt-1 block w-full border-2 rounded-md border-gray-300"
                placeholder="V7"
              />
            </label>
          </div>

          <div className="w-full px-2 mb-4">
            <button
              onClick={addData}
              className="mt-1 block w-full bg-blue-500 text-white font-semibold py-2 rounded-md"
            >
              Add Column
            </button>
          </div>
        </div>
      </div>
      {/* end forms */}
      <div className="px-16" ref={ref}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <img
              src={
                "https://res.cloudinary.com/dfethvtz3/image/upload/v1716370004/autoCargo/Screenshot_2024-05-22_132613_t4op7t.png"
              }
              alt="Logo"
              className="h-28"
            />
          </div>
          <div className="text-right">
            <p className="text-md font-bold">
              DATE: {formattedDate && formattedDate}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-md font-bold accent-color">{supplier}</p>
          <p className="font-semibold">{ad1}</p>
          <p className="font-semibold">{ad2}</p>
          <p className="font-semibold">{ad3}</p>
          <p className="font-semibold">{ad4}</p>
        </div>
        <div className="mb-2 text-center">
          <p className="text-md font-bold accent-color underline">
            COMMERCIAL INVOICE No. {comInvoice}
          </p>
          <p className="text-md">{company}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border-collapse border border-gray-400">
            <thead className="header-bg">
              <tr className="bg-[#fce8d9]">
                {h1 && (
                  <th className="border border-gray-300 text-sm px-1 py-1 underline underline-offset-2">
                    {h1}
                  </th>
                )}
                {h2 && (
                  <th className="border border-gray-300 text-sm px-1 py-1 underline underline-offset-2">
                    {h2}
                  </th>
                )}
                {h3 && (
                  <th className="border border-gray-300 text-sm px-1 py-1 underline underline-offset-2">
                    {h3}
                  </th>
                )}
                {h4 && (
                  <th className="border border-gray-300 text-sm px-1 py-1 underline underline-offset-2">
                    {h4}
                  </th>
                )}
                {h5 && (
                  <th className="border border-gray-300 text-sm px-1 py-1 underline underline-offset-2">
                    {h5}
                  </th>
                )}
                {h6 && (
                  <th className="border border-gray-300 text-sm px-1 py-1 underline underline-offset-2">
                    {h6}
                  </th>
                )}
                {h7 && (
                  <th className="border border-gray-300 text-sm px-1 py-1 underline underline-offset-2">
                    {h7}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((x) => {
                  return (
                    <tr>
                      {x?.v1 &&
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                      {x.v1}
                    </td>
                     }
                      {x?.v2 &&
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                      {x.v2}
                    </td>
                     }
                      {x?.v3 &&
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                      {x.v3}
                    </td>
                     }
                      {x?.v4 &&
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                      {x.v4}
                    </td>
                     }
                      {x?.v5 &&
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                      {x.v5}
                    </td>
                     }
                      {x?.v6 &&
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                      {x.v6}
                    </td>
                     }
                      {x?.v7 &&
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                      {x.v7}
                    </td>
                     }
{/*                       
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                        {x.v2}
                      </td>
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                        {x.v3}
                      </td>
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                        {x.v4}
                      </td>
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                        {x.v5}
                      </td>
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                        {x.v6}
                      </td>
                      <td className="border border-gray-300 text-sm px-1 py-1 text-center">
                        {x.v7}
                      </td> */}
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr className="header-bg">
                <td className="border bg-[#fce8d9] border-gray-300 px-2 py-1 font-bold text-left">
                  TOTAL
                </td>
                <td
                  colSpan={span}
                  className="border border-gray-300 px-2 py-1 font-bold text-left"
                ></td>
                <td className="border border-gray-300 px-2 py-1 font-bold text-center">
                  ${total}
                </td>
              </tr>
              <tr className="header-bg">
                <td
                  colSpan="7"
                  className="border-4 border-gray-300 px-2 py-1 font-bold text-center"
                >
                  {port}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-2">
          <p className=" text-sm">
            <strong className="mr-[100px]">PAYMENT TERMS:</strong> {pt1}
          </p>
          <p className=" text-sm ml-[223px]"> </p>
          <p className=" text-sm ml-[223px]"> {pt2}</p>
          <p className=" text-sm ml-[223px]"> {pt3}</p>
          <p className=" text-sm ml-[223px]"> {pt4}</p>
          <p className=" text-sm ml-[223px]"> {pt5}</p>
          <p className=" text-sm ml-[223px]"> {pt6}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm">
            <strong className="mr-32">PAYMENT TO</strong> : TOBLEAF TRADING DMCC
          </p>

          <p>
            <strong className="text-sm mr-[131px]">BANK NAME</strong> : EMIRATES
            NBD
          </p>
          <p>
            <strong className="text-sm mr-[158px]">BRANCH</strong> : EMIRATES
            HEADQUARTERS BLDG
          </p>
          <p>
            <strong className="text-sm mr-[154px]">ADDRESS</strong> : BANIYAS
            ROAD, DEIRA, P.O. BOX 777, DUBAI - U.A.E
          </p>
          <p>
            <strong className="text-sm mr-[123px]">ACCOUNT NR.</strong> : 102
            467 823 8004
          </p>
          <p>
            <strong className="text-sm mr-[188px]">IBAN</strong>: AE 85026 000
            1024678238004
          </p>
          <p>
            <strong className="text-sm mr-[176px]">SWIFT</strong> : EBILAEAD
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm font-bold">
            ACID: <strong className="ml-[295px]">{acid}</strong>
          </p>
          <p className="text-sm">
            Egyptian Importer Tax ID:{" "}
            <strong className="ml-[178px]">473022745</strong>
          </p>
          <p className="text-sm">
            Foreign Exporter Registration Type:{" "}
            <strong className="ml-[117px]">VAT NUMBER</strong>
          </p>
          <p className="text-sm">
            Foreign Exporter ID:{" "}
            <strong className="ml-[210px]">10038300900003</strong>
          </p>
          <p className="text-sm">
            Foreign Exporter Country:{" "}
            <strong className="ml-[176px]">United Arab Emirates</strong>
          </p>
          <p className="text-sm">
            Foreign Exporter Country Code:{" "}
            <strong className="ml-[140px]">AE</strong>
          </p>
        </div>
        <div className="my-6">
          <span className="flex">
            {signature == 'ranju' ? 
            <img
            src={signPic}
            alt="Signature"
            className="h-16 mt-12 ml-10"
          />
        :
        <img
              src={signPic}
              alt="Signature"
              className="h-16 mt-10 ml-3"
            />
            }
            <img
              src={
                "https://res.cloudinary.com/dfethvtz3/image/upload/v1716369857/autoCargo/Screenshot_2024-05-22_132348_c0s6lj.png"
              }
              alt="SEAL"
              className="w-32 ml-44"
            />
          </span>
          {/* <p>Authorized Signature</p> */}
        </div>
        <div className="mt-4 flex justify-center items-center">
          <div>
            <p>
              <strong>TOBLEAF TRADING DMCC</strong>
            </p>
            <hr className="border border-blue-500" />
            <p className="text-center text-sm">
              Off. 2504, HDS Business Center, Cluster M, JLT, P.O. Box 128744,
              Dubai - United Arab Emirates
            </p>
            <p className="text-center text-sm">
              Email: info@tobleafdxb.ae | Tel: +971 4 422 7206 | Fax: +971 4 422
              6598
            </p>
          </div>
          {/* <div className="text-center">
            <img src={'https://res.cloudinary.com/dfethvtz3/image/upload/v1716369804/temp/image_ywat4p.png'} alt="Signature" className="h-12 mx-auto" />
            <p>Authorized Signature</p>
          </div> */}
        </div>
      </div>

      <ReactPrint
        trigger={() => (
          <button
            className="my-3 px-5 py-1 border rounded-md bg-green-500 hover:bg-green-600 cursor-pointer text-white"
            id="btn"
          >
            Download PDF
          </button>
        )}
        content={() => ref.current}
        documentTitle={`FILE`}
      />
      <br />
       <button
            className="my-3 px-5 py-1 border rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
            onClick={saveInvoice}
          >
            SAVE INVOICE
          </button>
    </div>
  );
};

export default Commercial1;
