import React, { useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { requirePropFactory } from "@material-ui/core";

function App() {
  const [roll, getR] = useState("");
  const [result, setRes] = useState([]);
  const [state,setState] = useState(true)

  return (
    <div className="App">
      <header>
        <Paper
          style={{
            padding: "40px",
            textAlign: "center",
            backgroundColor: "black",
          }}
        >
          <h1 style={{ color: "white", fontFamily: "monospace" }}>
            Terribily Tiny Tales
          </h1>
        </Paper>
      </header>
      <center>
        <Paper
          elevation={3}
          style={{ padding: "50px", width: "60%", margin: "40px" }}
        >
          <center>
            <TextField
              id="outlined-basic"
              label="Enter Roll numbers"
              variant="outlined"
              style={{
                width: "60%",
                marginTop: "30px",
                marginLeft: "auto",
                marginRight: "auto",
                
              }}
              onChange={(e) => {
                getR(e.target.value);
              }}
            />
            <br />
            <Button variant="contained"
              style={{marginTop:"20px"}}
              onClick={async () => {
                setState(false)
                fetch("/getresult", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ roll }),
                }).then(async (response) => {
                  let data = await response.json();
                  // console.log("----herr", data);

                  setRes(data);
                  setState(true)
                  // console.log("result", result);
                });
              }}
            >
              send
            </Button>
          </center>
        </Paper>
      </center>
      <center>
        {
          state?
      <TableContainer component={Paper} style={{width:"90%"}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor:"black"}} >
            <TableCell align="left" style={{color:"white"}}>Roll Number</TableCell>
            <TableCell align="left" style={{color:"white"}}>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(result).length !== 0
        ? Object.keys(result).map((e) => {
            return (
              <TableRow>
                <TableCell>{e}</TableCell> 
                <TableCell>{result[e]}</TableCell>
              </TableRow>
            );
          })
        : null}
          
        </TableBody>
      </Table>
    </TableContainer>:
    <Loader
    type="Puff"
    color="#00BFFF"
    height={100}
    width={100}
    timeout={3000} //3 secs
  />
  }  </center>

    </div>
  );
}

export default App;
