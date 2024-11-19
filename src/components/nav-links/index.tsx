'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  LayoutDashboard,
  LocateFixed,
  PackageSearch,
  PieChart,
  ShoppingBasket,
  Shuffle,
  UserCircle
} from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { cn } from '@/lib/utils'

export const NavLinks = () => {
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
    }
  ]

  return (
    <nav className="flex flex-col space-y-2 mt-10">
      {routes.map((route) =>
        route.children ? (
          <Accordion type="single" collapsible key={route.href}>
            <AccordionItem value={route.href}>
              <AccordionTrigger
                className={cn(
                  `
                  font-medium
                  text-sm
                  flex
                  items-center
                  gap-2
                  p-3
                  rounded-lg
                  text-gray-400
                  text-muted-foreground
                  hover:bg-violet-500
                  hover:text-white
                  hover:no-underline
                `,
                  pathname === route.href && 'bg-violet-500 text-white'
                )}
              >
                <div className="flex items-start gap-2">
                  <route.icon className="size-5" />
                  {route.name}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <nav className="flex flex-col space-y-2">
                  {route.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        `
                          font-medium
                          text-sm
                          flex
                          items-center
                          gap-2
                          p-3
                          rounded-lg
                          text-gray-400
                          text-muted-foreground
                          hover:bg-violet-500
                          hover:text-white
                        `,
                        pathname === child.href && 'bg-violet-500 text-white'
                      )}
                    >
                      <child.icon className="size-5" />
                      {child.name}
                    </Link>
                  ))}
                </nav>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              `
                font-medium
                text-sm
                flex
                items-center
                gap-2
                p-3
                rounded-lg
                text-gray-400
                text-muted-foreground
                hover:bg-violet-500
                hover:text-white
              `,
              pathname === route.href && 'bg-violet-500 text-white'
            )}
          >
            <route.icon className="size-5" />
            {route.name}
          </Link>
        )
      )}
    </nav>
  )
}
