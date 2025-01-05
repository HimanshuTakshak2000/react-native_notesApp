import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AddNotesType{
    title: string,
    desc: string,
}

const initialState: string = ''


const addNotesSlice = createSlice({
    name:'AddNotes',
    initialState,
    reducers:{
        addNotes(state, action: PayloadAction<string>){
            
        }
    }
});

export const {addNotes} = addNotesSlice.actions;
export default addNotesSlice.reducer;
export const addNotesSelect = (state: RootState) => state.addNoteReducer;