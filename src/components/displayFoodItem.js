import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { Button } from '@mui/material';
import { getRatingClr } from './utils';
import StarsIcon from '@mui/icons-material/Stars';
import "./displayFoodItem.css"

export default function DisplayFoodItem(props) {

  const { food } = props
  const { name, description, price, foodCategory, rating, images, ingredients,isSeasonal,isVegetarian } = food



  return (
    <div className='acc-item'>
      <Accordion defaultExpanded onChange={''}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className='food-header'>
            <Typography className='food-name-text'>
              {name}
            </Typography>
            <p className='seasonal-text'>{isSeasonal && "Seasonal"}</p>
            <div className='rating-container'>
              <p className='rating-text'>{rating}</p>
              <StarsIcon color={`${getRatingClr(rating)}`} className='rating-icon' />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='text-details'>
            <div className='price-container'>
              <CurrencyRupeeRoundedIcon className='rupee-icon' />
              <p className='margin-none price-text'>{price}</p>
            </div>

            <p className='margin-none category-text food-category cuisine-text '>Category: <span className='black-text'>{foodCategory}</span></p>
            <p className='margin-none category-text cuisine-text '>Ingredients: <span className='black-text'>{ingredients?.join(',')}</span></p>

            <p className='vegetarian-text'>{isVegetarian && "Vegetarian"}</p>
            <p className='margin-none category-text desc-text'>{description}</p>
          </div>

          <div className='image-details'>

            <img src={images[0]} alt='image' className='food-img' />
            <Button variant="contained" className='add-btn'>Add</Button>

          </div>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}
