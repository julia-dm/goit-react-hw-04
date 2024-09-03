import PropTypes from 'prop-types';
import css from '../ErrorMessage/ErrorMessage.module.css'

function ErrorMessage({ message }) {
  return (
    <div className={css.errorMessage}>
      <p>{message}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;