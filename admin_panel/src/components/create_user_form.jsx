import {
    Box,
    Checkbox, FormControl,
    Grid,
    IconButton,
    InputAdornment, InputLabel,
    Link,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import Iconify from "./iconify";
import { LoadingButton } from "@mui/lab";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/appContext";
import { useSnackbar } from "material-ui-snackbar-provider";
import Network from "../network/Network";
import { bool } from "prop-types";

export default function CreateUserForm({parentId,userType,onClose,onSuccess}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [company, setCompany] = useState('');
    const [gst, setGst] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [load,setLoad]=useState(false);
    const snackBar=useSnackbar();
    const {stateList} = useContext(AppContext);

    function handleStateSelect(event) {
        setState(event.target.value);
    }



    function handleCitySelect(event) {
        setCity(event.target.value);
    }

  async  function handleSubmitClick(event) {
        console.log(parentId);
        console.log(userType);
        if(firstName===undefined || firstName.trim().length<=0){
            snackBar.showMessage('Firstname is Required')
            return;
        }

        if(lastName===undefined || lastName.trim().length<=0){
            snackBar.showMessage('Lastname is Required')
            return;
        }
        if(password===undefined || password.trim().length<=0){
            snackBar.showMessage('Password is Required')
            return;
        }
        if(password.trim().length<8){
            snackBar.showMessage('Password should be 8 Characters')
            return;
        }
        if(email===undefined || email.trim().length<=0){
            snackBar.showMessage('Email is Required')
            return;
        }

         if(contact ===undefined || contact.trim().length<=0){
             snackBar.showMessage('Contact is Required')
             return;
      }
         if(contact.trim().length<10){
             snackBar.showMessage('Contact is invalid')
             return;
      }
        if(company ===undefined || company.trim().length<=0){
            snackBar.showMessage('Company is Required')
            return;
        }
        if(city===undefined || city.id===undefined)
        {
            snackBar.showMessage('City is Required')
            return;
        }

        // if(address===undefined || address.trim().length<=0)
        // {
        //     snackBar.showMessage('Address is Required')
        //     return;
        // }


        setLoad(true);
        var formData={};
        formData['firstName']=firstName.trim();
        formData['lastName']=lastName.trim();
        formData['userName']=userName.trim();
        formData['password']=password.trim();
        formData['email']=email.trim();
        formData['contact']=contact.trim();
        formData['company']=company.trim();
        if(gst!==undefined && gst.trim().length>0)
        formData['gst']=gst.trim();
        formData['cityId']=city.id;
        if(address!=undefined && address.trim().length>0)
        formData['address']=address.trim();
        formData['parentId']=parentId;
        formData['userType']=userType;
   const resp=await Network.createUser(formData,parentId);
   setLoad(false);
   if(resp['errorCode']==0 && resp['status']==true)
   {
       snackBar.showMessage('User Created Success');
       onSuccess();
   }
   else{
       snackBar.showMessage(resp['errorDescription']);
       onClose();
   }


    }

    return (
        <>

            <Grid container spacing={4} sx={{padding: '4rem',marginTop:-10}}>
                <Grid item xs={6}>
                    <TextField name="firstName" label="Firstname"
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}/>

                </Grid>

                <Grid item xs={6}>
                    <TextField name="lastName" label="Lastname"
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}/>

                </Grid>

                <Grid item xs={6}>
                    <TextField name="userName" label="Username"
                               value={userName}
                               onChange={(e) => setUserName(e.target.value)}/>

                </Grid>

                <Grid item xs={6}>
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
                </Grid>

                <Grid item xs={6}>
                    <TextField name="email" label="Email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/>

                </Grid>
                <Grid item xs={6}>
                    <TextField name="contact" label="Contact"
                               value={contact}
                               onChange={(e) => setContact(e.target.value)}/>

                </Grid>


                <Grid item xs={6}>
                    <TextField name="company" label="Company"
                               value={company}
                               onChange={(e) => setCompany(e.target.value)}/>

                </Grid>
                <Grid item xs={6}>
                    <TextField name="gst" label="GSTN"
                               value={gst}
                               onChange={(e) => setGst(e.target.value)}/>

                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                    <InputLabel id="stateLabel">State</InputLabel>
                    <Select
                        labelId="stateLabel"
                        id="stateSelect"
                        value={state}
                        label="State"
                        onChange={handleStateSelect}
                        labelStyle={{color: '#ff0000'}}
                    >
                        {
                            stateList.map((state) => {
                                return <MenuItem value={state}>
                                    {state.name}</MenuItem>
                            })
                        }

                    </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                    <InputLabel id="cityLabel">City</InputLabel>
                    <Select
                        labelId="cityLabel"
                        id="citySelect"
                        value={city}
                        label="City"
                        onChange={handleCitySelect}

                    >
                        {
                            state != undefined ? state.cities.map((city) => {
                                return <MenuItem value={city}> {city.name}</MenuItem>
                            }) :<div></div>
                        }

                    </Select>
                    </FormControl>

                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth name="address" label="Address"
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}/>
                </Grid>


            </Grid>

            {/*<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>*/}
            {/*    <Checkbox name="remember" label="Remember me"/>*/}
            {/*    <Link variant="subtitle2" underline="hover">*/}
            {/*        Forgot password?*/}
            {/*    </Link>*/}
            {/*</Stack>*/}
            <Grid item xs={12}>
                <Box display="flex"
                     justifyContent="center" sx={{padding:'2rem',marginTop:-10}}>
                    <LoadingButton  loading={load}  size="large" type="submit" variant="contained" onClick={handleSubmitClick}>
                        Submit
                    </LoadingButton>
                </Box>

            </Grid>
        </>
    );
}
