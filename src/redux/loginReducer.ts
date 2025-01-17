import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  isUserLogined: boolean;
}

const initialState: UserState = {
  isUserLogined: false,
};

const userLoginSlice = createSlice({
  name: 'UserLogin',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{isLogin: boolean}>) => {
      state.isUserLogined = action.payload.isLogin;
    },
  },
});

export const {setLogin} = userLoginSlice.actions;
export default userLoginSlice.reducer;
