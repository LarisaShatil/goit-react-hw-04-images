import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ arrayImages, imageClick }) => {
  return (
    <ul className="ImageGallery">
      {arrayImages.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            object={image}
            imageClick={imageClick}
          />
        )
      })}
    </ul>
  )
};

export default ImageGallery;