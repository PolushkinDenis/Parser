import React, { useEffect, useState } from 'react'
import UserCars from '../UserCars/UserCars'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './User.css'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const User = () => {
    const user = useSelector(state => state.user)
    const [userCars, setUserCars] = useState([])
    const [userFilters, setUserFilters] = useState([])
    const [history, setHistory] = useState([])
    const [compare, setCompare] = useState([])
    const [checked, setChecked] = useState([]);

    const navigate = useNavigate()

    const getCars = async () => {
        const responce = await axios.post('http://localhost:5000/api/car/get', {
            userId: user.id,
        })
        setUserCars(responce.data)
    }
    const deleteCar = async (id) => {
        const responce = await axios.post('http://localhost:5000/api/car/delete', {
            id: id,
        })
        getCars()
    }

    const getFilters = async () => {
        const responce = await axios.post('http://localhost:5000/api/filters/get', {
            userId: user.id,
        })

        const arrayOfFilters = []

        const filters = {
            city: '',
            brand: '',
            model: '',
            yearFrom: '',
            yearTo: '',
            priceFrom: '',
            priceTo: '',
            sorting: '',
            comparison: false
        }
        responce.data.map(filter => {
            filters.id = filter.id
            filters.city = JSON.parse(filter.city)
            filters.brand = JSON.parse(filter.brand)
            filters.model = JSON.parse(filter.model)
            filters.yearFrom = filter.yearFrom
            filters.yearTo = filter.yearTo
            filters.priceFrom = filter.priceFrom
            filters.priceTo = filter.priceTo
            filters.sorting = JSON.parse(filter.sort)
            arrayOfFilters.push(filters)
        })

        setUserFilters(arrayOfFilters)
    }
    const deleteFilter = async (id) => {
        const responce = await axios.post('http://localhost:5000/api/filters/delete', {
            id: id,
        })
        getFilters()
    }

    const applyFilters = (filter) => {
        navigate('/main', { state: filter })
    }

    const handleChange = (event, index) => {
        let countTrue = 0
        checked.map((item) => {
            if (item === true) {
                countTrue++
            }
        })
        console.log(event.target.checked)
        if (event.target.checked === true && countTrue < 2) {
            const newChecked = [...checked]
            if (newChecked.lenght === 2) {
                newCompare.shift()
            }
            newChecked[index] = !newChecked[index]
            setChecked(newChecked);
            //history
            let newCompare = []
            newChecked.map((check, index) => {
                if (check === true) {
                    newCompare.push(history[index])
                }
            })
            setCompare(newCompare)
        }
        if (event.target.checked === false) {
            const newChecked = [...checked]
            if (newChecked.lenght === 2) {
                newCompare.shift()
            }
            newChecked[index] = !newChecked[index]
            setChecked(newChecked);
            //history
            let newCompare = []
            newChecked.map((check, index) => {
                if (check === true) {
                    newCompare.push(history[index])
                }
            })
            setCompare(newCompare)
        }

        // if(compare.length === 0) {
        //     setCompare(search)
        // }
        // if(compare.length === 1){
        //     setCompare([...compare], search)
        // }
        // else {
        //     const newCompare = [...compare]
        //     newCompare[0] = search
        //     setCompare([...compare], search)
        // }
    };
    console.log(compare)

    const getHistory = async () => {
        const responce = await axios.post('http://localhost:5000/api/history/get', {
            userId: user.id,
        })
        let searchArray = []
        responce.data.map((item) => {
            const search = JSON.parse(item.search)
            let averagePrice = 0
            let avarageOdometer = 0
            search.map(item => {
                averagePrice += item.price
                avarageOdometer += item.probeg
            })
            averagePrice = Math.floor(averagePrice / search.length)
            avarageOdometer = Math.floor(avarageOdometer / search.length)
            console.log(averagePrice)
            console.log(avarageOdometer)

            const result = {
                id: item.id,
                userId: item.userId,
                filters: JSON.parse(item.filters),
                search: JSON.parse(item.search),
                averagePrice: averagePrice,
                avarageOdometer: avarageOdometer,
                site: item.site,
                date: item.createdAt.slice(0, 10)
            }
            console.log(result)
            searchArray.push(result)
        })
        const arrayOfChecked = []
        searchArray.map(() => {
            arrayOfChecked.push(false)
        })
        console.log(responce)
        setChecked(arrayOfChecked)
        setHistory(searchArray)
    }
    console.log(history)
    console.log(checked)
    const deleteHistory = async (id) => {
        const responce = await axios.post('http://localhost:5000/api/history/delete', {
            id: id,
        })
        getHistory()
    }

    const viewHistory = (search) => {
        // if(compare === 0){
        //     navigate('/history', { state: search })
        // }
        // else {
        navigate('/history', { state: search })
        // }
    }

    useEffect(() => {
        console.log('aaaa')
        getHistory()
        getFilters()
        getCars()
    }, [])

    return (
        <div className="user-content">
            <Typography variant="h5" gutterBottom>Сохраненная статистика</Typography>
            {history.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Город</StyledTableCell>
                                <StyledTableCell >Бренд</StyledTableCell>
                                <StyledTableCell >Модель</StyledTableCell>
                                <StyledTableCell >Год от</StyledTableCell>
                                <StyledTableCell >Год от</StyledTableCell>
                                <StyledTableCell >Цена от</StyledTableCell>
                                <StyledTableCell >Цена до</StyledTableCell>
                                <StyledTableCell>Средняя цена</StyledTableCell>
                                <StyledTableCell >Средний пробег</StyledTableCell>
                                <StyledTableCell >Сайт</StyledTableCell>
                                <StyledTableCell >Дата</StyledTableCell>
                                <StyledTableCell >К сравнению</StyledTableCell>
                                <StyledTableCell ></StyledTableCell>
                                <StyledTableCell ></StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {history.map((search, index) => (
                                <StyledTableRow key={search.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {search.filters.city.label}
                                    </StyledTableCell>
                                    <StyledTableCell >{search.filters.brand.name}</StyledTableCell>
                                    <StyledTableCell >{search.filters.model.model}</StyledTableCell>
                                    <StyledTableCell >{search.filters.yearFrom}</StyledTableCell>
                                    <StyledTableCell >{search.filters.yearTo}</StyledTableCell>
                                    <StyledTableCell >{search.filters.priceFrom}</StyledTableCell>
                                    <StyledTableCell >{search.filters.priceTo}</StyledTableCell>
                                    <StyledTableCell>{search.averagePrice}</StyledTableCell>
                                    <StyledTableCell >{search.avarageOdometer}</StyledTableCell>
                                    <StyledTableCell>{search.site}</StyledTableCell>
                                    <StyledTableCell>{search.date}</StyledTableCell>
                                    <StyledTableCell>
                                        <Checkbox checked={checked[index]} onChange={(e) => handleChange(e, index)} />
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        {checked[index] === true ? (<Button onClick={() => viewHistory(compare)}>Сравнить</Button>)
                                            :
                                            (<Button onClick={() => viewHistory([search])}>Подробнее</Button>)
                                        }

                                    </StyledTableCell>
                                    <StyledTableCell >
                                        <IconButton aria-label="gelete from favorites" onClick={() => deleteHistory(search.id)}>
                                            <DeleteIcon style={{ color: 'red' }} />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}

                        </TableBody>

                    </Table>
                </TableContainer>
            )}

            <Typography variant="h5" gutterBottom>Сохраненные фильтры</Typography>
            {userFilters.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Город</StyledTableCell>
                                <StyledTableCell >Бренд</StyledTableCell>
                                <StyledTableCell >Модель</StyledTableCell>
                                <StyledTableCell>Год от</StyledTableCell>
                                <StyledTableCell >Год от</StyledTableCell>
                                <StyledTableCell >Цена от</StyledTableCell>
                                <StyledTableCell >Цена до</StyledTableCell>
                                <StyledTableCell>Сортировка</StyledTableCell>
                                <StyledTableCell ></StyledTableCell>
                                <StyledTableCell ></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userFilters.map((filter) => (
                                <StyledTableRow key={filter.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {filter.city.label}
                                    </StyledTableCell>
                                    <StyledTableCell >{filter.brand.name}</StyledTableCell>
                                    <StyledTableCell >{filter.model.model}</StyledTableCell>
                                    <StyledTableCell>{filter.yearFrom}</StyledTableCell>
                                    <StyledTableCell>{filter.yearTo}</StyledTableCell>
                                    <StyledTableCell >{filter.priceFrom}</StyledTableCell>
                                    <StyledTableCell >{filter.priceTo}</StyledTableCell>
                                    <StyledTableCell >{filter.sorting?.label}</StyledTableCell>
                                    <StyledTableCell ><Button onClick={() => applyFilters(filter)}>Применить</Button></StyledTableCell>
                                    <StyledTableCell >
                                        <IconButton aria-label="gelete from favorites" onClick={() => deleteFilter(filter.id)}>
                                            <DeleteIcon style={{ color: 'red' }} />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Typography variant="h5" sx={{ mt: 3 }}>Избранные авто</Typography>
            <Box sx={{ flexGrow: 1 }} >

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {userCars.length > 0 && (
                        userCars.map(car =>
                            // <UserCars car={car} key={car.href} onClick={() => click(car.id)}/>
                            <Grid xs={2} sm={4} md={4}>

                                <Card sx={{ maxWidth: 400, mb: 5 }} key={car.href}>
                                    <CardHeader
                                        title={car.name}
                                        subheader={car.price}
                                    />

                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={car.image}
                                        alt={car.name}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">{car.info}</Typography>
                                        <Typography variant="body2" color="text.secondary">{car.city}</Typography>

                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>Описание</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    {car.description}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>


                                        {/* <Typography variant="body2" color="text.secondary">
                                {car.description}
                            </Typography> */}
                                    </CardContent>
                                    <CardActions disableSpacing >
                                        <Link href={car.href} underline="none" target="_blank" sx={{ mr: 3 }}>
                                            Посмотреть объявление
                                        </Link>
                                        <IconButton aria-label="gelete from favorites" onClick={() => deleteCar(car.id)} >
                                            <DeleteIcon color="primary" />
                                        </IconButton>

                                    </CardActions>
                                </Card>
                            </Grid>

                        )
                    )}
                </Grid>
            </Box>
        </div>
    )
}

export default User