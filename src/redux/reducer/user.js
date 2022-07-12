import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    login : false,
    lastmessage:'',
    groupData:{}
  },
  reducers: {
    setUser(state,action) {
      const user = action.payload;
      return {...state, userData:user,login:true}
    },
    removeUser(state,action) {
       return {...state, userData:{},login:false}
    },
    lstmsg(state,action){
      const lastmsg=action.payload;
      return{...state,lastmessage}
    },
    setGroup(state,action) {
      const group = action.payload;
      return {...state, groupData:group,login:true}
    },
  }
})

export const {  setUser, removeUser , lstmsg ,setGroup} = userSlice.actions;

export default userSlice.reducer;
