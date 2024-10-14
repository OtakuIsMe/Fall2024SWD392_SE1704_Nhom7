import React from 'react'
import './AdminLayout.css'

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout:React.FC<AdminLayoutProps> = ({children}) => {
  return (
    <div id='ad-layout'>
        <div className='sidebar'>

        </div>
        <div className='main-content'>
            {children}
        </div>
    </div>
  )
}

export default AdminLayout