import { Header } from '../header'
import { MainNav } from '../main-nav'

export const Sidebar = () => {
  return (
    <aside className="w-[300px] m-4">
      <div>
        <Header />
        <MainNav />
      </div>
    </aside>
  )
}
