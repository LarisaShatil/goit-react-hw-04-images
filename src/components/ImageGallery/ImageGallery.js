import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ arrayImages, imageClick }) => {
  return (
    <ul>
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