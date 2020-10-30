/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Projeto Telegram Clone;
*/
import React, { useEffect, useState } from 'react'
import './thread.css'

import db from '../../conexao/firebase'
import firebase from 'firebase'
import MessageBody from '../MessageBody'

import { useSelector } from 'react-redux'
import { selectthreadId, selectthreadName } from '../../features/threadSlice'
import { selectUser } from '../../features/userSlice'

import { Avatar, IconButton } from '@material-ui/core'
import {
    MoreHoriz,
    SendRounded,
    MicNoneOutlined,
    TimerOutlined,
    Message,
    AttachFilelined,
    EmojiEmotionsOutlined,
} from '@material-ui/icons'

const Thread = () => {
    const threadId = useSelector(selectthreadId)
    const threadName = useSelector(selectthreadName)
    const user = useSelector(selectUser)

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (threadId) {
            db.collection('threads')
                .doc(threadId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) =>
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    )
                )
        }
    }, [threadId])

    const handleSendMensage = (e) => {
        e.preventDefault()
        db.collection('threads')
            .doc(threadId)
            .collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                uid: user.uid,
                photo: user.photo,
                email: user.email,
                displayName: user.displayName,
            })
            .then(() => {
                setInput("")
            })
    }

    // const handleStartTimeOut = (input, uid) => {
    //     db.collection('threads')
    //         .doc(threadId)
    //         .collection('messages')
    //         .where('message', '==', input)
    //         .where('uid', '==', uid)
    //         .get()
    //         .then(queySnapshot => {
    //             queySnapshot.forEach(doc => {
    //                 doc.ref
    //                     .delete()
    //                     .then(() => {
    //                         console.log('Messege sucessfully deleted!')
    //                     })
    //                     .catch(function (error) {
    //                         console.error('Error removing message: ', error)
    //                     })
    //             })
    //         })
    // }

    return (
        <div className="thread" >
            {/* HEADER MESSANGE */}
            <div className="thread__header">
                <div className="thread__header__contents">
                    <Avatar />
                    <div className="thread__header__contents__info">
                        <h4>{threadName}</h4>
                        <h5>
                            Visto pela última vez{' '}
                        </h5>
                    </div>
                </div>
                <IconButton>
                    <MoreHoriz
                        className="thread__header__details"
                    />
                </IconButton>
            </div>

            {/* BODY MESSANGE */}
            <div className="thread__messages">
                {messages.map(({ id, data }) => (
                    <MessageBody
                        key={id}
                        id={id}
                        data={data}
                    />
                ))}
            </div>

            {/* FOOTER MESSANGE */}
            <div className="thread_input">
                <form>
                    <div className="thread_iconButton">
                        <Message />
                    </div>
                    <input
                        type="text"
                        placeholder="Escreva sua mensagem..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <IconButton
                        onClick={handleSendMensage}
                        type="submit"
                    >
                        <SendRounded />
                    </IconButton>
                    <IconButton>
                        <TimerOutlined />
                    </IconButton>
                    <IconButton>
                        <MicNoneOutlined />
                    </IconButton>
                </form>
            </div>
        </div>
    )
}

export default Thread
