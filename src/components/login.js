import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import "./login.css"


const Login = () => {
    const [signUpClicked, setSignUpClicked] = useState(false)


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
                                id="component-outlined"
                                label="Name"
                                placeholder="Enter FullName"
                                type="text"
                                className='form-input' />
                        </FormControl>
                    }
                    <FormControl className='form-control-input'>
                        <InputLabel htmlFor="component-outlined">Email</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            label="Email"
                            placeholder="Enter Email"
                            type="text"
                            className='form-input' />
                    </FormControl>

                    <FormControl className='form-control-input'>
                        <InputLabel htmlFor="component-outlined">Password</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            label="Password"
                            placeholder="Enter Password"
                            type="password"
                            className='form-input' />
                    </FormControl>

                    <Button variant="contained" className='login-submit'>Submit</Button>
                </div>
            </div>

        </div>

    )
}

export default Login