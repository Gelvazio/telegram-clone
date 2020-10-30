/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Projeto Telegram Clone;
*/
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import threadReducer from '../features/threadSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        thread: threadReducer,
    },
});
