import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Menu, X, ChevronDown, LogOut, FileText, Receipt, DollarSign } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("userToken")
    location.href = "/login"
  }

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      location.href = "/login"
    }
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false)
      setIsDropdownOpen(false)
    }

    if (isOpen || isDropdownOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen, isDropdownOpen])

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dfethvtz3/image/upload/v1717482312/autoCargo/autoCargoLogo_r7ijup.png"
                  className="h-10 w-10 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                  alt="AutoCargo Logo"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                AutoCargo
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/proforma"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              <FileText size={18} />
              <span>Proforma</span>
            </Link>

            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              <DollarSign size={18} />
              <span>Commercial</span>
            </Link>

            {/* Invoices Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                // onClick={handleDropdownToggle}
                onMouseEnter={handleDropdownToggle}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <Receipt size={18} />
                <span>Invoices</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div
                onMouseLeave={handleDropdownToggle}
                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <Link
                    to="/viewCommercial"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    <DollarSign size={16} />
                    <span>Commercial Invoices</span>
                  </Link>
                  <Link
                    to="/viewProforma"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    <FileText size={16} />
                    <span>Proforma Invoices</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Logout Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleToggle()
              }}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-4" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              <Link
                to="/proforma"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                <FileText size={20} />
                <span>Proforma</span>
              </Link>

              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                <DollarSign size={20} />
                <span>Commercial</span>
              </Link>

              {/* Mobile Invoices Section */}
              <div className="px-4 py-2">
                <div className="flex items-center space-x-3 py-2 text-gray-500 font-medium text-sm">
                  <Receipt size={18} />
                  <span>Invoices</span>
                </div>
                <div className="ml-6 space-y-1">
                  <Link
                    to="/viewCommercial"
                    className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Commercial Invoices
                  </Link>
                  <Link
                    to="/viewProforma"
                    className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Proforma Invoices
                  </Link>
                </div>
              </div>

              {/* Mobile Logout */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </nav>
  )
}

export default Navbar
