import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  userId: string;
  name: string;
}

const initialState: UserState = {
  userId: '',
  name: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{userId: string; name: string}>) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
    },
  },
});

export const {setUser} = notesSlice.actions;
export default notesSlice.reducer;
