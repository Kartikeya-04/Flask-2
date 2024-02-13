import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

//data
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'Location', minWidth: 100 },
  {
    id: 'population',
    label: 'Time',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];
function createData(name, code, population) {
  // const density = population / size;
  return { name, code, population };
}

function Home() {
  const [first, setFirst] = useState({ Name: '', Location: '' });
  const [users, setusers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const User = (e) => {
    e.preventDefault();
    setFirst({ ...first, Name: e.target.value });
  };

  const UserPass = (e) => {
    e.preventDefault();
    setFirst({ ...first, Location: e.target.value });
  };

  const getUser = async () => {
    console.log(first);
    try {
      const response = await fetch('http://127.0.0.1:8325/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(first),
      });
      const data = await response.json();
      // const data = response;
      console.log(data);
      // setusers(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  //delete User
  const delUser = () => {
    navigate('./delete');
  };
  //update
  const updateUser = () => {
    navigate('./update');
  };
  // const displayUser = async () => {
  //   const response = await fetch('http://localhost:8325/display', {
  //     method: 'GET',
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   setusers(data);
  // };

  const showUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8325/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // console.log(data);
      setusers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //material ui
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let rows = [];

  for (let i = 0; i < users.length; i++) {
    // createData(users[i].Name,users[i].Location)
    rows.push(createData(users[i].Name, users[i].Location, users[i].Time));
  }

  //material ui
  useEffect(() => {
    showUser();
  }, []);

  useEffect(() => {
    // Simulate an asynchronous operation
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    // Cleanup function
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="allhome">
      <Navbar />
      {isLoading && (
        <div className="flex h-screen w-screen justify-center items-center">
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="primary" />
            {/* <CircularProgress color="success" /> */}
            {/* <CircularProgress color="inherit" /> */}
          </Stack>
        </div>
      )}
      {!isLoading && (
        <div className="flex h-screen w-screen justify-center items-center flex-col gap-8">
          {/* <div className="homep"> */}
          <div>
            <h1 className="font-extrabold">Form </h1>
          </div>
          <div>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="filled-textarea"
                label="Name"
                placeholder="Placeholder"
                multiline
                variant="filled"
                onChange={User}
              />
              <TextField
                id="filled-textarea"
                label="Location"
                placeholder="Placeholder"
                multiline
                variant="filled"
                onChange={UserPass}
              />
            </Box>
            <div className="flex justify-center m-4 gap-10">
              <Stack direction="row" spacing={2}>
                <Button
                  color="secondary"
                  onClick={updateUser}
                  className="p-16 w-20 h-14"
                >
                  UPDATE
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={getUser}
                  className="p-16 w-20"
                >
                  ADD
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={delUser}
                  className="p-16 h-14 w-20"
                >
                  DELETE
                </Button>
              </Stack>
            </div>
          </div>
          <div className="paper">
            {/* try table start */}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      )}
      <Footer />
    </div>
    // </div>
  );
}

export default Home;
