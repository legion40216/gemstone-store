import getCategories from "@/app/actions/get-categories";
import Link from "next/link";
import MainNav from "./main-nav";
import NavbarActions from "./NavbarActions/_NavbarActions";

export default async function Navbar() {
  const categories = await getCategories()

  return (
    <nav className="container flex justify-between items-center "
     >
      <div className="flex items-center gap-4">
        <div className="flex gap-4 items-center">
          <Link href="/" className="flex font-bold text-2xl">
            case<span className="text-green-600">cobra</span>
          </Link>
        </div>
        <div>
          <MainNav 
            data={categories}
          />
        </div>
      </div>
   
      <div className="flex items-center gap-2">
        <NavbarActions />
      </div>
    </nav>
  );
}