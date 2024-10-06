// components/MobileNav.js
"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MainNav from "./MainNav/_MainNav";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";


const MobileNav = ({
    categories,
    zodiacs
}) => {

  return (
    <Sheet>
      <SheetTrigger className="md:hidden"> {/* Show trigger only on mobile */}
        <Button variant="outline" size="icon" className="relative">
        <HamburgerMenuIcon className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col p-4">
          <MainNav 
          categories={categories} 
          zodiacs={zodiacs} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
