import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAutoAction, fetchAutoSuccessAction } from "../../store/autoReducer";
import { fetchAvaragePriceAction, fetchAvaragePriceSuccessAction } from '../../store/averagePrice';
import { fetchAvaragePriceAutoRuSuccessAction } from '../../store/avaragePriceAutoRu';
import { fetchAvaragePriceDromSuccessAction, fetchAvaragePriceDromAction } from '../../store/avaragePriceDrom';
import { filtersAction } from '../../store/filtersReducer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import caphca from '../../images/Capcha.png' 
import TextField from '@mui/material/TextField';

import './Websocket.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const Websocket = ({ filters }) => {

    console.log(filters)
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

    const socket = useRef()
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('')
    const [capcha, setCapcha] = useState(false)
    const [capchaText, setCapchaText] = useState('')
    const [capchaSrc, setCapchaSrc] = useState('')
    // const [filters, setFilters] = useState({
    //     city: 'samara', brand: 'bmw', yearFrom: '1990', yearTo: '2002', priceFrom: '100000', priceTo: '500000', sorting: 's=104'
    // })

    const auto = useSelector(state => state.auto)
    const dispatch = useDispatch()

    const handleClose = () => {
        setCapcha(false);
      };

    const changeCapchText = (event) => {
        setCapchaText(event.target.value)
    }
    console.log(capchaText)
    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                filters: filters,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            console.log('111111')
            // console.log(message)
            if (message.event === 'connection') {
                //dispatch(fetchAutoAction())
            }
            if (message.event === 'avarage') {

                const averagePrice = JSON.parse(event.data)
                console.log(averagePrice)
                console.log(averagePrice.data)
                if (averagePrice.type === 'avito') {
                    console.log("AVITo")
                    dispatch(fetchAvaragePriceSuccessAction(averagePrice.data))
                }
                if (averagePrice.type === 'autoRu') {
                    console.log("AUTORU")
                    dispatch(fetchAvaragePriceAutoRuSuccessAction(averagePrice.data))
                }
                if (averagePrice.type === 'drom') {
                    console.log("DROM")
                    dispatch(fetchAvaragePriceDromSuccessAction(averagePrice.data))
                }
                // if(Array.isArray(averagePrice.data)){
                //     console.log("Это массив")
                //     console.log(averagePrice.data)

                // }
            }
            if (message.event === 'message') {
                console.log('2222222')
                if (message.data === 'capcha') {
                    setCapchaSrc(message.capchaSrc)
                    setCapcha(true)
                }
                else {
                    const autoRes = JSON.parse(event.data)
                    console.log(autoRes)
                    console.log(autoRes.data)
                    dispatch(fetchAutoSuccessAction(autoRes.data))
                }
            }
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт')
            setConnected(false)
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
            setConnected(false)
        }
    }

    const sendMessage = async () => {
        console.log(filters)
        filters.city === '' && (filters.city = { avitoHref: "all", autoRuHref: "all", dromHref: "https://auto.drom.ru/" })
        filters.brand === '' && (filters.brand = { hrefAvito: "", hrefAutoRu: "", dromHref: "" })
        filters.model === '' && (filters.model = { hrefAvito: '', hrefAutoRu: '', dromHref: "" })
        filters.yearFrom === '' && (filters.yearFrom = '1990')
        filters.yearTo === '' && (filters.yearTo = '2022')
        filters.priceFrom === '' && (filters.priceFrom = '1')
        filters.priceTo === '' && (filters.priceTo = '50000000')
        filters.sorting === '' &&  (filters.sorting = { avitoSorting: "", autoRuSorting: "cr_date-desc", dromHref: '' }) //(filters.sorting.autoRuSorting = "cr_date-desc" )
        console.log(filters.sorting.autoRuSorting)
        // filters.sorting === {avitoSorting: '', autoRuSorting: '', dromHref: ''} && (filters.sorting = { avitoSorting: "", autoRuSorting: "cr_date-desc", dromHref: '' })
        const message = {
            username,
            message: value,
            filters: filters,
            id: Date.now(),
            event: 'message'
        }
        console.log("CLICK")
        socket.current.send(JSON.stringify(message));
    }
    const sendMessageAvaragePrice = async () => {
        filters.city === '' && (filters.city = { avitoHref: "all", autoRuHref: "all", dromHref: "https://auto.drom.ru/" })
        filters.brand === '' && (filters.brand = { hrefAvito: "", hrefAutoRu: "", dromHref: "" })
        filters.model === '' && (filters.model = { hrefAvito: '', hrefAutoRu: '', dromHref: "" })
        filters.yearFrom === '' && (filters.yearFrom = '')
        filters.yearTo === '' && (filters.yearTo = '')
        filters.priceFrom === '' && (filters.priceFrom = '')
        filters.priceTo === '' && (filters.priceTo = '')
        filters.sorting === '' && (filters.sorting = { avitoSorting: "", autoRuSorting: "", dromHref: '' })

        dispatch(filtersAction(filters))

        const message = {
            username,
            message: value,
            filters: filters,
            id: Date.now(),
            event: 'avarage'
        }
        socket.current.send(JSON.stringify(message));
    }
    const sendCapcha = () => {
        const message = {
            message: capchaText,
            filters: filters,
            id: Date.now(),
            event: 'capcha'
        }
        socket.current.send(JSON.stringify(message));
        setCapcha(false);
    }

    useEffect(() => {
        if (!connected) {
            console.log("Reconnect")
            connect()
        }

    }, [])

    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    {/* <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Введите ваше имя" /> */}
                    <Button variant="contained" onClick={connect}>Подключиться к серверу</Button>
                </div>
            </div>
        )
    }


    return (
        <div className="center">
            <div className='buttons'>
                <div className="form1">
                    {/* <input value={value} onChange={e => setValue(e.target.value)} type="text" /> */}
                    {filters.comparison === false && (
                        <Button variant="contained" onClick={sendMessage}>Поиск</Button>
                    )}
                </div>
                <div className="form2">
                    <Button variant="contained" onClick={sendMessageAvaragePrice}>Статистика</Button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className="connection_message">
                                    Пользователь {mess.username} подключился
                                </div>
                                : <div className="message">
                                    {mess.username}. {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
            <Button onClick={() => setCapcha(true)}>Открыть модалье окно</Button>
            <Modal
                open={capcha}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <div className='box'>
                    <img className='modal-img' src={capchaSrc}></img> 
                    {/* caphca */}
                    </div>
                    <h2 id="parent-modal-title">Введите текст с картинки</h2>
                    <TextField id="standard-basic" label="Капча" variant="standard" onChange={e => changeCapchText(e)}/>
                    <Button onClick={sendCapcha}>Отправить</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Websocket