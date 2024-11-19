'use client'

import { usePathname } from 'next/navigation'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { NavItem } from '../nav-item'

import { cn } from '@/lib/utils'

interface NavAccordionItemProps {
  route: {
    icon: React.ElementType
    href: string
    name: string
    children?: {
      icon: React.ElementType
      href: string
      name: string
    }[]
  }
}

export const NavAccordionItem = ({ route }: NavAccordionItemProps) => {
  const pathname = usePathname()

  return (
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
            {route.children?.map((child) => (
              <NavItem key={child.href} route={child} />
            ))}
          </nav>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
