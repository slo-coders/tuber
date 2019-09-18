import React from 'react';
import PropTypes from 'prop-types';

export default function DisplayStarRating(props) {
  const { score } = props;

  return (
    <span>
      <i
        id="zero"
        className={
          score >= 0 && score < 25 && (!(score >= 25) && !(score <= 50))
            ? 'far fa-star'
            : ''
        }
      />

      <i
        id="one-half"
        className={score >= 25 && score <= 50 ? 'fas fa-star-half-alt' : ''}
      />

      <i
        id="one-full"
        className={
          (score > 50 && score <= 100) || score > 100
            ? 'fas fa-star'
            : 'far fa-star'
        }
      />

      <i
        id="one-and-half"
        className={score >= 125 && score < 150 ? 'fas fa-star-half-alt' : ''}
      />

      <i
        id="two-full"
        className={
          (score >= 150 && score <= 200) || score > 200
            ? 'fas fa-star'
            : 'far fa-star'
        }
      />

      <i
        id="two-and-half"
        className={score >= 225 && score < 250 ? 'fas fa-star-half-alt' : ''}
      />

      <i
        id="three-whole"
        className={
          (score >= 250 && score <= 300) || score > 300
            ? 'fas fa-star'
            : 'far fa-star'
        }
      />

      <i
        id="three-and-half"
        className={score >= 325 && score < 350 ? 'fas fa-star-half-alt' : ''}
      />

      <i
        id="four-whole"
        className={
          (score >= 350 && score <= 400) || score > 400
            ? 'fas fa-star'
            : 'far fa-star'
        }
      />

      <i
        id="four-and-half"
        className={score >= 425 && score < 450 ? 'fas fa-star-half-alt' : ''}
      />

      {(score >= 25 && score <= 50) ||
      (score >= 125 && score < 150) ||
      (score >= 225 && score < 250) ||
      (score >= 325 && score < 350) ? (
        ''
      ) : (
        <i
          id="five-whole"
          className={
            score >= 450 && score <= 500 ? 'fas fa-star' : 'far fa-star'
          }
        />
      )}
    </span>
  );
}

DisplayStarRating.propTypes = {
  score: PropTypes.string,
};
