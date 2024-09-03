
import PropTypes from 'prop-types';
import css from '../LoadMoreBtn/LoadMoreBtn.module.css'
export default function LoadMoreBtn({ onClick})
 {
    return (
      <div>
        
          <button className={css.btnMore} onClick={onClick} >
            Load More
          </button>
    
      </div>
    );
  };
  LoadMoreBtn.propTypes = {
    onClick: PropTypes.func,
    isVisible: PropTypes.func,
  };