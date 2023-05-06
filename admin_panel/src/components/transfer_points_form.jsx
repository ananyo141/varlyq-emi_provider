import { Box, Button, CircularProgress, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Label from "./label";
import Network from "../network/Network";
import { useSnackbar } from "material-ui-snackbar-provider";

export default function TransferPointsForm({parentId,childUser,onClose,onSuccess})
{
    const [points,setPoints]=useState(10);
    // const [load,setLoad]=useState(false);
    const [description,setDescription]=useState();
    const [userLoad,setUserLoad]=useState(true);
    const [buttonLoad,setButtonLoad]=useState(false);
    const [user,setUser]=useState();
    const snackbar=useSnackbar();
    async function handleTransferClick() {
        if(description==undefined || description.trim().length<=0)
        {
            snackbar.showMessage('Description is required');
            return;
        }
        if(points>user.balance)
        {
            snackbar.showMessage("Insufficient balance");
            return;
        }
        setButtonLoad(true);
    var resp=await Network.transferPoints(parentId,childUser.id,description,points);
        if(resp['errorCode']==0 && resp['status']==true)
        {
            onSuccess();
        }
        else{
            snackbar.showMessage(resp['errorDescription']);
            onClose();

        }
        setButtonLoad(false);
    }
    useEffect(() => {
        fetchUserDetail();
    },[]);
    async function fetchUserDetail()
    {
        setUserLoad(true);
        const resp=await Network.fetchUserDetail(parentId);
        setUserLoad(false);
        setUser(resp['user']);
    }

    return(
        <>
            {userLoad?<Grid container spacing={4} sx={{margin:5,justifyContent:'center',width:300}}><CircularProgress /></Grid>:<Grid container spacing={4} sx={{marginTop:0,justifyContent:'center'}}>

                <Grid item xs={8}>
                    <Stack direction={"column"}>
                        <Box display="grid"
                             justifyContent="start" marginLeft={-2.5} marginTop={-3} marginBottom={2}>
                            <Label
                                color={'success'} >Available Balance - {user.balance}</Label>
                        </Box>
                        <Box display="grid"
                             justifyContent="center">
                            <TextField  type={"number"} sx={{minWidth:300}}
                                        name="points" label="Points"
                                        value={points}
                                        onChange={(e)=> {
                                            if(e.target.value>=user.balance)
                                        {
                                            setPoints(user.balance);
                                        } else if(e.target.value<=0)
                                            {
                                                setPoints(1);
                                            }
                                        else{
                                            setPoints(e.target.value)
                                        }
                                            }}/>
                        </Box>
                        <Box display="grid"
                             justifyContent="center" marginTop={2}>
                            <TextField  type={"text"} sx={{minWidth:300}}
                                        name="description" label="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}/>
                        </Box>
                    </Stack>

                </Grid>
                <Grid item xs={8}>

                    <Box display="grid"
                         justifyContent="end" marginBottom={1}>
                        <Stack direction={"row"} marginX={-5}>
                            <Button   size="large"  onClick={()=>{onClose()}}>
                                Cancel
                            </Button>
                            <LoadingButton  loading={buttonLoad}  size="large"   onClick={handleTransferClick}>
                                Transfer
                            </LoadingButton>
                        </Stack>

                    </Box>

                </Grid>
                {/*<Grid item xs={10}>*/}
                {/*    <Box display="grid"*/}
                {/*         justifyContent="end" marginBottom={1}>*/}

                {/*    </Box>*/}

                {/*</Grid>*/}
            </Grid>}
            </>
    );
}
