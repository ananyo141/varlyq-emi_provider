import { Helmet } from 'react-helmet-async';
import { useState, useContext, useEffect } from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Popover,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination, TableHead, Dialog, DialogTitle,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections

import Network from "../network/Network";
import AppContext from "../context/appContext";
import { useSnackbar } from "material-ui-snackbar-provider";
import CreateUserForm from "../components/create_user_form";
import EditUserForm from "../components/edit_user_form";
import TransferPointsForm from "../components/transfer_points_form";
import WithdrawPointsForm from "../components/withdrawal_points_form";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'userName', label: 'UserName', alignRight: false},
    {id: 'admin', label: 'Admin', alignRight: false},
    {id: 'company', label: 'Company', alignRight: false},
    {id: 'balance', label: 'Balance', alignRight: false},
    {id: 'status', label: 'Status', alignRight: false},
    {id: '', label: '', alignRight: false},
];

export default function RetailersPage() {
    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);
    const [users, setUsers] = useState([]);
    const [pageSize, setPageSize] = useState(25);
    const [menuUser, setMenuUser] = useState(null);
    const [newUserDialogOpen, setNewUserdDialogOpen] = useState(false);
    const [editUserDialogOpen, setEditUserdDialogOpen] = useState(false);
    const [transferFormOpen, setTransferFormOpen] = useState(false);
    const [withdrawalFormOpen, setWithdrawalFormOpen] = useState(false);
    const [count, setCount] = useState(0);
    const {userId, user} = useContext(AppContext);
    const snackbar = useSnackbar();

    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleOpenMenu = (event, user) => {
        setMenuUser(user);
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
        setMenuUser(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(event.target.value);
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (!(user.userType !== 'superDistributor' || user.userType !== 'distributor')) {
            navigate('/404');
        }
        fetchRetailers();
    }, [page]);

    async function fetchRetailers() {
        const resp = await Network.fetchUser(userId, 'retailer', page, pageSize);
        if (resp['errorCode'] == 0 && resp['status'] == true) {
            setUsers(resp['users']);
            setCount(resp['count']);
        }
        else {
            snackbar.showMessage(resp['errorDescription']);
        }
    }

    function handleNewClick() {
        setNewUserdDialogOpen(true);
    }

    function handleNewUserDialogClose() {
        setNewUserdDialogOpen(false);
    }

    function onUserSuccess() {
        handleNewUserDialogClose();
        handleEditUserDialogClose();
        setOpen(null);
        setTransferFormOpen(false);
        setWithdrawalFormOpen(false);

        fetchRetailers();
    }

    async function handleBlockClickEdit() {
        if (menuUser === null || menuUser === undefined) {
            return;
        }
        const resp = await Network.blockUnblockUser(menuUser.id);
        setOpen(null);
        fetchRetailers();
    }

    async function handleEditUserClick() {
        setEditUserdDialogOpen(open);
    }

    function handleEditUserDialogClose() {
        setEditUserdDialogOpen(false);
    }

    function handleTransferUserClick() {
        setTransferFormOpen(true);
    }

    function handleWithdrawalUserClick() {
        setWithdrawalFormOpen(true);
    }

    function handleTransferUserDialogClose() {
        setTransferFormOpen(false);
    }

    function handleWithdrawFormClose() {
        setWithdrawalFormOpen(false);
    }

    return (
        <>
            <Helmet>
                <title> Retailers </title>
            </Helmet>

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Retailers
                    </Typography>
                    {user.userType === "distributor" &&
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}
                                onClick={handleNewClick}>
                            New User
                        </Button>}
                </Stack>

                <Card>


                    <Scrollbar>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {TABLE_HEAD.map((headCell) => (
                                            <TableCell
                                                key={headCell.id}
                                                align={headCell.alignRight ? 'right' : 'left'}
                                                // sortDirection={orderBy === headCell.id ? order : false}
                                            >
                                                {headCell.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, index) => {
                                        return <TableRow hover key={index}>
                                            <TableCell component="th" scope="row" padding="none">
                                                <Stack direction="row" alignItems="center" spacing={2} sx={{margin: 2}}>
                                                    <Avatar src={"/assets/images/avatars/avatar_"+(index+1).toString()+".jpg"}/>
                                                    <Typography variant="subtitle2" noWrap>
                                                        {user.firstName} {user.lastName}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left">{user.userName}</TableCell>
                                            <TableCell align="left">{user.admin}</TableCell>

                                            <TableCell align="left">{user.company}</TableCell>

                                            <TableCell align="left">{user.balance}</TableCell>

                                            <TableCell align="left">
                                                <Label
                                                    color={user.status === true ? 'success' : 'error'}>Active</Label>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton size="large" color="inherit"
                                                            onClick={(event) => {handleOpenMenu(event, user)}}>
                                                    <Iconify icon={'eva:more-vertical-fill'}/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    })}

                                </TableBody>


                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[25, 50, 100]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>

            <Dialog open={newUserDialogOpen} onClose={handleNewUserDialogClose}>
                <DialogTitle>Create</DialogTitle>
                <CreateUserForm userType={'retailer'} onClose={handleNewUserDialogClose} onSuccess={onUserSuccess}
                                parentId={userId}/>
            </Dialog>
            <Dialog open={editUserDialogOpen} onClose={handleEditUserDialogClose}>
                <DialogTitle>Edit</DialogTitle>
                <EditUserForm userType={'retailer'} onClose={handleEditUserDialogClose} onSuccess={onUserSuccess}
                              parentId={userId} user={menuUser}/>
            </Dialog>
            <Dialog open={transferFormOpen} onClose={handleTransferUserDialogClose}>
                <DialogTitle>Transfer</DialogTitle>
                <TransferPointsForm parentId={userId} childUser={menuUser} onClose={handleTransferUserDialogClose}
                                    onSuccess={onUserSuccess}/>
            </Dialog>

            <Dialog open={withdrawalFormOpen} onClose={handleWithdrawFormClose}>
                <DialogTitle>Withdraw</DialogTitle>
                <WithdrawPointsForm parentId={userId} childUser={menuUser} onClose={handleWithdrawFormClose}
                                    onSuccess={onUserSuccess}/>
            </Dialog>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={handleEditUserClick}>
                    <Iconify icon={'eva:edit-fill'} sx={{mr: 2}}/>
                    Edit
                </MenuItem>
                {
                    menuUser !== null ? menuUser.parentId === parseInt(userId) ?
                        <><MenuItem onClick={handleTransferUserClick}>
                            <Iconify icon={'eva:corner-down-right-outline'} sx={{mr: 2}}/>
                            Transfer
                        </MenuItem>
                            <MenuItem onClick={handleWithdrawalUserClick}>
                                <Iconify icon={'eva:corner-down-left-outline'} sx={{mr: 2}}/>
                                Withdrawal
                            </MenuItem>
                        </> : <></> : <></>
                }

                {
                    menuUser !== null ? menuUser.status === true ?
                        <MenuItem sx={{color: 'error.main'}} onClick={handleBlockClickEdit}>
                            <Iconify icon={'eva:slash-outline'} sx={{mr: 2}}/>
                            Block
                        </MenuItem> : <MenuItem sx={{color: 'success.main'}} onClick={handleBlockClickEdit}>
                            <Iconify icon={'eva:radio-button-on-outline'} sx={{mr: 2}}/>
                            Unblock
                        </MenuItem> : <></>
                }


            </Popover>
        </>
    );
}


