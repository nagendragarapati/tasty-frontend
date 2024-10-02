import Container from '@mui/material/Container';
import NavBar from "../../components/NavBar"
import RenderGallery from "../../components/renderGallery"
import SideDrawer from '../../components/sideDrawer';
import { getAllRestaurants } from '../../api/servicecalls';
import { useDispatch, useSelector } from 'react-redux';
import { restaurantsActions } from "../../store/allRestaurantsSlice"
import { loginActions } from '../../store/loginSlice';
import { useEffect, useState } from 'react';
import RestaurantsSkeleton from "../../components/restaurantsSkeleton"
import RestaurantCard from '../../components/restaurantCard';
import "./restaurants.css"


const galleryImgList = [
    {
        id: 1,
        url: "https://b.zmtcdn.com/data/o2_assets/37df381734b24f138af4a84fd7e4d4ec1716558578.jpeg",
        foodName: "Biryani"
    },
    {
        id: 2,
        url: "https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png",
        foodName: "Chicken"
    },
    {
        id: 3,
        url: "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
        foodName: "Pizza"
    },
    {
        id: 4,
        url: "https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png",
        foodName: "Dosa"
    },
    {
        id: 5,
        url: "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png",
        foodName: "Thali"
    },
    {
        id: 6,
        url: "https://b.zmtcdn.com/data/o2_assets/e444ade83eb22360b6ca79e6e777955f1632716661.png",
        foodName: "Fried Rice"
    },
    {
        id: 7,
        url: "https://b.zmtcdn.com/data/o2_assets/019409fe8f838312214d9211be010ef31678798444.jpeg",
        foodName: "North Indian"
    },
    {
        id: 8,
        url: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
        foodName: "Burger"
    },
    {
        id: 9,
        url: "https://b.zmtcdn.com/data/o2_assets/2b5a5b533473aada22015966f668e30e1633434990.png",
        foodName: "Paratha"
    },
    {
        id: 10,
        url: "https://b.zmtcdn.com/data/dish_images/d9766dd91cd75416f4f65cf286ca84331634805483.png",
        foodName: "Idli"
    },
    {
        id: 10,
        url: "https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png",
        foodName: "Noodles"
    },
    {
        id: 12,
        url: "https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png",
        foodName: "Cake"
    },

]


const Restaurants = () => {
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')
    const [rating, setRating] = useState(1.0)
    const dispatch = useDispatch()
    const allRestaurants = useSelector(state => state.restaurants?.restaurants)
    const searchRestaurantText = useSelector(state => state.restaurants.restaurantSearchText)
    // const openSlider=()=>dispatch(loginActions.setOpenSlider())

    useEffect(() => {
        getRestaurants()
    }, [])

    const getRestaurants = async () => {
        setStatus("PENDING")
        const response = await getAllRestaurants()
        if (response.status === 200) {
            dispatch(restaurantsActions.setRestaurants(response?.data))
            setStatus("SUCCESS")
        }
        else {
            setError(response?.message)
            setStatus("ERROR")
        }
    }

    const filteredRestaurantsList = allRestaurants?.filter(each => {
        if ((each.name.toLowerCase().includes(searchRestaurantText.toLowerCase()) || each.cuisineType.toLowerCase().includes(searchRestaurantText.toLowerCase())) && each.rating >= rating) {
            return each
        }
    })

    const displayRestaurants = () => {
        return (
            <div>
                {
                    filteredRestaurantsList?.length > 0 ? <ul className='restaurants-list-conatiner'>{filteredRestaurantsList?.map(each => <RestaurantCard key={each._id} restaurant={each} />)}</ul> : <h1 className='no-res-found'>No Restaurants Found</h1>
                }

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

    const getRequiredScreen = () => {
        switch (status) {
            case "PENDING":
                return <RestaurantsSkeleton />
            case "SUCCESS":
                return displayRestaurants()
            case "ERROR":
                return displayError()
            default:
                return ''
        }
    }

    return (
        <Container fixed className='restaurants-main-container'>
            <NavBar />
            {getRequiredScreen()}
            <SideDrawer />
        </Container>
    )
}



export default Restaurants