
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReview } from '../redux/actions'; 

const Reviews = ({ productId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
  
    dispatch(getProductReview(productId));
  }, [dispatch, productId]);

  return (
    <div>
      <h2>Comentarios</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.comment}</p>
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;