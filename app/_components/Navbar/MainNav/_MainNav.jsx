import NavCategories from "./nav-categories";
import NavZodiacs from "./nav-zodiacs";

export default function MainNav({ 
  categories, 
  zodiacs
}) {
  return (
  <div className=" flex flex-col gap-4 md:flex-row ">
   <NavCategories 
   data={categories}
   />
   <NavZodiacs 
   data={zodiacs}
   />
   </div>
  )
}