import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux"
import './ChartsComparison.css'

const testDAta =
    [
        { year: 2022, price: 11480000, probeg: 11000 },
        { year: 2010, price: 2448220, probeg: 331000 },
        { year: 2015, price: 5203070, probeg: 138000 },
        { year: 2018, price: 7144550, probeg: 103000 },
        { year: 2018, price: 6948270, probeg: 96000 },
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


const ChartsComparison = (props) => { //{averagePrice}, company
    const {averagePrice, company} = {...props}
    // const averagePrice = useSelector(state => state.avaragePriceDromReducer.avaragePriceDrom)

    let yearToPrice1 = []
    let yearToPrice2 = []
    let yearToProbeg1 = []
    let yearToProbeg2 = []
    let priceToProbeg1 = []
    let priceToProbeg2 = []

    // Год к цене 1
    if (averagePrice.length === 2) {
        const dataYearToPrice1 = [...averagePrice[0]]
        dataYearToPrice1.sort((prev, next) => prev.year - next.year)
        yearToPrice1 = []
        dataYearToPrice1.map(item => {
            let obj = {
                name: item.year,
                price: item.price
            }
            yearToPrice1.push(obj)
        })
        // Год к цене 2
        const dataYearToPrice2 = [...averagePrice[1]]
        dataYearToPrice2.sort((prev, next) => prev.year - next.year)
        yearToPrice2 = []
        dataYearToPrice2.map(item => {
            let obj = {
                name: item.year,
                price: item.price
            }
            yearToPrice2.push(obj)
        })
        // Год к пробегу1
        const dataYearToProbeg1 = [...averagePrice[0]]
        dataYearToProbeg1.sort((prev, next) => prev.year - next.year)
        yearToProbeg1 = []
        dataYearToProbeg1.map(item => {
            let obj = {
                name: item.year,
                probeg: item.probeg
            }
            yearToProbeg1.push(obj)
        })
        // Год к пробегу2
        const dataYearToProbeg2 = [...averagePrice[1]]
        dataYearToProbeg2.sort((prev, next) => prev.year - next.year)
        yearToProbeg2 = []
        dataYearToProbeg2.map(item => {
            let obj = {
                name: item.year,
                probeg: item.probeg
            }
            yearToProbeg2.push(obj)
        })

        // Пробег к цене 1
        const dataPriceToProbeg1 = [...averagePrice[0]]
        dataPriceToProbeg1.sort((prev, next) => prev.price - next.price)
        priceToProbeg1 = []
        dataPriceToProbeg1.map(item => {
            let obj = {
                // name: item.price,
                // probeg: item.probeg
                name: item.probeg,
                price: item.price
            }
            priceToProbeg1.push(obj)
        })
        // Пробег к цене 2
        const dataPriceToProbeg2 = [...averagePrice[1]]
        dataPriceToProbeg2.sort((prev, next) => prev.price - next.price)
        priceToProbeg2 = []
        dataPriceToProbeg2.map(item => {
            let obj = {
                // name: item.price,
                // probeg: item.probeg
                name: item.probeg,
                price: item.price
            }
            priceToProbeg2.push(obj)
        })
    }




    return (
        <div>
            {averagePrice.length === 2 && (
                <div>
                    <div className='h2-center'>
                        <h2 >График цена по годам. {company}</h2>
                    </div>

                    <div className='price-to-year'>
                        <LineChart width={700} height={400} data={yearToPrice1} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="price" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                        <LineChart width={700} height={400} data={yearToPrice2} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="price" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </div>
                    <div className='h2-center'>
                        <h2 >График пробег по годам. {company}</h2>
                    </div>
                    <div className='price-to-year'>
                        {/* <h2>График пробег по годам</h2> */}
                        <LineChart width={700} height={400} data={yearToProbeg1} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="probeg" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                        <LineChart width={700} height={400} data={yearToProbeg2} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="probeg" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </div>
                    <div className='h2-center'>
                        <h2 >График цены от пробега. {company}</h2>
                    </div>
                    <div className='price-to-year'>
                        {/* <h2>График цены к пробегу</h2> */}
                        <LineChart width={700} height={400} data={priceToProbeg1} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="price" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>

                        <LineChart width={700} height={400} data={priceToProbeg2} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="price" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </div>


                </div>

            )}

        </div>
    )
}

export default ChartsComparison