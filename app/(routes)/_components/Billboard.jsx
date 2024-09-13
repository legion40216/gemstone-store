import React from 'react'

export default function Billboard({
    data,
    backgroundOverlay=false
}) {
  return (
    <div className="snap-x rounded-xl overflow-hidden">
        <div 
            className="rounded-xl relative aspect-square 
            md:aspect-[3/1] overflow-hidden bg-cover"
            style={{ backgroundImage: `url(${data?.imageUrl})` }}
        >
            {/* Background overlay */}
            {/* {backgroundOverlay && (
                <div className="absolute inset-0 opacity-20 z-10"></div>
            )} */}

            <div className="h-full w-full flex flex-col justify-center 
            items-center text-center relative z-20"
            >
                <div className="font-bold text-3xl sm:text-5xl lg:text-6xl 
                sm:max-w-xl max-w-xs "
                >
                    {data.label}
                </div>
            </div>
        </div>
    </div>
  )
}
