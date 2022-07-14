const ImageGalleryItem = ({ object, imageClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={object.webformatURL}
        alt={object.tags}
        className="ImageGalleryItem-image"
        onClick={() => {
          imageClick(object);
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;
