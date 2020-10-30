/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Projeto Telegram Clone;
*/
import React from 'react'
import { useSelector } from 'react-redux'
import './message.css'

import { selectUser } from '../../features/userSlice'
import { Avatar } from '@material-ui/core'

const MessageBody = ({ id, data: { timestamp, displayName, email, message, photo, uid } }) => {
    const user = useSelector(selectUser)

    return (
        <div className={`messagebody ${user.email === email && 'messagebody__sender'}`} >
            <Avatar
                className="messagebody__photo"
                src={photo}
                alt={displayName}
            />
            <div className="messagebody__contents">
                <p>{message}</p>
                <small>{new Date(timestamp?.toDate()).toUTCString()}</small>
            </div>
        </div>
    )
}

export default MessageBody
