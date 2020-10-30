/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Projeto Telegram Clone;
*/
import React from 'react'
import './telegram.css'

import Sidebar from '../Sidebar'
import Thread from '../Thread'

const Telegram = () => {
    return (
        <div className="telegram">
            <Sidebar />
            <Thread />
        </div>
    )
}

export default Telegram
