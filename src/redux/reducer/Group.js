import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'groupDatas',
  initialState: {
    groupData:{}
  },
  reducers: {

    setGroup(state,action) {
      const group = action.payload;
      return {...state, groupData:group}                                            
    },
  }
})

export const {setGroup} = userSlice.actions;

export default userSlice.reducer;
