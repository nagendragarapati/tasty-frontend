import { useState } from 'react';
import { useDispatch} from 'react-redux';

import FormControl from '@mui/material/FormControl';
import { FormLabel } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { signUp } from '../api/servicecalls';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/loginSlice';
import Spinner from './spinner';
import Cookies from 'js-cookie'


import "./login.css"

const defaultFormValues = {
    name: '',
    email: '',
    password: ''
}

const Login = () => {
    const [signUpClicked, setSignUpClicked] = useState(false)
    const [formValues, setFormValues] = useState(defaultFormValues)
    const [submitClicked, setSubmitClicked] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setLoading] = useState(false)
    const SubmitText = "Submit"
    const dispatch=useDispatch()
    const navigate = useNavigate();


    const onInputChange = (e, formKey) => {
        setFormValues((pre) => ({ ...pre, [formKey]: e.target.value }))
    }

    const location = useLocation();

    const userRoute = location.pathname.includes('order-online')

    const onSubmitForm = async () => {
        setSubmitClicked(true)
        const { name, email, password } = formValues

        if (signUpClicked) {

            const userData = {
                fullName: name,
                email,
                password,
                role: userRoute ? "ROLE_CUSTOMER" : "ROLE_ADMIN",
                status: ""
            }
            if (name && email && password) {
                setLoading(true)
                const response = await signUp(userData)
                console.log("res",response)
                if (response?.status === 201) {
                    Cookies.set('jwt_token', response.data.token, {expires: 30})
                    navigate(location.pathname)
                    dispatch(loginActions.setCloseSlider())
                }
                else {
                    setErrorMsg(response.data.message)
                }
                setLoading(false)
                setFormValues(defaultFormValues)
                setSubmitClicked(false)
            }
        }
        else {
            if (email && password) {
                setFormValues(defaultFormValues)
                alert('logging')
                setSubmitClicked(false)


            }
        }


    }

    const displayLoader = () => (
        <div className='loader-container'>
            <Spinner color={"#fff"} />
        </div>
    )



    return (
        <div className="login-main-container">

            <div className="login-middle-container">
                <div className="login-text-container">
                    <h1 className='login-text'>{signUpClicked ? 'Signup' : 'Login'}</h1>

                    <p>or
                        {signUpClicked ?
                            <span className='account-text' onClick={() => setSignUpClicked(false)}> Login to your account</span> :
                            <span className='account-text' onClick={() => setSignUpClicked(true)}> create an account</span>}
                    </p>
                </div>

                <div className="form-container">

                    {
                        signUpClicked && <FormControl className='form-control-input'>
                            <InputLabel htmlFor="component-outlined">Name</InputLabel>
                            <OutlinedInput
                                id="component-outlined-name"
                                label="Name"
                                placeholder="Enter FullName"
                                type="text"
                                className='form-input'
                                error={submitClicked && formValues.name === ''}
                                value={formValues.name}
                                onChange={(e) => onInputChange(e, 'name')}
                            />

                        </FormControl>
                    }
                    <FormControl className='form-control-input'>
                        <InputLabel htmlFor="component-outlined">Email</InputLabel>
                        <OutlinedInput
                            id="component-outlined-email"
                            label="Email"
                            placeholder="Enter Email"
                            type="text"
                            className='form-input'
                            value={formValues.email}
                            error={submitClicked && formValues.email === ''}
                            onChange={(e) => onInputChange(e, 'email')} />
                    </FormControl>

                    <FormControl className='form-control-input'>
                        <InputLabel htmlFor="component-outlined">Password</InputLabel>
                        <OutlinedInput
                            id="component-outlined-pass"
                            label="Password"
                            placeholder="Enter Password"
                            type="password"
                            className='form-input'
                            value={formValues.password}
                            error={submitClicked && formValues.password === ''}
                            onChange={(e) => onInputChange(e, 'password')} />
                    </FormControl>

                    {errorMsg && <FormLabel error>{errorMsg}</FormLabel>}

                    <Button variant="contained" className='login-submit' onClick={onSubmitForm}>{isLoading ? displayLoader() : SubmitText}</Button>
                </div>
            </div>

        </div>

    )
}

export default Login