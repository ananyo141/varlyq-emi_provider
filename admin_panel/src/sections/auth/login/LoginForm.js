import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useSnackbar } from "material-ui-snackbar-provider";
import Network from "../../../network/Network";
import AppContext from "../../../context/appContext";

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const snackbar = useSnackbar();
    const {userId,setUserId ,setUser} = useContext(AppContext);
    const handleClick = async () =>  {

        if(userName===null || userName.trim()==="" || password===null || password.trim()==="")
        {
            snackbar.showMessage(
                'All Fields Are Required');
            return;
        }
       const resp= await Network.login(userName.trim(),password.trim());
        if(resp['errorCode']!==0)
        {
            snackbar.showMessage(
                resp['errorDescription']);
            return;
        }
        setUserId(resp.user.id);
        localStorage.setItem('userId',resp.user.id);
        localStorage.setItem("user",JSON.stringify(resp.user));
        setUser(resp.user);
        navigate('/dashboard', {replace: true});
    };

    return (
        <>
            <Stack spacing={3}>
                <TextField name="email" label="Email address"
                           value={userName}
                           onChange={(e) => setUserName(e.target.value)}/>

                <TextField
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                <Checkbox name="remember" label="Remember me"/>
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Login
            </LoadingButton>
        </>
    );
}
