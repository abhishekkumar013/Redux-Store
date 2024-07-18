import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store/cartSlice'
import { fetchProducts } from '../store/productSlice'
import { STATUSES } from '../store/productSlice'

const Products = () => {
  const dispatch = useDispatch()

  // const [Products, setProducts] = useState([])
  const { data: Products, status } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(fetchProducts())
    // const fetchProducts = async () => {
    //   const response = await fetch('https://fakestoreapi.com/products', {
    //     method: 'GET',
    //   })
    //   const result = await response.json()

    //   if (result.length > 0) {
    //     setProducts(result)
    //   } else {
    //     alert('server error')
    //   }
    // }
    // fetchProducts()
  }, [])

  const handleAdd = (product) => {
    dispatch(add(product))
  }
  if (STATUSES.LOADING === status) {
    return (
      <div>
        <h2>Loading....... </h2>
      </div>
    )
  }
  if (STATUSES.ERROR === status) {
    return (
      <div>
        <h2>Something went wrong! </h2>
      </div>
    )
  }
  return (
    <div className="productsWrapper">
      {Products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="" />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button onClick={() => handleAdd(product)} className="btn">
            Add to cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default Products
