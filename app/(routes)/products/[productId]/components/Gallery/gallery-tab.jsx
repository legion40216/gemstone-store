export default function GalleryTab({ 
  image, 
  setMainImage, 
  isActive 
}) {
  return (
    <div 
      className={`cursor-pointer border-2 rounded-md overflow-hidden ${
        isActive ? 'border-black' : 'border-transparent'
      }`}
      onClick={() => setMainImage(image)}
    >
      <img
        src={image.url}
        alt={image.alt || "Product thumbnail"}
        className="w-16 h-16 object-cover"
        loading="lazy"
      />
    </div>
  )
}