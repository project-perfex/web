import { Logo } from '../logo'
import { MainNav } from '../main-nav'

export const Sidebar = () => {
  return (
    <aside className="w-[300px] m-4">
      <div>
        <Logo />
        <MainNav />
      </div>
    </aside>
  )
}
