import { urlFor } from '../../sanity';

const Review = ({ review }) => {
  return (
    <div className="review-box">
      <h1>{review.rating}</h1>
      <h2>{review.traveler?.name}</h2>
      {review.traveler?.image && (
        <img
          src={urlFor(review.traveler.image)
            .url()
            //@ts-ignore
            .width(50)
            .height(50)
            .crop('focalpoint')
            .auto('format')}
        />
      )}
    </div>
  );
};

export default Review;
