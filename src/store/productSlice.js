import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
})

const initialState = {
  data: [],
  status: STATUSES.IDLE,
}
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action) {
      //   state.data.push(action.payload)
      state.data = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchProducts.pending, (state, action) => {
  //         state.status = STATUSES.LOADING
  //       })
  //       .addCase(fetchProducts.fulfilled, (state, action) => {
  //         state.data = action.payload
  //         state.status = STATUSES.IDLE
  //       })
  //       .addCase(fetchProducts.rejected, (state, action) => {
  //         {
  //           state.status = STATUSES.ERROR
  //         }
  //       })
  //   },
})

export const { setProduct, setStatus } = productSlice.actions
export default productSlice.reducer

// THUNKS for api call

//extra reducers------------------------------
// export const fetchProducts = createAsyncThunk('products/fetch', async () => {
//   const response = await fetch('https://fakestoreapi.com/products', {
//     method: 'GET',
//   })
//   const result = await response.json()
//   return result
// })

export function fetchProducts() {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING))
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'GET',
      })
      const result = await response.json()
      dispatch(setProduct(result))
      dispatch(setStatus(STATUSES.IDLE))
    } catch (err) {
      console.log(err)
      dispatch(setStatus(STATUSES.ERROR))
    }
  }
}
