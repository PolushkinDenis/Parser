import React, { useContext, useState } from 'react';
import './AutoItem.css'
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useSelector } from 'react-redux';
import axios from 'axios';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const AutoItem = (props) => {
    // const {user} = useContext(Context)

    const car = props.car
    const user = props.user
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);



    // console.log(user)
    // console.log(car)

    const addCar = async () => {
        try {
            const postUserCar = await axios.post("http://localhost:5000/api/car/add", {
                //userId: user.id,
                userId: user.id,
                car: car
            })
            setOpen(true);
        }
        catch (e) {
            setErrorOpen(true)
            setOpen(false);
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false)
        setOpen(false);
    };
    return (
        <div className="auto">
            <div className="auto-content">
                <div className="auto-img">
                    <img src={car.image ? car.image : car.imageSecond} alt={car.name}></img>
                </div>
                <div className='auto-info'>
                    <a href={car.href} target="_blank"> {car.name}</a>


                    {/* <div className='auto-info_name'></div> */}
                    <div className='auto-info_price'>{car.price}</div>
                    {car.snippen &&
                        <div className='auto-info_snippet'>{car.snippen}</div>
                    }

                    <div className='auto-info_info'>{car.info}</div>
                    <div className='auto-info_description'>{car.description.length > 150 && (car.description.substring(0, 150) + "...")}</div>
                    <div className='auto-info_city'>{car.city}</div>
                    <div className='auto-info_time'>{car.time}</div>

                </div>
                <div className='favorite'>
                    {user.id !== '' && (
                        <IconButton aria-label="gelete from favorites" onClick={addCar} >
                            <FavoriteBorderIcon color="primary" />
                        </IconButton>
                        // <button onClick={addCar}>Добавить</button>
                    )}
                </div>
            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Авто добавлено
                    </Alert>
                </Snackbar>
                <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Не удалось получить авто
                    </Alert>
                </Snackbar>
            </Stack>


        </div>

    )
}

export default AutoItem