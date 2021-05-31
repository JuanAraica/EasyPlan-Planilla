import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';


const baseUrl = 'https://localhost:44377/api/Historial/'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function App() {
const styles= useStyles();
  const [data, setData] = useState([]);
 
 
  
 

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }
   

  useEffect(async () => { 
    await peticionGet();
  }, [])
  
  return (
    <div className="App">
       <br />
  
      <br /><br />
      <br /><br />
      




     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
           
             <TableCell align="center"> <strong>Historiacos del programas</strong></TableCell>

           </TableRow>
         </TableHead>

         <TableBody>
           {data.map( consola=>(
             <TableRow key={consola.idRegistro}>
               <TableCell>{consola.registro}</TableCell>
 
             </TableRow>
           ))}
         </TableBody>
       </Table>
      </TableContainer>
      
 



    </div>
  );
}

export default App;
