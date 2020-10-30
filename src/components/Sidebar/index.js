/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Projeto Telegram Clone;
*/
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './sidebar.css'

import SidebarThreads from '../SidebarThreads'
import db, { auth } from '../../conexao/firebase'
import { selectUser } from '../../features/userSlice'

import SearchIcon from '@material-ui/icons/Search'
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined'
import { Avatar, IconButton } from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import PhoneOutlined from '@material-ui/icons/PhoneOutlined'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import SettingsIcon from '@material-ui/icons/Settings'

const Sidebar = () => {
    const user = useSelector(selectUser)
    const [threads, setThreads] = useState([])

    useEffect(() => {
        db.collection('threads')
            .onSnapshot(snapshot => (
                setThreads(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))))
    }, [])

    const handleAddThreads = () => {
        const threadName = prompt("Adicionar um usuário no chat!")

        if (threadName) {
            db.collection('threads').add({
                threadName: threadName,
            })
        }
    }

    const handleLogout = () => {
        auth.signOut()
    }

    return (
        <div className="sidebar" >

            <div className="sidebar__header">
                <div className="sidebar__search">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        className="sidebar__input"
                    />
                </div>
                <IconButton
                    variant="outlined"
                    id="sidebar__button"
                >
                    <BorderColorOutlinedIcon
                        onClick={handleAddThreads}
                    />
                </IconButton>
            </div>
            <div className="sidebar__threads">
                {threads.map(({ id, data: { threadName } }) => (
                    <SidebarThreads
                        key={id}
                        id={id}
                        threadName={threadName}
                    />
                ))}
            </div>
            <div className="sidebar__bottom">
                <Avatar
                    className="sidebar__bottom__avatar"
                />
                <IconButton>
                    <PhoneOutlined />
                </IconButton>
                <IconButton>
                    <QuestionAnswerIcon />
                </IconButton>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
                <IconButton>
                    <PowerSettingsNewIcon 
                        onClick={handleLogout}
                    />
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar
