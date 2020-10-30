/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Projeto Telegram Clone;
*/
import { createSlice } from '@reduxjs/toolkit';

export const threadSlice = createSlice({
    name: 'thread',

    initialState: {
        threadId: null,
        threadName: null,
    },

    reducers: {
        setTheread: (state, action) => {
            state.threadId = action.payload.threadId;
            state.threadName = action.payload.threadName;
        },
    },
});

export const { setTheread } = threadSlice.actions;

export const selectthreadId = state => state.thread.threadId;
export const selectthreadName = state => state.thread.threadName;

export default threadSlice.reducer;
