'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import React from 'react'

interface NavItemProps {
  route: {
    icon: React.ElementType
    href: string
    name: string
    active?: boolean
  }
}

export const NavItem = ({ route }: NavItemProps) => {
  const pathname = usePathname()
  return (
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
        pathname === route.href && 'bg-violet-500 text-white',
        route.active && 'bg-violet-500 text-white'
      )}
    >
      <route.icon className="size-5" />
      {route.name}
    </Link>
  )
}
