import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SideDrawer from './sideDrawer';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/loginSlice';
import {restaurantsActions} from "../store/allRestaurantsSlice"
import "./NavBar.css"


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create(['width', 'height']),
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
            height: '35px',
            '&:focus': {
                width: '55ch',
                height: '40px',

            },
        },
    },
}));

function HideOnScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children ?? <div />}
        </Slide>
    );
}






export default function HideAppBar(props) {
    const dispatch=useDispatch()
    const openSlider = () => dispatch(loginActions.setOpenSlider())

    const onInputChange = (e) => {
        dispatch(restaurantsActions.setRestaurantSearchText(e.target.value))
    }


    return (
        <HideOnScroll {...props}>
            <AppBar>
                <Container fixed>
                    <div className='nav-container'>
                        <img src="https://res.cloudinary.com/dxww8lp4l/image/upload/v1725000598/DeWatermark.ai_1724654938124-removebg-preview_btkjdi.png" alt='logo' className='tasty-logo' />

                        <div className='seacrh-container'>
                            <Search sx={{ boxShadow: 3 }} className='search-box'>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase className='search-box'
                                    placeholder="Searh for the restaurant or cuisine type"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </Search>
                        </div>
                        <div className='icons-container'>
                            <Badge badgeContent={1} color="secondary">
                                <LocalMallOutlinedIcon className='cart-icon' />
                            </Badge>
                            <Button variant="outlined" className='login-btn' onClick={openSlider}>Login</Button>
                            <SideDrawer />

                        </div></div>
                </Container>
            </AppBar>
        </HideOnScroll>

    );
}


HideOnScroll.propTypes = {
    children: PropTypes.element,
    window: PropTypes.func,
};
