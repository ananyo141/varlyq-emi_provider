import { Helmet } from "react-helmet-async";
import {
    Card,
    Container,
    Stack,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import Scrollbar from "../components/scrollbar";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/appContext";
import Network from "../network/Network";
import { useSnackbar } from "material-ui-snackbar-provider";
import Label from "../components/label";

export default function Transactions() {
    const TABLE_HEAD = [
        {id: 'sno', label: 'SNo', alignRight: false},
        {id: 'transactionId', label: 'Transaction ID', alignRight: false},
        {id: 'description', label: 'Description', alignRight: false},
        {id: 'amount', label: 'Amount', alignRight: false},
        {id: 'creditDebit', label: 'Credit/Debit To', alignRight: false},
        {id: 'type', label: 'Transaction Type', alignRight: false},
        {id: 'date', label: 'Date', alignRight: false},
    ];

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [transactions, setTransactions] = useState([]);
    const [count,setCount]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(25);
    const {userId} = useContext(AppContext);
    const snackbar = useSnackbar();

    async function fetchTransactions() {
        const resp = await Network.fetchTransactions(page, pageSize,userId);
        if (resp['errorCode'] == 0 && resp['status'] == true) {
            setTransactions(resp['transactions'])
            setCount(resp['count']);
        }
        else {
            snackbar.showMessage(resp['errorDescription']);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    function handleChangePage(event, newPage) {
        setPage(page);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    return (
        <>
            <Helmet>
                <title> Transactions </title>
            </Helmet>

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Transactions
                    </Typography>
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
                                    {
                                        transactions.map((transaction, index) => {
                                            return <TableRow hover key={index}>
                                                <TableCell align="left">{index + (page * pageSize) + 1}</TableCell>
                                                <TableCell align="left">{transaction.transactionId}</TableCell>

                                                <TableCell align="left">{transaction.description}</TableCell>

                                                <TableCell align="left">{transaction.points}</TableCell>
                                                <TableCell align="left">{transaction.debitCreditUserName}</TableCell>
                                                <TableCell align="left">
                                                    {
                                                        transaction.type === 'credit'?<Label color={'success'}>credit</Label>:<Label color={'error'}>debit</Label>
                                                    }
                                                </TableCell>

                                                <TableCell align="left">{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                                            </TableRow>
                                        })
                                    }
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
        </>
    );
}
