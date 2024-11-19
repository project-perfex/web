'use client'

import { usePathname } from 'next/navigation'

import {
  LayoutDashboard,
  LocateFixed,
  PackageSearch,
  PieChart,
  ShoppingBasket,
  Shuffle,
  UserCircle,
  Wallet
} from 'lucide-react'

import { NavItem } from '../nav-item'
import { NavAccordionItem } from '../nav-accordion-item'

export const MainNav = () => {
  const pathname = usePathname()

  const routes = [
    {
      icon: LayoutDashboard,
      href: '/',
      name: 'Dashboard',
      active: pathname === '/'
    },
    {
      icon: PieChart,
      href: '/analytics',
      name: 'Analytics',
      active: pathname === '/analytics'
    },
    {
      icon: UserCircle,
      href: '/customers',
      name: 'Clientes',
      active: pathname === '/customers'
    },
    {
      icon: ShoppingBasket,
      href: '#',
      name: 'E-commerce',
      children: [
        {
          icon: LocateFixed,
          href: '/categories',
          name: 'Categorias',
          active: pathname === '/categories'
        },
        {
          icon: PackageSearch,
          href: '/products',
          name: 'Produtos',
          active: pathname === '/products'
        },
        {
          icon: Shuffle,
          href: '/orders',
          name: 'Pedidos',
          active: pathname === '/orders'
        }
      ]
    },
    {
      icon: Wallet,
      href: '/finance',
      name: 'Financeiro',
      active: pathname === '/finance'
    }
  ]

  return (
    <nav className="flex flex-col space-y-2 mt-10">
      {routes.map((route) =>
        route.children ? (
          <NavAccordionItem key={route.href} route={route} />
        ) : (
          <NavItem key={route.href} route={route} />
        )
      )}
    </nav>
  )
}
