import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      {renderStars({ value: value, text: text, color: color })}
    </div>
  );
};

const renderStars = ({ value, text, color }) => {
  const stars = [...Array(5).keys()].map((index) => {
    const classStar =
      value >= index + 1
        ? ' fas fa-star '
        : value >= index + 0.5
        ? ' fas fa-star-half-alt '
        : ' far fa-star ';
    return (
      <Fragment key={index}>
        <span>
          <i className={classStar} style={{ color: color }}></i>
        </span>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <div>{stars}</div>
      <div className='pt-3'>
        <span>{text && text}</span>
      </div>
    </Fragment>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

// Rating.propTypes = {
//   value: PropTypes.number.isRequired,
//   text: PropTypes.string.isRequired,
//   color: PropTypes.string,
// };

export default Rating;
