import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "./NotFound.css"


const NotFound=()=>{
    const navigate=useNavigate()
    
    const onClickBack=()=>navigate('/order-online',{replace:true})
    
    
    return(
    <div className="not-found-main-container">
        <img src="https://res.cloudinary.com/dxww8lp4l/image/upload/v1725295030/404_tht1tw.webp" alt="not-found-image" className="not-found-image"/>

        <Button className='login-submit' variant="contained" onClick={onClickBack}>Back to Home</Button>
        
    </div>
)}


export default NotFound