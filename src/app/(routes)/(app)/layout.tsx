'use client'

import { Header } from '@/components/header'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { Sidebar } from '@/components/sidebar'
import useAuthToken from '@/hooks/useAuthToken'

interface RoutesLayoutProps {
  children: React.ReactNode
}

const RoutesLayout = ({ children }: RoutesLayoutProps) => {
  useAuthToken()

  return (
    <div className="flex h-full">
      <div className="max-md:hidden flex">
        <Sidebar />
      </div>
      <div className="hidden max-md:flex items-start m-2">
        <MobileSidebar />
      </div>
      <main className="flex-1 bg-gray-100">
        <div>
          <Header />
        </div>
        {children}
      </main>
    </div>
  )
}

export default RoutesLayout
