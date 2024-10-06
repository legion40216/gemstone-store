// components/Navbar.js

import getCategories from "@/app/actions/get-categories";
import Link from "next/link";
import MainNav from "./MainNav/_MainNav";
import NavbarActions from "./NavbarActions/_NavbarActions";
import MobileNav from "./mobile-nav";
import getZodiacs from "@/app/actions/get-zodiacs";

export default async function Navbar() {
  const categories = await getCategories()
  const zodiacs = await getZodiacs()
  
  return (
    <nav className="container flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="flex gap-4 items-center">
          <Link href="/" className="flex font-bold text-2xl">
            case<span className="text-green-600">cobra</span>
          </Link>
        </div>
        <div className="hidden md:block"> 
          <MainNav 
          categories={categories}
          zodiacs={zodiacs}
          />
        </div>
 

      </div>

      <div className="flex items-center gap-2">
      <div>
        <MobileNav 
        categories={categories}
        zodiacs={zodiacs}
        /> 
        </div>
        <NavbarActions />
      </div>
    </nav>
  );
}
