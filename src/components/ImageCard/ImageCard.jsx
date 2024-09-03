import PropTypes from 'prop-types';
import css from '../ImageCard/imageCard.module.css';

export default function ImageCard({ image, onImageClick }) {
  const { urls, alt_description } = image;

  return (
    <div className={css.imageContainer} onClick={() => onImageClick(image)}>
      <img
        src={urls.small}
        alt={alt_description}
        width="360"
        height="239"
        className={css.image}
      />
    </div>
  );
}

ImageCard.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
      full: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
    author: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired, 
};