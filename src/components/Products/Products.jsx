
import { productsContainer } from "../../constants/styles/products"
import Product from "./Product"


const Products = ({products}) =>{
    return(
        <div className={productsContainer}>
              {products?.map((product) => (
                <Product
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  img={product.img}
                  _id={product._id}
                  description={product.description}
                  sales={product.sales}
                />
              ))}
        </div>
    )
}

export default Products
