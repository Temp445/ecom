'use client'

import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // --- Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  // --- Address form data
  const [addressData, setAddressData] = useState({
    Name: '',
    MobileNumber: '',
    PinCode: '',
    Address: '',
    City: '',
    LandMark: '',
    State: '',
    Country: '',
    AltPhoneNumber: ''
  })

  // --- Order summary (mock)
  const [orderSummary] = useState({
    items: [{ name: 'Industrial Product A', price: 2500 }],
    total: 2500
  })

  // --- Submit login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Replace with your real login API
      const res = await axios.post('/api/auth/login', loginData)
      toast.success('Login successful!')
      setStep(2)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // --- Submit address
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/api/address', addressData)
      toast.success('Address saved!')
      setStep(3)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save address')
    } finally {
      setLoading(false)
    }
  }

  // --- Place order
  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!')
  }

  // --- Render Step UI
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      {/* Step indicator */}
      <div className="flex justify-between mb-6">
        {['Login', 'Address', 'Order Summary'].map((label, index) => (
          <div
            key={label}
            className={`flex-1 text-center text-sm ${
              step === index + 1 ? 'font-bold text-blue-600' : 'text-gray-400'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step 1: Login */}
      {step === 1 && (
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded p-2"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded p-2"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Logging in...' : 'Next'}
          </button>
        </form>
      )}

      {/* Step 2: Address */}
      {step === 2 && (
        <form onSubmit={handleAddressSubmit} className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800">Delivery Address</h2>

          {Object.keys(addressData).map((key) => (
            <input
              key={key}
              type="text"
              placeholder={key}
              className="w-full border rounded p-2"
              value={(addressData as any)[key]}
              onChange={(e) =>
                setAddressData({ ...addressData, [key]: e.target.value })
              }
              required={['Name', 'MobileNumber', 'PinCode', 'Address', 'City'].includes(
                key
              )}
            />
          ))}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? 'Saving...' : 'Next'}
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Order Summary */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Order Summary</h2>
          <div className="border rounded p-3">
            {orderSummary.items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{orderSummary.total}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
