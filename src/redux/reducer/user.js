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
      console.log('iiiii++_',action.payload)
      return {...state, userData:user,login:true}
    },
    removeUser(state,action) {
       return {...state, userData:{},login:false}
    },
    lstmsg(state,action){
      const lastmsg=action.payload;
      return{...state,lastmessage}
    },
   
  }
})

export const {  setUser, removeUser , lstmsg } = userSlice.actions;

export default userSlice.reducer;
