import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'groupDatas',
  initialState: {
    login : false,
    groupData:{}
  },
  reducers: {

    setGroup(state,action) {
      const group = action.payload;
      return {...state, groupData:group,login:true}
    },
  }
})

export const {setGroup} = userSlice.actions;

export default userSlice.reducer;
