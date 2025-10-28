import React from 'react'
import ProductedRoute from '@/Components/Common/ProductedRoute';

const Admin = ({  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
        <ProductedRoute>
        {children}
        </ProductedRoute>
    </div>
  )
}

export default Admin