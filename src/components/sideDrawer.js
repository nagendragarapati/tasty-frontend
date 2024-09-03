import * as React from 'react';
import Login from './login';
import Drawer from '@mui/material/Drawer';
import { useSelector ,useDispatch} from 'react-redux';
import { loginActions } from '../store/loginSlice';
import "./sideDrawer.css"


export default function SideDrawer(props) {
    const dispatch=useDispatch()
    const sliderCondition=useSelector(state=>state.login.openSlider)


    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        dispatch(loginActions.setCloseSlider())
    };


    return (
            <React.Fragment>
                <Drawer
                    anchor={'right'}
                    open={sliderCondition}
                    onClose={(e) => toggleDrawer(e)}
                    className='side-drawer'
                >
                    <Login/>
                </Drawer>
            </React.Fragment>
    );
}
