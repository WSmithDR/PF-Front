import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../redux/actions'; 

const Reviews = ({ productId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getReviews(productId));
  }, [dispatch, productId]);


  
  return (
    <div>
      <h2>Comentarios</h2>
      {reviews.length === 0 ? (
        <p>No hay comentarios acerca de este producto.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id}>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;