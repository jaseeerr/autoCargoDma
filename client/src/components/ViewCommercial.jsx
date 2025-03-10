import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../urls/urls';
import toast from "react-hot-toast"
import MyAxiosInstance from '../utils/axios';
function ViewCommercial() {
    const axiosInstance = MyAxiosInstance()

      const [data,setData] = useState([
        { createdAt: '2023-06-01', consignee1: 'John Doe', total: '1000', product: 'Product A' },
        { createdAt: '2023-06-02', consignee1: 'Jane Smith', total: '2000', product: 'Product B' },
        { createdAt: '2023-06-03', consignee1: 'Michael Johnson', total: '1500', product: 'Product C' },
      ])


      const getData = async()=>{
        const res = await axiosInstance.get(`${SERVER_URL}/getCommercial`)
        if(res.data.success)
            {
                toast.success("Data Fetched")

                setData(res.data.data.reverse())
                setTimeout(()=>{
                     toast.dismiss()
                },600)
            }
      }


      useEffect(()=>{
           getData()
      },[])
  return (
    <>
     <div className="container mx-auto py-8">
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {/* <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Date</th> */}
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Type</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Acid</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Invoice</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Total Amount</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Product</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left">Action</th>

            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {/* <td className="px-4 py-2 border-b border-gray-300">{item.createdAt.substring(0,10)}</td> */}
                <td className="px-4 py-2 border-b border-gray-300">{item.type?.substring(11)}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.acid}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.invoiceDate2}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.total}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.product}</td>
                <td className="px-4 py-2 border-b border-gray-300"><a href={`/editCommerical/${item?._id}`} className='bg-blue-500 hover:bg-blue-600 p-1 px-2 text-white text-sm rounded-md'>View</a></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default ViewCommercial