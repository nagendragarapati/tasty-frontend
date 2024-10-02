import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DisplayFoodItem from "./displayFoodItem"
import { useSelector } from 'react-redux';
import "./foodBoard.css"


const ratingOptions = ["All", "5 star", "4 star & above", "3 star & above", "2 star & above", "1 star & above"]

export default function FoodBoard() {
    const foodData = useSelector(state => state.restaurantById?.restaurant?.foods)
    const searchRestaurantText = useSelector(state => state.restaurants.restaurantSearchText)
    const [categories, setCategories] = useState([]);
    const [rating, setRating] = useState("All")
    const [veg, setVeg] = useState(false)
    const [seasonal, setSeasonal] = useState(false)
    const [cusine, setCusine] = useState("All")


    useEffect(() => {
        const uniqueCategories = new Set(["All"]);
        foodData?.map(foodItem => {
            if (foodItem?.foodCategory) {
                uniqueCategories.add(foodItem.foodCategory);
            }
        });
        setCategories(Array.from(uniqueCategories));
    }, [foodData]);

    const onChangeVeg = (e) => {
        setVeg(e.target.checked)
    }

    const onChangeSeasonal = (e) => {
        setSeasonal(e.target.checked)
    }

    const filteredFoodItems = foodData.filter(item => {

        let isRatingMatch = true
        let isCusineMatch = true
        let isVegMatch = true
        let isSeasonalMatch = true
        let isSearchTextMatch = true

        if (rating !== "All") {
            isRatingMatch = item.rating >= parseInt(rating.charAt(0))
        }
        if (veg) {
            isVegMatch = item.isVegetarian
        }
        if (seasonal) {
            isSeasonalMatch = item.isSeasonal
        }
        if (cusine !== 'All') {
            isCusineMatch = item.foodCategory === cusine
        }
        if (searchRestaurantText !== "") {
            isSeasonalMatch = item.name.toLowerCase().includes(searchRestaurantText.toLowerCase())
        }

        return isVegMatch && isCusineMatch && isRatingMatch && isSeasonalMatch && isSearchTextMatch

    })


    const displayFoodItems = () =>  (        
        <ul>
            {
                filteredFoodItems?.map(each => <DisplayFoodItem key={each?._id} food={each} />)
            }
        </ul>
    )

    const displayNoFoodScreen = () => (
        <div className='no-food-container'>
            <h1>Ooops...</h1>
            <p>No Items Found</p>
        </div>
    )

    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <div className='filters-main-container'>
                <h1 className='filters-text'>Filters</h1>

                <div className='filters-middle-container'>
                    <div className='filter-grps'>
                        <FormControlLabel
                            control={
                                <Switch checked={veg}
                                    onChange={onChangeVeg} name="veg" />
                            }
                            label="Veg"
                        />
                    </div>
                    <FormControlLabel
                        control={
                            <Switch checked={seasonal}
                                onChange={onChangeSeasonal} name="Seasonal" />
                        }
                        label="Seasonal"
                    />
                    <div className='filter-grps'>
                        <Autocomplete
                            disablePortal
                            value={rating}
                            disableClearable
                            onChange={(event, newValue) => setRating(newValue)}
                            defaultValue="All"
                            options={ratingOptions}
                            sx={{ width: 250 }}
                            renderInput={(params) => <TextField {...params} label="Rating" />}
                        />
                    </div>

                    <div className='filter-grps'>
                        <Autocomplete
                            disablePortal
                            disableClearable
                            value={cusine}
                            onChange={(event, newValue) => setCusine(newValue)}
                            defaultValue="All"
                            options={categories}
                            sx={{ width: 250 }}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                        />
                    </div>

                </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className='foods-container'>
                {
                    filteredFoodItems.length > 0 ? displayFoodItems() : displayNoFoodScreen()
                }

            </div>
        </Box>
    );
}
