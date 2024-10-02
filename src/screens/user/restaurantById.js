import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRestaurantById } from '../../api/servicecalls';
import { restaurantByIdActions } from '../../store/restaurantByIdSlice';
import NavBar from "../../components/NavBar"
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/spinner';
import Container from '@mui/material/Container';
import { getRatingClr } from '../../components/utils';
import StarsIcon from '@mui/icons-material/Stars';
import RestaurantMenuSharpIcon from '@mui/icons-material/RestaurantMenuSharp';
import Divider from '@mui/material/Divider';
import { Chip, Avatar } from '@mui/material';
import Rating from '@mui/material/Rating';
import FoodBoard from "../../components/foodBoard"



import "./restaurantById.css"

const RestaurantById = () => {
    const { id } = useParams()
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const restaurantData = useSelector(state => state.restaurantById?.restaurant)
    const { name, description, cuisineType, address, rating, images } = restaurantData

    useEffect(() => {
        getRestaurant()
    }, [])

    const getRestaurant = async () => {
        setStatus('PENDING')
        const response = await getRestaurantById(id)
        if (response.status === 200) {
            dispatch(restaurantByIdActions.setRestaurantById(response?.data))
            setStatus("SUCCESS")
        }
        else {
            setError(response?.message)
            setStatus("ERROR")
        }
    }

    const displayRestaurant = () => {
        return (
            <div className='display-restaurant-container'>
                <div className='display-restaurant-middle-container css-1j4hve2'>
                    <div className='img-container'>
                        <img src={images[0]} alt='image' className='restaurant-img' />
                    </div>

                    <div className='resta-text-container'>
                        <div className='name-rating-container'>
                            <h1 className='resbyid-name margin-cls'>{name}</h1>
                            <Rating name="rating" readOnly value={rating} defaultValue={2.5} precision={0.5} />
                        </div>
                        <p className='resbyid-description margin-cls'>{description}</p>

                        <p className='margin-cls'>Cusine Type: <span className='cuisine-text margin-cls'>{cuisineType}</span></p>
                        <p className='margin-cls'>Location: <span className='address-text margin-cls'>{address?.city}</span></p>
                        <p className='address-text margin-cls'>Near to your location...</p>


                    </div>


                </div>

                <div className='menu-text-container'>
                    <Chip
                        avatar={<Avatar><RestaurantMenuSharpIcon className='menu-icon' /></Avatar>}
                        label="Menu" className='menu-text'
                    />
                </div>
                <Divider />

                <div className='food-container'>
                    <FoodBoard />
                </div>
            </div>
        )
    }

    const displayError = () => {
        return (
            <div className='error-main-screen'>
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        )
    }

    const displayLoader = () => (
        <div className='loader-container' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
            <Spinner color={"#105a63"} />
        </div>
    )

    const getRequiredScreen = () => {
        switch (status) {
            case "PENDING":
                return displayLoader()
            case "SUCCESS":
                return displayRestaurant()
            case "ERROR":
                return displayError()
            default:
                return ''
        }
    }


    return (
        <Container fixed className="res-byid-main-container">
            <NavBar />
            {getRequiredScreen()}
        </Container>
    )
}

export default RestaurantById