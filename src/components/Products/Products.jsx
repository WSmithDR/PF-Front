import Product from "./Product"


const Products = ({products}) =>{
    return(
        <div className="grid grid-cols-1 m-5 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products?.map((product) => (
                <Product
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  img={product.img}
                  _id={product._id}
                  description={product.description}
                />
              ))}
        </div>
    )
}

export default Products
