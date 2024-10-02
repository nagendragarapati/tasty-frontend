import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getRatingClr } from './utils';
import StarsIcon from '@mui/icons-material/Stars';



import { loginActions } from '../store/loginSlice';

import "./restaurantCard.css"


const RestaurantCard = ({ restaurant }) => {
    const { images, name, rating, address, cuisineType, _id } = restaurant
    const [isFavorite, setIsFavorite] = useState(false);

    const dispatch = useDispatch()
    const openSlider = () => dispatch(loginActions.setOpenSlider())

    const handleFavoriteClick = (event) => {
        event.preventDefault()
        setIsFavorite(!isFavorite);
        openSlider()

    };



    return (
        <li className="res-card-main-container" >
            <Link to={!isFavorite && `/order-online/${_id}`} className='item-link'>
                <div className='image-fav-container'>
                    <img src={images[0]} alt={`${name}-img`} className="restaurant-main-img" />
                    <div className='fav-icon-container'>
                        <FavoriteBorderRoundedIcon className='fav-icon' onClick={handleFavoriteClick}/>
                        {/* <FavoriteRoundedIcon className='fav-icon'  color='error'/> */}
                    </div>
                </div>
                <div className='card-text-container'>
                    <div className="name-rating-container">
                        <p className="res-name">{name}</p>
                        <div className="rating-icon-container">
                            <div className='rating-container'>
                                <p className='rating-text'>{rating}</p>
                                <StarsIcon color={`${getRatingClr(rating)}`} className='rating-icon'/>
                            </div>
                        </div>
                    </div>
                    <p className='cuisine-text'>{cuisineType}</p>
                    <p className='address-text'>{address?.city}</p>
                </div>
            </Link>
        </li>

    )
}

export default RestaurantCard