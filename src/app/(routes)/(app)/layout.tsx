import { MobileSidebar } from '@/components/mobile-sidebar'
import { Sidebar } from '@/components/sidebar'

interface RoutesLayoutProps {
  children: React.ReactNode
}

const RoutesLayout = ({ children }: RoutesLayoutProps) => {
  return (
    <div className="flex h-full">
      <div className="max-md:hidden flex">
        <Sidebar />
      </div>
      <div className="hidden max-md:flex items-start m-2">
        <MobileSidebar />
      </div>
      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  )
}

export default RoutesLayout
