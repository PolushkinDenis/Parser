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
import { useLocation, useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Charts from '../Charts/Charts';
import './Filters.css'
import { deleteAvaragePrice } from '../../store/averagePrice';
import { deleteAvaragePriceDrom } from '../../store/avaragePriceDrom';
import { deleteAvaragePriceAutoRu } from '../../store/avaragePriceAutoRu';
import { fetchAvito } from '../../store/asyncActions/avito';
import Websocket from '../Websocket/Websocket';
import AutoList from '../AutoList/AutoList';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import caphca from '../../images/Capcha.png'


const Filters = () => {

  const dispatch = useDispatch()
  const auto = useSelector(state => state.auto)
  const user = useSelector(state => state.user)
  const filtersState = useSelector(state => state.filters)

  console.log(filtersState)
  console.log(user)
  // const averagePrice = useSelector(state => state.avaragePrice)
  // const avaragePriceAutoRuReducer = useSelector(state => state.avaragePriceAutoRuReducer)
  const averagePrice = useSelector(state => state.avaragePrice.avaragePrice)
  const averagePriceAutoRu = useSelector(state => state.avaragePriceAutoRuReducer.avaragePriceAutoRu)
  const averagePriceDrom = useSelector(state => state.avaragePriceDromReducer.avaragePriceDrom)

  const location = useLocation()

  const userFilters = location;

  //  const dataObj =  {
  //     label: "Екатеринбург",
  //     avitoHref: "ekaterinburg",
  //     autoRuHref: "ekaterinburg",
  //     dromHref: "https://ekaterinburg.drom.ru/"
  // }

  // console.log(JSON.stringify(dataObj))
  const [checkedAvito, setCheckedAvito] = useState(true);
  const [checkedDrom, setCheckedDrom] = useState(true);
  const [checkedAutoRu, setCheckedAutoRu] = useState(false);
  const company = ['Avito', 'Drom', 'AutoRu']

  const [filters, setFilters] = useState({
    city: userFilters.state?.city || '', brand: userFilters.state?.brand || '', model: userFilters.state?.model || '',
    yearFrom: userFilters.state?.yearFrom || '', yearTo: userFilters.state?.yearTo || '', priceFrom: userFilters.state?.priceFrom || '',
    priceTo: userFilters.state?.priceTo || '', sorting: userFilters.state?.sorting || '', comparison: false, avito: checkedAvito, drom: checkedDrom,
    autoRu: checkedAutoRu
  })
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

  const addSearch = async (search, site) => {
    try {
      const addSearchUser = await axios.post("http://localhost:5000/api/history/add", {
        userId: user.id,
        filters: filtersState.filters,
        search: search[0],
        site: site
      })
      // console.log(filtersState.filters)
      // console.log(search[0])
      // console.log(site)

    }
    catch (e) {
      console.log("Не удалось добавить результат поиска")
    }
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

  const [models, setModels] = useState([])

  const formingFilters = (event) => {
    if (event.target.name === 'brand') {
      setFilters({ ...filters, [event.target.name]: event.target.value, model: '' })
      const arr = AutoModels.filter(model => model.brand === event.target.value.name)
      setModels(arr)
    }
    else {
      setFilters({ ...filters, [event.target.name]: event.target.value })
    }
  }

  const changeCity = (value) => {
    setFilters({ ...filters, city: value })
  }

  const saveFilters = async () => {
    try {
      const postUserCar = await axios.post("http://localhost:5000/api/filters/add", {
        userId: user.id,
        filters: filters
      })
    }
    catch (e) {
      console.log("Ошибка при добавлении фильтра")
    }
  }


  const searchAuto = () => {
    filters.city === '' && (filters.city = 'samara')
    filters.brand === '' && (filters.brand = 'bmw')
    filters.model === '' && (filters.model = '')
    filters.yearFrom === '' && (filters.yearFrom = '1990')
    filters.yearTo === '' && (filters.yearTo = '2002')
    filters.priceFrom === '' && (filters.priceFrom = '100000')
    filters.priceTo === '' && (filters.priceTo = '500000')
    filters.sorting === '' && (filters.sorting = '')
    dispatch(fetchAvito(filters))
  }

  return (
    <div className='filters-content'>
      <div className='filters'>
        <div className='filters-city'>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="city"
            defaultValue={filters.city}
            options={cities}
            sx={{ width: 300 }}
            onChange={(event, value) => changeCity(value)}
            size="small"
            renderInput={(params) => <TextField {...params} label="Город" />}
          />
        </div>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Марка</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            displayEmpty
            // defaultValue={filters.brand?.name}
            value={filters.brand.name}
            autoWidth
            name="brand"
            label="brand"
            size="small"
            onChange={formingFilters}
          >
            {AutoBrands.map(autoBrand =>
              <MenuItem value={autoBrand} >{autoBrand.name}</MenuItem>
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
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="sorting-simple-select-label">Сортировка</InputLabel>
          <Select
            labelId="sorting-simple-select-label"
            id="sorting-simple-select"
            value={filters.sorting}
            autoWidth
            name="sorting"
            label="sorting"
            size="small"
            onChange={formingFilters}
          >
            {sortings.map(sort =>
              <MenuItem value={sort}>{sort.label}</MenuItem>
            )}
          </Select>
        </FormControl>
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

        <div className='filters-search'>
          {user.id && (
            <Button onClick={saveFilters}>Сохранить фильтры</Button>
          )}
        </div>
        <div>

          <Websocket filters={filters} />
        </div>
      </div>
      <div>
        {(averagePriceDrom.length > 0 || averagePrice.length > 0 || averagePriceAutoRu.length > 0) && (
          < Accordion sx={{ mt: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Статистика</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {filters.avito && (
                <div>
                  {averagePrice.length > 0 && (
                    <div>
                      <div>
                        <Button onClick={deleteAvito} >Очистить</Button>
                        {user.id && (
                          <Button onClick={() => addSearch(averagePrice, company[0])} >Сохранить поиск</Button>
                        )}
                      </div>
                      <Charts averagePrice={averagePrice} company={company[0]} />
                    </div>
                  )}
                </div>
              )}
              {filters.drom && (
                <div>
                  {averagePriceDrom.length > 0 && (
                    <div>
                      <div>
                        <Button onClick={deleteDrom} >Очистить</Button>
                        {user.id && (
                          <Button onClick={() => addSearch(averagePriceDrom, company[1])} >Сохранить поиск</Button>
                        )}
                      </div>

                      <Charts averagePrice={averagePriceDrom} company={company[1]} />
                    </div>
                  )}
                </div>
              )}
              {filters.autoRu && (
                <div>
                  {averagePriceAutoRu.length > 2 && (
                    <div>
                      <div>
                        <Button onClick={deleteAutoRu}>Очистить</Button>
                        {user.id && (
                          <Button onClick={() => addSearch(averagePriceAutoRu, company[2])} >Сохранить поиск</Button>
                        )}
                      </div>

                      <Charts averagePrice={averagePriceAutoRu} company={company[2]} />
                    </div>
                  )}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        )}
        <AutoList />

      </div>


    </div >
  )
}


export default Filters