import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'imageData',
  initialState: {
    imageData:[]
  },
  reducers: {
    setImages(state,action) {
      const image = action.payload;
    //   console.log('iiiii++_',action.payload)
      return {...state, imageData:image}
    },
  }
})

export const {  setImages } = userSlice.actions;

export default userSlice.reducer;
