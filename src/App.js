/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Projeto Telegram Clone;
*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import Telegram from './components/Telegram'
import Login from './Pages/Login';

import { logout, login, selectUser } from '../src/features/userSlice'
import { auth } from '../src/conexao/firebase'

function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(
                    login({
                        uid: authUser.uid,
                        photo: authUser.photoUrl,
                        email: authUser.email,
                        displayName: authUser.displayName,
                    })
                )
            } else {
                dispatch(logout())
            }
        })
    }, [dispatch])

    return (
        <div className="app">
            {user ? (
                <Telegram />
            ) : (
                    <Login />
                )}
        </div>
    );
}

export default App;
