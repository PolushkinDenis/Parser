import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux"
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

const ChartsUser = () => {
    // const { averagePrice } = { ...props }

    const location = useLocation()

    const search = location.state;
    console.log(search)

    // const user = useSelector(state => state.user)

    // Год к цене
    // if(search)
    let yearToPriceArr = []
    let yearToProbegArr = []
    let priceToProbegArr = []

    search.map((item) => {


        const dataYearToPrice = [...item.search]
        dataYearToPrice.sort((prev, next) => prev.year - next.year)
        const yearToPrice = []
        dataYearToPrice.map(item => {
            let obj = {
                name: item.year,
                price: item.price
            }
            yearToPrice.push(obj)
        })
        yearToPriceArr.push(yearToPrice)

        // Год к пробегу
        const dataYearToProbeg = [...item.search]
        dataYearToProbeg.sort((prev, next) => prev.year - next.year)
        const yearToProbeg = []
        dataYearToProbeg.map(item => {
            let obj = {
                name: item.year,
                probeg: item.probeg
            }
            yearToProbeg.push(obj)
        })
        yearToProbegArr.push(yearToProbeg)

        // Пробег к цене
        const dataPriceToProbeg = [...item.search]
        dataPriceToProbeg.sort((prev, next) => prev.price - next.price)
        const priceToProbeg = []
        dataPriceToProbeg.map(item => {
            let obj = {
                name: item.price,
                probeg: item.probeg
            }
            priceToProbeg.push(obj)
        })
        priceToProbegArr.push(priceToProbeg)

    })

    return (
        <div>
            <TableContainer component={Paper} sx={{ mt: 2, ml: 2, width: "98%" }}>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {search.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">
                                    {item.filters.city.label}
                                </StyledTableCell>
                                <StyledTableCell >{item.filters.brand.name}</StyledTableCell>
                                <StyledTableCell >{item.filters.model.model}</StyledTableCell>
                                <StyledTableCell >{item.filters.yearFrom}</StyledTableCell>
                                <StyledTableCell >{item.filters.yearTo}</StyledTableCell>
                                <StyledTableCell >{item.filters.priceFrom}</StyledTableCell>
                                <StyledTableCell >{item.filters.priceTo}</StyledTableCell>
                                <StyledTableCell>{item.averagePrice}</StyledTableCell>
                                <StyledTableCell >{item.avarageOdometer}</StyledTableCell>
                                <StyledTableCell>{item.site}</StyledTableCell>
                                <StyledTableCell>{item.date}</StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{display: "flex"}}>
                {search.map((item, index) => (
                    <div style={{ margin: "20px 0 0 20px" }}>
                        <h2>Цена по годам. {item.filters.city.label}</h2>
                        <LineChart width={650} height={400} data={yearToPriceArr[index]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="price" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                        <h2>Пробег по годам</h2>
                        <LineChart width={650} height={400} data={yearToProbegArr[index]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="probeg" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                        <h2>Цена к пробегу</h2>
                        <LineChart width={650} height={400} data={priceToProbegArr[index]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="probeg" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default ChartsUser