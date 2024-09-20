import React from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useCart from '@/hooks/useCartStore'
import Currency from '@/components/custom-ui/ProductCard/currency'
import { Badge } from '@/components/ui/badge'

export default function CheckoutItem({ item }) {
  const cart = useCart();

  const handleRemove = () => {
    cart.removeItem(item.id)
  }

  const handleIncrease = () => {
    cart.addItem(item, item.count + 1)
  }

  const handleDecrease = () => {
    if (item.count > 1) {
      cart.addItem(item, item.count - 1)
    }
  }

  return (
    <li className="flex py-6 border-b">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={item.images[0].url}
          alt={item.name}
          width={96}
          height={96}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <div className="flex flex-col items-end space-y-1">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Currency value={item.price} />
                <span>×</span>
                <span>{item.count}</span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                <Currency value={item.price * item.count} />
              </Badge>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.color.name}</p>
          <p className="mt-1 text-sm text-gray-500">{item.size.name}</p>
        </div>
        <div className="flex items-center justify-between text-sm mt-4">
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="outline" onClick={handleDecrease}>
              <Minus className="h-4 w-4" />
            </Button>
            <span>{item.count}</span>
            <Button size="icon" variant="outline" onClick={handleIncrease}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" onClick={handleRemove} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </li>
  )
}
