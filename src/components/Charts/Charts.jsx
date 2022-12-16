import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux"
import axios from 'axios'

const testDAta = 
    [
        { year: 2022, price: 11480000, probeg: 11000 },
        { year: 2010, price: 2448220, probeg: 331000 },
        { year: 2015, price: 5203070, probeg: 138000 },
        { year: 2018, price: 7144550, probeg: 103000 },
        { year: 2018, price: 6948270, probeg: 96000},
        { year: 2013, price: 3193070, probeg: 285000 },
        { year: 1997, price: 2510000, probeg: 234000 },
        { year: 2015, price: 4900000, probeg: 152000 },
        { year: 1995, price: 1360000, probeg: 403000 },
        { year: 2018, price: 5620000, probeg: 114000 },
        { year: 2010, price: 2680000, probeg: 494000 },
        { year: 2012, price: 3310000, probeg: 280000 },
        { year: 1997, price: 820000, probeg: 330000 },
        { year: 2011, price: 5480000, probeg: 69000 },
        { year: 2009, price: 2210000, probeg: 161000 },
        { year: 2015, price: 4890000, probeg: 183000 },
        { year: 2015, price: 4920000, probeg: 212000 },
        { year: 2002, price: 1300000, probeg: 322000 },
        { year: 2008, price: 3480000, probeg: 194000 },
        { year: 2014, price: 3590000, probeg: 206000 },
        { year: 1992, price: 1680000, probeg: 286000 }
      ]


export default React.memo( function Charts(props) {
    const {averagePrice, company} = {...props}
    const user = useSelector(state => state.user)

    // Год к цене
    const dataYearToPrice = [...averagePrice[0]]
    dataYearToPrice.sort((prev, next) => prev.year - next.year)
    const yearToPrice = []
    dataYearToPrice.map(item => {
        let obj = {
            name: item.year,
            price: item.price
        }
        yearToPrice.push(obj)
    })

    // Год к пробегу
    const dataYearToProbeg = [...averagePrice[0]]
    dataYearToProbeg.sort((prev, next) => prev.year - next.year)
    const yearToProbeg = []
    dataYearToProbeg.map(item => {
        let obj = {
            name: item.year,
            probeg: item.probeg
        }
        yearToProbeg.push(obj)
    })

    // Пробег к цене
    const dataPriceToProbeg = [...averagePrice[0]]
    dataPriceToProbeg.sort((prev, next) => prev.price - next.price)
    const priceToProbeg = []
    dataPriceToProbeg.map(item => {
        let obj = {
            name: item.price,
            probeg: item.probeg
        }
        priceToProbeg.push(obj)
    })
    console.log(priceToProbeg)

   

    return (
        <div>
            
            <h2>График цена по годам. {company}</h2>
            <LineChart width={1000} height={400} data={yearToPrice} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
            <h2>График пробег по годам. {company}</h2>
            <LineChart width={1000} height={400} data={yearToProbeg} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="probeg" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
            <h2>График цены к пробегу. {company}</h2>
            <LineChart width={1000} height={400} data={priceToProbeg} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="probeg" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>         
        </div>
    )
})

// export default Charts