import { combineReducers } from "@reduxjs/toolkit";
import NoteReducer from './noteReducer';

export default combineReducers({
    noteReducer:NoteReducer,
})