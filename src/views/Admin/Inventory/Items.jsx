import Item from "./Item"

const Items = ({products}) => {
    return(
        <tbody>
            {products?.map((product, index) => <Item key={index} product={product}/>)
            }
        </tbody>
    )
}

export default Items