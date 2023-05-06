import { Helmet } from "react-helmet-async";
import {
    Box,
    Card,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputAdornment, InputLabel, MenuItem, Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Iconify from "../components/iconify";
import { LoadingButton } from "@mui/lab";
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "material-ui-snackbar-provider";
import AppContext from "../context/appContext";
import Network from "../network/Network";
import { useNavigate } from "react-router-dom";

export default function Profile()
{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [company, setCompany] = useState('');
    const [gst, setGst] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [stateIndex, setStateIndex] = useState(-1);
    const [cityIndex, setCityIndex] = useState(-1);
    const [address, setAddress] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [load,setLoad]=useState(false);
    const [user,setUser]=useState();
    const snackBar=useSnackbar();
    const {userId,stateList} = useContext(AppContext);
    const navigate=useNavigate();
    function handleStateSelect(event) {
        console.log('handlestateselect');
        setStateIndex(event.target.value);
    }



    function handleCitySelect(event) {
        setCityIndex(event.target.value);
    }

    async  function handleSubmitClick(event) {
        // console.log(parentId);
        // console.log(userType);
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



        setLoad(true);
        var formData={};
        formData['firstName']=firstName.trim();
        formData['lastName']=lastName.trim();
        formData['userName']=userName.trim();
        formData['password']=password.trim();
        formData['email']=email.trim();
        formData['contact']=contact.trim();
        formData['company']=company.trim();
        if(gst!==undefined&&gst.trim().length>0)
        formData['gst']=gst.trim();
        formData['cityId']=stateList[stateIndex].cities[cityIndex].id;
        if(address!==undefined&&address.trim().length>0)
        formData['address']=address.trim();
        // formData['parentId']=parentId;
        // formData['userType']=userType;
        const resp=await Network.editUser(formData,user.id);
        setLoad(false);
        if(resp['errorCode']==0 && resp['status']==true)
        {
            snackBar.showMessage('Edit Success');
            // onSuccess();
        }
        else{
            snackBar.showMessage(resp['errorDescription']);
            // onClose();
        }


    }

    async function fetchUserDetail()
    {

        const resp=await Network.fetchUserDetail(userId);
        const ur=resp['user'];
        setUser(resp['user']);
        stateList.map((state,index)=>{
            if(state.id===ur.state.id)
            {
                setStateIndex(index);
            }
            state.cities.map((city,ind)=>{
                if(city.id===ur.city.id)
                {
                    setCityIndex(ind);

                }            });
        });
        setFirstName(ur.firstName);
        setLastName(ur.lastName);
        setEmail(ur.email);
        setContact(ur.mobile);
        setCompany(ur.company);
        if(ur.gst!==undefined)
        setGst(ur.gst);
        setUserName(ur.userName);
        setPassword(ur.password);
        if(ur.address!==undefined)
        setAddress(ur.address);


    }

        useEffect(() => {
            console.log(stateList);
            // if(stateList.length<=0)
            // {
            //     navigate("/dashboard/app");
            // }
fetchUserDetail()
        },[]);

    useEffect(()=>{

    },[])

        return (<>
        <Helmet>
            <title> Profile </title>
        </Helmet>

        <Container maxWidth="xl">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>
            </Stack>
        </Container>
                <Card>
                <>
                    <Grid container spacing={4} sx={{padding: '4rem', marginTop: -5}}>
                        <Grid item xs={4}>
                            <TextField fullWidth name="firstName" label="Firstname"
                                       value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}/>

                        </Grid>

                        <Grid item xs={4}>
                            <TextField fullWidth name="lastName" label="Lastname"
                                       value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}/>

                        </Grid>

                        <Grid item xs={4}>
                            <TextField fullWidth name="userName" label="Username"
                                       value={userName}
                                       onChange={(e) => setUserName(e.target.value)}/>

                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
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

                        <Grid item xs={4}>
                            <TextField fullWidth name="email" label="Email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>

                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth name="contact" label="Contact"
                                       value={contact}
                                       onChange={(e) => setContact(e.target.value)}/>

                        </Grid>


                        <Grid item xs={4}>
                            <TextField fullWidth name="company" label="Company"
                                       value={company}

                                       onChange={(e) => setCompany(e.target.value)}/>

                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth name="gst" label="GSTN"
                                       value={gst}
                                       onChange={(e) => setGst(e.target.value)}/>

                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="stateLabel">State</InputLabel>
                                <Select
                                    labelId="stateLabel"
                                    id="stateSelect"
                                    value={stateIndex}
                                    label="State"
                                    onChange={handleStateSelect}
                                    // labelStyle={{color: '#ff0000'}}
                                >
                                    {

                                       stateList.map((state, index) => {

                                            console.log(stateIndex,user,state.id);
                                            // if(stateIndex === undefined && user!==undefined && user.state.id===state.id)
                                            // {
                                            //     console.log('setIndex')
                                            //     setStateIndex(index);
                                            // }
                                            return <MenuItem value={index}> {stateList[index].name}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={4}>
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
                                    stateIndex !== -1 ? stateList[stateIndex].cities.map((city, index) => {
                                            // if (cityIndex === undefined && city.id === user.city.id) {
                                            //     setCityIndex(index);
                                            // }
                                            return <MenuItem
                                                value={index}> {stateList[stateIndex].cities[index].name}</MenuItem>
                                        }) : <div></div>
                                    }

                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={8}>
                            <TextField fullWidth name="address" label="Address"
                                       value={address}
                                       onChange={(e) => setAddress(e.target.value)}/>
                        </Grid>


                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex"
                             justifyContent="center" sx={{padding:'2rem'}}>
                            <LoadingButton  loading={load}  size="large" type="submit" variant="contained" onClick={handleSubmitClick} sx={{minWidth:300}} >
                                Edit
                            </LoadingButton>
                        </Box>

                    </Grid>
                </>


        </Card>
    </>);
}
