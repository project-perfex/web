import { Header } from '../header'
import { NavLinks } from '../nav-links'

export const Sidebar = () => {
  return (
    <aside className="w-[300px] m-4">
      <div>
        <Header />
        <NavLinks />
      </div>
    </aside>
  )
}
