"use client"
import React from 'react';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useModalStore from '@/hooks/useModalStore';
import ModalGallery from './modal-gallery';
import useCart from '@/hooks/useCartStore';
import { Heart, ShoppingCart } from 'lucide-react';


export default function SP() {
    const { isOpen, data, closeModal } = useModalStore();
    const { addItem } = useCart();  

    if (!isOpen || !data) {
      return null;
    }

    const handleAddToCart = () => {
      addItem(data); 
      closeModal()
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="flex flex-col w-[80%] sm:w-[60%] sm:min-w-[600px] max-w-none rounded-sm  h-auto max-h-[80vh] sm:max-h-none overflow-hidden">
        <DialogHeader>
          <DialogTitle>{data.name}</DialogTitle>
          <DialogDescription>Product Details</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 p-2 overflow-y-auto sm:overflow-hidden">
          <div className="w-full sm:col-span-2">
            <ModalGallery images={data.images} />
          </div>
          
          <div className="w-full sm:col-span-1 grid gap-6 sm:gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-semibold">Price:</p>
                <p>${data.price}</p>
              </div>
              <div>
                <p className="font-semibold">Category:</p>
                <p>{data.category.name}</p>
              </div>
              <div>
                <p className="font-semibold">Size:</p>
                <p>{data.size.name}</p>
              </div>
              <div>
                <p className="font-semibold">Color:</p>
                <p>{data.color.name}</p>
              </div>
            </div>
            {/* <p className="text-sm mt-2">{data.description}</p> */}
      
              <Button 
              className="w-full flex items-center justify-center"
              onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              
                  {/* <Button 
                  className=" p-3 py-6 rounded-full"
                  variant="outline"
                  >
                <Heart className="w-6 h-6" />
              </Button> */}

          </div>
        </div>
      </DialogContent>
    </Dialog>
    );
}