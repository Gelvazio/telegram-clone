/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Projeto Telegram Clone;
*/
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',

    initialState: {
        value: 0,
    },

    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: state => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = state => state.user.user;
export default userSlice.reducer;
