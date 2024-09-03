import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard';
import css from '../ImageGallery/ImageGallery.module.css';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.imageGallery}>
      {images && images.map((image) => (
        <li key={image.id} className={css.imageGalleryItem}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  onImageClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urls: PropTypes.shape({
        small: PropTypes.string.isRequired,
        full: PropTypes.string.isRequired,
      }).isRequired,
      alt_description: PropTypes.string,
      author: PropTypes.string,
      likes: PropTypes.number,
    })
  ).isRequired,
};