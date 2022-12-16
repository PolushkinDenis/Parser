import React, { useState } from 'react'
import axios from "axios";
import { AutoBrands, AutoModels } from '../../data/AutoBrands'
import { cities } from '../../data/Cities'
import { sortings } from '../../data/Sorting'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux"
import './PriceComparison.css'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { fetchAvito } from '../../store/asyncActions/avito';
import Websocket from '../Websocket/Websocket';
import ChartsComparison from '../Charts/ChartsComparison';
import { deleteAvaragePrice } from '../../store/averagePrice';
import { deleteAvaragePriceDrom } from '../../store/avaragePriceDrom';
import { deleteAvaragePriceAutoRu } from '../../store/avaragePriceAutoRu';

const PriceComparison = () => {
    const dispatch = useDispatch()
    const averagePrice = useSelector(state => state.avaragePrice.avaragePrice)
    const averagePriceAutoRu = useSelector(state => state.avaragePriceAutoRuReducer.avaragePriceAutoRu)
    const averagePriceDrom = useSelector(state => state.avaragePriceDromReducer.avaragePriceDrom)

    const company = ['Avito', 'Drom', 'AutoRu']

    const [checkedAvito, setCheckedAvito] = useState(true);
    const [checkedDrom, setCheckedDrom] = useState(true);
    const [checkedAutoRu, setCheckedAutoRu] = useState(false);

    const [filters, setFilters] = useState({
        city: '', city2: '', brand: '', model: '', yearFrom: '', yearTo: '', priceFrom: '', priceTo: '', sorting: '', comparison: true, avito: checkedAvito,
        drom: checkedDrom, autoRu: checkedAutoRu
    })
    const [models, setModels] = useState([])
    console.log(filters)



    const deleteAvito = () => {
        console.log("Delete")
        dispatch(deleteAvaragePrice())
    }
    const deleteDrom = () => {
        console.log("Delete")
        dispatch(deleteAvaragePriceDrom())
    }
    const deleteAutoRu = () => {
        console.log("Delete")
        dispatch(deleteAvaragePriceAutoRu())
    }

    const handleChangeAvito = () => {
        setFilters({ ...filters, avito: !checkedAvito })
        setCheckedAvito(!checkedAvito);

    };
    const handleChangeDrom = () => {
        setFilters({ ...filters, drom: !checkedDrom })
        setCheckedDrom(!checkedDrom);
    };
    const handleChangeAutoRu = () => {
        setFilters({ ...filters, autoRu: !checkedAutoRu })
        setCheckedAutoRu(!checkedAutoRu);
    };

    const formingFilters = (event) => {
        if (event.target.name === 'brand') {
            setFilters({ ...filters, [event.target.name]: event.target.value, model: '' })
            console.log(event.target.value)
            const arr = AutoModels.filter(model => model.brand === event.target.value.name)
            setModels(arr)
            console.log(arr)
        }
        else {
            setFilters({ ...filters, [event.target.name]: event.target.value })
        }

    }

    const changeCity = (value) => {
        setFilters({ ...filters, city: value })
    }
    const changeCityTwo = (value) => {
        setFilters({ ...filters, city2: value })
    }

    return (
        <div className='filters'>
            <div className='filters-city'>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name="city"
                    options={cities}
                    sx={{ width: 300 }}
                    onChange={(event, value) => changeCity(value)}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="Город 1" />}
                />
            </div>
            <div className='filters-city'>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name="city2"
                    options={cities}
                    sx={{ width: 300 }}
                    onChange={(event, value) => changeCityTwo(value)}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="Город 2" />}
                />
            </div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Марка</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filters.brand}
                    autoWidth
                    name="brand"
                    label="brand"
                    size="small"
                    onChange={formingFilters}
                >
                    {AutoBrands.map(autoBrand =>
                        <MenuItem value={autoBrand}>{autoBrand.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Модель</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filters.model.model}
                    autoWidth
                    name="model"
                    label="model"
                    size="small"
                    onChange={formingFilters}
                >
                    {models.length > 0 &&
                        models[0].models.map(model =>
                            <MenuItem value={model}>{model.model}</MenuItem>
                        )}
                </Select>
            </FormControl>
            <div className='filters-years'>
                {/* error={yearTo !== '' && (yearFrom > 2022 || yearTo < yearFrom || yearFrom < 1980) */}
                <TextField id="yearFrom" name="yearFrom" label="Год от 1980" variant="outlined" value={filters.yearFrom} size="small" onChange={formingFilters} />
                {/* error={yearTo !== '' && (yearTo > 2022 || yearTo < yearFrom || yearTo < 1980)} */}
                <TextField id="yearto" name="yearTo" label="Год до 2022" variant="outlined" value={filters.yearTo} size="small" onChange={formingFilters} />
            </div>
            <div className='filters-price'>
                <TextField id="priceFrom" name="priceFrom" label="Цена от" variant="outlined" value={filters.priceFrom} size="small" onChange={formingFilters} />
                <TextField id="priceTo" name="priceTo" label="Цена до" variant="outlined" value={filters.priceTo} size="small" onChange={formingFilters} />
            </div>
            <FormGroup aria-label="position" row sx={{ ml: 6 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedAvito}
                            onChange={handleChangeAvito}
                        />}
                    label="Авито"
                    labelPlacement="End"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedDrom}
                            onChange={handleChangeDrom}
                        />}
                    label="Дром"
                    labelPlacement="End"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedAutoRu}
                            onChange={handleChangeAutoRu}
                        />}
                    label="АвтоРу"
                    labelPlacement="End"
                />
            </FormGroup>
            <div>
                <Websocket filters={filters} />
            </div>
            {filters.avito && (
                <div>
                    {averagePrice.length === 2 && (
                        <Button onClick={deleteAvito} >Очистить</Button>
                    )}

                    <ChartsComparison averagePrice={averagePrice} company={company[0]} />
                </div>
            )}
            {filters.drom && (
                <div>
                    {averagePriceDrom.length === 2 && (
                        <Button onClick={deleteDrom} >Очистить</Button>
                    )}
                    <ChartsComparison averagePrice={averagePriceDrom} company={company[1]} />
                </div>
            )}
            {filters.autoRu && (
                <div>
                    {averagePriceAutoRu.length === 2 && (
                        <Button onClick={deleteAutoRu}>Очистить</Button>
                    )}
                    <ChartsComparison averagePrice={averagePriceAutoRu} company={company[2]} />

                </div>
            )}
        </div >
    )
}


export default PriceComparison