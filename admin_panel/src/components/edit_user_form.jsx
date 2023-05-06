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

export default function EditUserForm({parentId,userType,onClose,onSuccess,user}) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [contact, setContact] = useState(user.mobile);
    const [company, setCompany] = useState(user.company);
    const [gst, setGst] = useState(user.gstn);
    const [userName, setUserName] = useState(user.userName);
    const [password, setPassword] = useState(user.password);
    const [stateIndex, setStateIndex] = useState();
    const [cityIndex, setCityIndex] = useState();
    const [address, setAddress] = useState(user.address);
    const [showPassword, setShowPassword] = useState(true);
    const [load,setLoad]=useState(false);
    const snackBar=useSnackbar();
    const {stateList} = useContext(AppContext);

    function handleStateSelect(event) {
        setStateIndex(event.target.value);
    }



    function handleCitySelect(event) {
        setCityIndex(event.target.value);
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
        if(cityIndex===undefined )
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
        formData['cityId']=stateList[stateIndex].cities[cityIndex].id;
      if(address!==undefined && address.trim().length>0)
        formData['address']=address.trim();
        formData['parentId']=parentId;
        formData['userType']=userType;
   const resp=await Network.editUser(formData,user.id);
   setLoad(false);
   if(resp['errorCode']==0 && resp['status']==true)
   {
       snackBar.showMessage('Edit Success');
       onSuccess();
   }
   else{
       snackBar.showMessage(resp['errorDescription']);
       onClose();
   }


    }
    //
    // useEffect(() => {
    //     stateList.map(st =>{
    //         if(st.id===user.state.id)
    //         {
    //             setState(st);
    //             st.cities.map(cit=>{
    //                 if(cit.id===user.city.id)
    //                 {
    //                     setCity(cit);
    //                 }
    //             });
    //         }
    //     });
    // },[]);

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
                        defaultValue={user.state}
                        value={stateIndex}
                        label="State"
                        onChange={handleStateSelect}
                        labelStyle={{color: '#ff0000'}}
                    >
                        {

                            stateList.map((state,index) => {
                                if(stateIndex===undefined && user.state.id==state.id)
                                {
                                    setStateIndex(index);
                                }
                                return <MenuItem value={index}> {stateList[index].name}</MenuItem>
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
                        value={cityIndex}
                        label="City"
                        onChange={handleCitySelect}

                    >
                        {
                            stateIndex !== undefined ? stateList[stateIndex].cities.map((city,index) => {
                                if(cityIndex===undefined && city.id===user.city.id)
                                {
                                    setCityIndex(index);
                                }
                                return <MenuItem value={index}> {stateList[stateIndex].cities[index].name}</MenuItem>
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
