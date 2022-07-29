import { combineReducers } from "redux";

import User from './user';

import Group from './Group';
import image from "./image";


const reducer = combineReducers({
   User:User,
   Group:Group,
   image:image
 });
 
 export default reducer;


   