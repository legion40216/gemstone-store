"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function MainNav({
  data
}) {
  const pathName = usePathname()

  const routes = data.map((route)=>({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathName === `/category/${route.id}` 
  }))

  return (
    <div className="flex gap-3">
      {routes.map((route, index)=>(
        <Link
        key={index}
        href={route.href}
        className={cn(
          " text-sm font-semibold transition-colors hover:text-black ",
          route.active ? " text-black" : "text-gray-500"
        )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  )
}
