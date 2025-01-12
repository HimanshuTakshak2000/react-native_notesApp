import { combineReducers } from "@reduxjs/toolkit";
import NoteReducer from './noteReducer';
import LoginReducer from './loginReducer';

export default combineReducers({
    noteReducer:NoteReducer,
    userLoginReducer: LoginReducer,
})