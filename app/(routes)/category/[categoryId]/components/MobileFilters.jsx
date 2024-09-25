"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Filter from "./Filter"
import { Plus } from "lucide-react"
import { useState } from "react"

const MobileFilters = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="lg:hidden mb-4 mr-3">
          Filters
          <Plus className="h-4 w-4"/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Filter
          valueKey="sizeId"
          name="Sizes"
          data={sizes}
          setOpen={setOpen}
        />
        <Filter
          valueKey="colorId"
          name="Colors"
          data={colors}
          setOpen={setOpen}
        />
      </SheetContent>
    </Sheet>
  )
}

export default MobileFilters