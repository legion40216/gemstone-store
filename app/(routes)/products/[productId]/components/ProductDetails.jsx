// "use client"
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button'
// import useCart from '@/hooks/useCartStore';
// import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react'
// import React, { useState } from 'react'
// import { toast } from 'sonner';

// export default function ProductDetails({ product }) {
//   const { addItem } = useCart();
//   const [quantity, setQuantity] = useState(1);

// const handleAddToCart = () => {
//   addItem({ ...product, productStock:product.quantity }, quantity);
//   setQuantity(1)
// };

//   const incrementQuantity = () => {
//     if (quantity >= product.quantity) {
//       toast.error('Quantity exceeds available stock.');
//       return;
//     } else {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };


//   return (
//     <div className="space-y-10">
//       {/* Product Name and Price */}
//       <div className="space-y-3">
//         <h1 className="text-2xl font-bold">{product.name}</h1>
//         <p className="text-2xl font-semibold mt-2">${product.price}</p>
//       </div>

//       {/* Color and Size */}
//       <div className="space-y-5">
//         <div className="flex gap-4 items-center">
//           <h3 className="text-sm font-medium">Color</h3>
//           <div className="h-6 w-6 rounded-full" style={{ backgroundColor: product.color.value }}></div>
//         </div>

//         <div className="flex gap-4 items-center">
//           <h3 className="text-sm font-medium">Size</h3>
//           <Badge className="text-base" variant="secondary">{product.size.value}</Badge>
//         </div>

//         {/* Stock Information */}
//         <div className="flex gap-4 items-center">
//           <h3 className="text-sm font-medium">Stock</h3>
//           <Badge variant="secondary" className={"text-sm"}>
//           {`${product.quantity} Available`}
//           </Badge>
//         </div>

//         {/* Low Stock Alert
//         {product.quantity > 0 && product.quantity <= 5 && (
//           <p className="text-red-600">Hurry! Only {product.quantity} left in stock!</p>
//         )}
//         {product.quantity === 0 &&
//         <p className="text-red-500">This product is out of stock.</p>
//         } */}
//       </div>

//       {/* Quantity Selection and Wishlist */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center border rounded-md">
//           <Button variant="ghost" size="sm" onClick={decrementQuantity}>
//             <Minus className="w-4 h-4" />
//           </Button>
//           <span className="px-3">{quantity}</span>
//           <Button variant="ghost" size="sm" onClick={incrementQuantity}>
//             <Plus className="w-4 h-4" />
//           </Button>
//         </div>
//         <Button className="p-2 py-5 rounded-full" variant="outline">
//           <Heart className="w-6 h-6" />
//         </Button>
//       </div>

//       {/* Add to Cart Button */}
//       <div className="flex w-full">
//         <Button
//           className="flex-1 py-3 px-4 rounded-full flex items-center justify-center"
//           onClick={handleAddToCart}
//           disabled={product.quantity === 0}
//            >
//           <ShoppingCart className="w-5 h-5 mr-2" />
//           Add to Cart
//         </Button>
//       </div>

//       {/* Notify Me When Out of Stock */}
//       {product.quantity === 0 && (
//         <div className="mt-2">
//           <p className="text-red-500">This product is out of stock.</p>
//           <Button className="w-full mt-2" variant="outline" disabled>
//             Notify Me When Available
//           </Button>
//         </div>
//       )}

//       {/* Product Description */}
//       <div className="space-y-1">
//         <h3 className="text-sm font-medium">Description</h3>
//         <p className="text-sm text-muted-foreground">
//           This beautiful {product.category.name.toLowerCase()} is a perfect addition to your collection.
//           Its {product.color.name.toLowerCase()} color and {product.size.name.toLowerCase()} size make it
//           a versatile piece for any occasion.
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import useCart from '@/hooks/useCartStore';
import { toast } from 'sonner';

export default function ProductDetails({ product }) {
  const { items, addItem, getItemCount } = useCart();
  const [count, setCount] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(0);

  useEffect(() => {
    const itemCount = getItemCount(product.id);
    setAvailableQuantity(product.quantity - itemCount);
    setCount(itemCount > 0 ? itemCount : 1);
  }, [product, items, getItemCount]);


  const handleAddToCart = () => {
    if (availableQuantity !== 0) {
      addItem(product, count);
    } else {
      toast.error(`Only ${product.quantity} items available.`);
    }
  };

  const incrementCount = () => {
    if (count < product.quantity) {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="space-y-10">
      {/* Product Name and Price */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-2xl font-semibold mt-2">${product.price}</p>
      </div>

      {/* Color and Size */}
      <div className="space-y-5">
        <div className="flex gap-4 items-center">
          <h3 className="text-sm font-medium">Color</h3>
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: product.color.value }}
          ></div>
        </div>

        <div className="flex gap-4 items-center">
          <h3 className="text-sm font-medium">Size</h3>
          <Badge className="text-base" variant="secondary">{product.size.value}</Badge>
        </div>
      </div>

      {/* Quantity Selection and Add to Cart */}
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center border rounded-md">
          <Button variant="ghost" size="sm" onClick={decrementCount}>
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-3">{count}</span>
          <Button variant="ghost" size="sm" onClick={incrementCount}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Button className="p-2 py-5 rounded-full" variant="outline">
          <Heart className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex">
        <Button
          className="flex-1 py-3 px-4 rounded-full flex items-center justify-center"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>

      {/* Stock Status */}
      {availableQuantity === 0 ? (
        <p className="text-red-500">This product is out of stock.</p>
      ) : (
        <p className="text-gray-500">{availableQuantity} items available</p>
      )}

      {/* Product Description */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Description</h3>
        <p className="text-sm text-muted-foreground">
          {product.description ||
            `This beautiful ${product.category.name.toLowerCase()} is a perfect addition to your collection.
            Its ${product.color.name.toLowerCase()} color and ${product.size.name.toLowerCase()} size make it
            a versatile piece for any occasion.`}
        </p>
      </div>
    </div>
  );
}