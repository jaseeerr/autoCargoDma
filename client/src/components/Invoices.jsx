import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../urls/urls'
import toast from 'react-hot-toast'

function Invoices() {

    const [data,setData] = useState([])

    const [ci,setCi] = useState('')
    const [acid,setAcid] = useState('')
    const [from,setFrom] = useState('')
    const [to,setTo] = useState('')


    
    const convertDateFormat = (isoDateString) => {
        const months = [
          "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
          "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];
      
        // Create a Date object from the ISO date string
        const dateObj = new Date(isoDateString);
      
        // Extract the day, month, and year from the Date object
        const day = dateObj.getDate();
        const month = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();
      
        // Format the date string in the desired format
        return `${day}/${month}/${year}`;
      };
    
    const getData = async()=>{
        const res = await axios.get(`${SERVER_URL}/getInvoices`)
        if(res.data.success)
            {
                setTimeout(()=>{
                     toast.dismiss()
                },600)
                toast.success("Invoice Fetched")
                let data = res.data.data
                for(let i=0;i<data.length;i++)
                    {
                        const newDate = convertDateFormat(data[i].date)
                        data[i].date = newDate
                    }
                setData(res.data.data)
                console.log(res.data)
            }
            else
            {
                toast.error("Error")
            }
    }

    const searchCi = async()=>{
        const res = await axios.post(`${SERVER_URL}/searchCi`,{keyword:ci})
        if(res.data.success && res.data.data.length > 0)
            {
                toast.success("Invoice Fetched")
                let data = res.data.data
                for(let i=0;i<data.length;i++)
                    {
                        const newDate = convertDateFormat(data[i].date)
                        data[i].date = newDate
                    }
                setData(res.data.data)
                console.log(res.data)
            }
            else if(res.data.data.length <=0)
                {
                    toast.error("No Matches Found")
                }
            else
            {
                toast.error("Error")
            }
    }

    const searchAcid = async()=>{
        const res = await axios.post(`${SERVER_URL}/searchAcid`,{keyword:acid})
        if(res.data.success && res.data.data.length > 0)
            {
                toast.success("Invoice Fetched")
                let data = res.data.data
                for(let i=0;i<data.length;i++)
                    {
                        const newDate = convertDateFormat(data[i].date)
                        data[i].date = newDate
                    }
                setData(res.data.data)
                console.log(res.data)
            }
            else if(res.data.data.length <=0)
                {
                    toast.error("No Matches Found")
                }
            else
            {
                toast.error("Error")
            }
    }

    const searchDate = async()=>{
        const res = await axios.post(`${SERVER_URL}/searchDate`,{from,to})
        if(res.data.success && res.data.data.length > 0)
            {
                toast.success("Invoice Fetched")
                let data = res.data.data
                for(let i=0;i<data.length;i++)
                    {
                        const newDate = convertDateFormat(data[i].date)
                        data[i].date = newDate
                    }
                setData(res.data.data)
                console.log(res.data)
            }
            else if(res.data.data.length <=0)
                {
                    toast.error("No Matches Found")
                }
            else
            {
                toast.error("Error")
            }
    }

    useEffect(()=>{
       getData()
    },[])
  return (
    <div className="overflow-x-auto p-10">
         <div className="flex justify-around items-center w-full mb-5">
            {/* search 1 */}
     <div className='flex'>
     <input
        type="text"
        onChange={(e)=>setCi(e.target.value.trim())}
        placeholder="Search Commercial"
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-3 py-2 w-full border border-gray-300"
      />
      <button onClick={searchCi} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
        Search
      </button>
     </div>
          {/* search 1 ends */}

             {/* search 2 */}
     <div className='flex'>
     <input
        type="text"
        onChange={(e)=>setAcid(e.target.value.trim())}
        placeholder="Search Acid"
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-3 py-2 w-full border border-gray-300"
      />
      <button onClick={searchAcid} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
        Search
      </button>
     </div>
          {/* search 2 ends */}

             {/* search 3 */}
     <div className=''>
     <span className='flex'>
     <span>
        <p>From: </p>
     <input
        type="date"
        onChange={(e)=>setFrom(e.target.value)}
        placeholder="Search Acid"
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-3 py-2 w-full border border-gray-300"
      />
     </span>
     <span>
        <p className='ml-5'>To: </p>
     <input
        type="date"
        onChange={(e)=>setTo(e.target.value)}
        placeholder="Search Acid"
        className="ml-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-3 py-2 w-full border border-gray-300"
      />
     </span>
     </span>
      <span className='flex justify-center mt-3'>
      <button onClick={searchDate} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
        Search
      </button>
      </span>
     </div>
          {/* search 3 ends */}





    </div>
    <table className="min-w-full divide-y border divide-gray-200">
        
        <thead className="bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acid Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commercial Invoice
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.acid}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.commercialInvoice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href={`/invoice/${item._id}`} className='bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white'>View Invoice</a>
                    </td>

                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default Invoices