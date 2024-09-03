import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import StarsIcon from '@mui/icons-material/Stars';

import "./restaurantCard.css"


const RestaurantCard = ({ restaurant }) => {
    const { images, name, rating, address, cuisineType } = restaurant

    const getRatingClr = () => {
        let ratingClass;
        switch (true) {
            case rating >= 4:
                ratingClass = "success";
                break;
            case rating >= 3 && rating < 4:
                ratingClass = "warning";
                break;
            case rating < 3:
                ratingClass = "error";
                break;
            default:
                ratingClass = "";
        }
        return ratingClass;
    };


    return (
        <li className="res-card-main-container" >
            <div className='image-fav-container'>
                <img src={images[0]} alt={`${name}-img`} className="restaurant-main-img" />
                <div className='fav-icon-container'>
                    <FavoriteBorderRoundedIcon className='fav-icon' />
                    {/* <FavoriteRoundedIcon  color='error'/> */}
                </div>
            </div>
            <div className='card-text-container'>
                <div className="name-rating-container">
                    <p className="res-name">{name}</p>
                    <div className="rating-icon-container">
                        <div className='rating-container'>
                            <p className='rating-text'>{rating}</p>
                            <StarsIcon color={`${getRatingClr()}`} />
                        </div>
                    </div>
                </div>
                <p className='cuisine-text'>{cuisineType}</p>
                <p className='address-text'>{address?.city}</p>
            </div>
        </li>
    )
}

export default RestaurantCard