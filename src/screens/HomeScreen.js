import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import "./HomeScreen.css"

const HomeScreen = () => {
    const theme = useTheme();

    return (
        <div className="main-home-container">
            <div className='header-container'>
                <h1 className="tasty-logo-text">Tasty</h1>
                <p className='discover-text'>Discover the best food & drinks in your place</p>
                <FormControl variant="outlined" >
                    <OutlinedInput
                        placeholder="Search for the restaurant"
                        id="margin-none"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>

            <div className='two-cards-container'>

                <Link to="/order-online" className='nav-link'>
                    <Card sx={{
                        transition: theme.transitions.create('transform', {
                            duration: theme.transitions.duration.standard,
                        }),
                        '&:hover': {
                            transform: 'scale(1.1)'
                        }, maxWidth: 300
                    }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://res.cloudinary.com/dxww8lp4l/image/upload/v1724945993/online3_y33s9b.webp"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Order Online
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Stay home and order to your doorstep
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>

                <Link to="/admin/create-restaurant" className='nav-link'>
                    <Card sx={{
                        transition: theme.transitions.create('transform', {
                            duration: theme.transitions.duration.standard,
                        }),
                        '&:hover': {
                            transform: 'scale(1.1)'
                        }, maxWidth: 300
                    }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://res.cloudinary.com/dxww8lp4l/image/upload/v1724945081/restaurant_m2kw21.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Create Restaurant
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Add your restaurant to get partner with us
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>

            </div>

        </div>
    )
}

export default HomeScreen