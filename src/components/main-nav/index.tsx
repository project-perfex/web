'use client'

import { usePathname } from 'next/navigation'

import {
  Headset,
  LayoutDashboard,
  LocateFixed,
  PackageSearch,
  PieChart,
  ShoppingBasket,
  Shuffle,
  UserCircle,
  Users,
  Wallet
} from 'lucide-react'

import { NavItem } from '../nav-item'
import { NavAccordionItem } from '../nav-accordion-item'
import { useAuth } from '@/hooks/useAuth'
import { UserRole } from '@/modules/users/types/users'

export const MainNav = () => {
  const pathname = usePathname()
  const { userData } = useAuth()

  const routes = [
    {
      icon: LayoutDashboard,
      href: '/dashboard',
      name: 'Dashboard',
      active: pathname === '/dashboard'
    },
    {
      icon: PieChart,
      href: '/analytics',
      name: 'Analytics',
      active: pathname === '/analytics'
    },
    {
      icon: ShoppingBasket,
      href: '/orders',
      name: 'E-commerce',
      active: /^\/orders(\/|$)/.test(pathname),
      children: [
        {
          icon: LocateFixed,
          href: '/categories',
          name: 'Categorias',
          active: /^\/categories(\/|$)/.test(pathname)
        },
        {
          icon: PackageSearch,
          href: '/products',
          name: 'Produtos',
          active: /^\/products(\/|$)/.test(pathname)
        },
        {
          icon: UserCircle,
          href: '/customers',
          name: 'Clientes',
          active: /^\/customers(\/|$)/.test(pathname)
        },
        {
          icon: Headset,
          href: '/opportunities',
          name: 'Oportunidades',
          active: /^\/opportunities(\/|$)/.test(pathname)
        },
        {
          icon: Shuffle,
          href: '/orders',
          name: 'Pedidos',
          active: /^\/orders(\/|$)/.test(pathname)
        }
      ]
    },
    {
      icon: Wallet,
      href: '/finance',
      name: 'Financeiro',
      active: pathname === '/finance'
    },
    {
      icon: Users,
      href: '/users',
      name: 'Usuários',
      active: /^\/users(\/|$)/.test(pathname),
      isAdmin: userData?.role !== UserRole.ADMIN
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
