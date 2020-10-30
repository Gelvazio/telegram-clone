/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Projeto Telegram Clone;
*/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './sidebarthreads.css'

import { setTheread } from '../../features/threadSlice'
import db from '../../conexao/firebase'

import { Avatar } from '@material-ui/core'

const SidebarThreads = ({ id, threadName }) => {
    const dispatch = useDispatch()

    const [threadInfo, setThreadInfo] = useState([])

    useEffect(() => {
        db.collection('threads')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot =>
                setThreadInfo(snapshot.docs.map(doc => doc.data()))
            )
    }, [id])

    return (
        <div
            className="sidebarthreads"
            onClick={() =>
                dispatch(
                    setTheread({
                        threadId: id,
                        threadName: threadName,
                    })
                )
            }
        >
            <Avatar
                src={threadInfo[0]?.photo}
            />
            <div className="sidebarthreads__details">
                <h3>{threadName}</h3>
                <p>This is the info</p>
                <small
                    className="sidebarthreads__timestamp"
                >
                    {new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleString()}
                </small>
            </div>
        </div>
    )
}

export default SidebarThreads
