import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions";
import Buttons from "./Buttons";

const Pagination = ({info}) => {
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.currentPage)
    const itemsPerPage = 12;
    const totalPages = Math.ceil(info?.total / itemsPerPage);
    console.log(totalPages)

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          dispatch(setCurrentPage(newPage))
        }
      };
      
    return(
        <div className="max-w-2xl m-10 mx-auto">
              <nav aria-label="Page navigation example">
                <ul className="flex justify-center -space-x-px">
                 <Buttons 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    handlePageChange={handlePageChange} 
                 />
                </ul>
              </nav>
            </div>
    )
}

export default Pagination