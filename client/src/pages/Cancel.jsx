import React from 'react'

const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Sorry for incovenience!</h1>
        <p className="text-xl text-gray-600">Your payment was Cancelled. Order not placed.</p>
      </div>
    </div>
  )
}

export default Cancel