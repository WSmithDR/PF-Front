import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, createReview, putReview, deleteReview } from '../../redux/actions'; 
import { jwtDecode } from 'jwt-decode';

const Reviews = ({ productId }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('Token is missing or invalid');
    return null;
  }

  const decodedToken = jwtDecode(token);
  const userId = decodedToken?.id || 'defaultUserId';
  
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const userData = useSelector((state) => state.userData);

  const quantityReviews = reviews.length;

  useEffect(() => {
    dispatch(getReviews(productId));
  }, [dispatch, productId]);

  const [activeDropdownIds, setActiveDropdownIds] = useState({});
  const [editedReviewId, setEditedReviewId] = useState(null);

  const handleClickDropdown = (e) => {
    const reviewId = e.target.dataset.id;
    setActiveDropdownIds((prevActiveDropdownIds) => {
      return {
        ...prevActiveDropdownIds,
        [reviewId]: !prevActiveDropdownIds[reviewId],
      };
    });
  };

  const [review, setReview] = useState({
    comment: '',
    userId: userId,
    productId: productId,
  });
  
  const [reviewEdit, setReviewEdit] = useState({
    comment: '',
    userId: userId,
    productId: productId,
    reviewId: editedReviewId,
  });

  const handleChange = (e) => {
    if (editedReviewId) {
      setReviewEdit({
        ...reviewEdit,
        [e.target.name]: e.target.value,
      });
    } else {
      setReview({
        ...review,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (editedReviewId) {
      const updatedReview = {
        ...reviewEdit,
        reviewId: editedReviewId,
      };
      
      dispatch(putReview(updatedReview));
      dispatch(getReviews(productId));

      setEditedReviewId(null);
      setReviewEdit({
        comment: '',
        userId: userId,
        productId: productId,
        reviewId: null,
      });
      
    } else {
      dispatch(createReview(review));
      setReview({
        comment: '',
        userId: userId,
        productId: productId,
      });
    };
  };

  const handleEditClick = (reviewId) => {
    setActiveDropdownIds({});
    setEditedReviewId(reviewId);
  }

  const handleDeleteClick = (reviewId, userId) => {
    dispatch(deleteReview(reviewId, userId));
  };


  return (
    <section className="bg-white h-full dark:bg-gray-900 py-8 mt-10 lg:py-16 antialiased">
      <div className="max-w-7xl mx-auto">        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comentarios {quantityReviews} </h2>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" className="sr-only">Tu comentario</label>
            <textarea 
              id="comment" 
              rows="6"
              maxLength={200}
              minLength={10}
              name="comment"
              value={review.comment}
              onChange={handleChange}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Escribe tu comentario..." 
              disabled={editedReviewId}
              required></textarea>
          </div>
          <button 
            type="submit"
            className="inline-flex items-center py-2.5 px-4  font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-gray-900 hover:bg-gray-800"
          >
            Publicar comentario
          </button>
        </form>

        <div className="grid grid-cols-2 gap-4">          
          {reviews.length > 0 && reviews.map((review) => (
          <article
            data-id={review._id}
            data-is-edited={editedReviewId === review._id}
            key={review._id}
            className={`p-4 mt-2 text-base bg-black rounded-lg dark:bg-gray-950 ${
              editedReviewId === review._id ? 'h-72 m-0 p-0' : 'h-48 '
            }`}
          >      
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={userId === review.userId ? userData.img : review.userId.img}
                    alt={userId === review.userId ? userData.name : review.userId.name}
                  />
                  {userId === review.userId ? userData.name : review.userId.name}                
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time 
                    pubdate 
                    datetime="2022-02-08"
                    title="February 8th, 2022"
                  >
                    {review.createdAt.split('T')[0]}
                  </time>
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                { userId === review.userId._id &&
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <button
                    onClick={handleClickDropdown} data-id={review._id}
                    id={`dropdownComment${review._id}Button`}
                    className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600 relative z-10"
                    type="button"
                  >
                    <svg
                      className="w-4 h-4 pointer-events-none" 
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                  </button>

                  <div
                    id={`dropdownComment${review._id}`}
                    className={`${
                      activeDropdownIds[review._id] ? 'block' : 'hidden'
                    } z-20 absolute mt-2 top-full left-2/4 transform -translate-x-1/2 w-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 text-center flex items-center justify-center`}
                  >
                    <ul 
                      className="text-sm w-screen text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton"
                    >
                      <li 
                        onClick={() => handleEditClick(review._id)} 
                        className="block py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                        Editar
                      </li>
                      
                      <li 
                        onClick={() => handleDeleteClick(review._id, userId)}
                        className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                        Eliminar
                      </li>
                    </ul>
                  </div>
                </div>
                }

              </div>
            </footer>

            { editedReviewId === review._id ? (
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label for="comment" className="sr-only">Tu comentario</label>
                  <textarea 
                    id="comment" 
                    rows="3"
                    name="comment"
                    maxLength={200}
                    value={reviewEdit.comment}
                    onChange={handleChange}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder={review.comment} 
                    required></textarea>
                </div>
                <button 
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 mt-3 font-medium text-center text-white bg-gray-600 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-500"
                >
                  Guardar cambios
                </button>
                <button 
                  type="button"
                  onClick={() => setEditedReviewId(null)}
                  className="inline-flex items-center py-2.5 px-4 ml-4 font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-900"
                >
                  Cancelar
                </button>
              </form>
            ) : (
              <p className="text-gray-500 pt-2 dark:text-gray-400">
                {review.comment}
              </p>
            )}
          </article>
          ))}
          
          { reviews.length === 0 && (
            <div className="flex justify-left items-center">
              <p className="text-indigo-100 text-center">No hay comentarios</p>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};

export default Reviews;