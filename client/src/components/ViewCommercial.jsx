import { useEffect, useState } from "react"
import { SERVER_URL } from "../../urls/urls"
import toast from "react-hot-toast"
import MyAxiosInstance from "../utils/axios"
import { Search, Eye, FileText, Calendar,Banknote , DollarSign, Package, Loader2, AlertCircle, Filter } from "lucide-react"

function ViewCommercial() {
  const axiosInstance = MyAxiosInstance()
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)

  const getData = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axiosInstance.get(`${SERVER_URL}/getCommercial`)

      if (res.data.success) {
        const reversedData = res.data.data.reverse()
        setData(reversedData)
        setFilteredData(reversedData)
        toast.success("Data Fetched Successfully")
        setTimeout(() => {
          toast.dismiss()
        }, 600)
      }
    } catch (err) {
      setError("Failed to fetch data")
      toast.error("Failed to fetch data")
      console.error("Error fetching data:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue)

    if (!searchValue.trim()) {
      setFilteredData(data)
      return
    }

    const filtered = data.filter(
      (item) =>
        item.acid?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.invoiceDate2?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.product?.toLowerCase().includes(searchValue.toLowerCase()),
    )

    setFilteredData(filtered)
  }

  useEffect(() => {
    getData()
  }, [])

  const formatCurrency = (amount) => {

    
    return amount
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Commercial Invoices</h2>
          <p className="text-gray-500">Please wait while we fetch your data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Data</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={getData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-1">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Commercial Invoices</h1>
          </div>
          <p className="text-gray-600">Manage and view all your commercial invoices</p>
        </div>

        {/* Search and Stats Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by ACID, Invoice, or Product..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{filteredData.length}</div>
                <div className="text-sm text-gray-500">Total Invoices</div>
              </div>
              {/* <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {filteredData.reduce((sum, item) => sum + (Number(item.total) || 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Total Amount</div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No matching invoices found" : "No invoices available"}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? "Try adjusting your search terms" : "Commercial invoices will appear here once created"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4" />
                        <span>Type</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>ACID</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Invoice</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <Banknote className="h-4 w-4" />
                        <span>Total Amount</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4" />
                        <span>Product</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.type?.substring(11) || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.acid || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.invoiceDate2 || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">{formatCurrency(item.total)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={item.product}>
                          {item.product || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`/editCommerical/${item?._id}`}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Info */}
        {filteredData.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredData.length} of {data.length} commercial invoices
            {searchTerm && (
              <span className="ml-2">
                • Filtered by: <span className="font-medium">"{searchTerm}"</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewCommercial
