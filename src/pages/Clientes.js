import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';


const baseUrl = 'https://localhost:44377/api/Clientes/'

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
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  
    const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    nombreCliente: '',
    contacto:'',
    direccion: '',
    telefono: '',
    email: '',
    proyecto: ''
    })
  
   const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }
    const peticionPost=async()=>{
    await axios.post(baseUrl, consolaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }
const peticionPut=async()=>{
    await axios.put(baseUrl+consolaSeleccionada.nombreCliente, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.nombreCliente===consola.nombreCliente){
          consola.contacto=consolaSeleccionada.contacto;
          consola.direccion=consolaSeleccionada.direccion;
          consola.telefono=consolaSeleccionada.telefono;
          consola.email = consolaSeleccionada.email;
          consola.proyecto=consolaSeleccionada.proyecto;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

    const peticionDelete=async()=>{
    await axios.delete(baseUrl+consolaSeleccionada.nombreCliente)
    .then(response=>{
      setData(data.filter(consola=>consola.nombreCliente!==consolaSeleccionada.nombreCliente));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }
    const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
    const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola=(consola, caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async () => { 
    await peticionGet();
  }, [])
  
    const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Cliente</h3>
      <TextField name="nombreCliente" className={styles.inputMaterial} label="Nombre del cliente" onChange={handleChange}/>
      <br />
      <TextField name="contacto" className={styles.inputMaterial} label="Contacto"  onChange={handleChange}/>
      <br />
      <TextField name="direccion" className={styles.inputMaterial} label="Dirección" onChange={handleChange}/>
      <br />
      <TextField name="telefono" className={styles.inputMaterial} label="Télefono" onChange={handleChange}/>
            <br />
      <TextField name="email" className={styles.inputMaterial} label="E-mail" onChange={handleChange}/>
      <br />
      <TextField name="proyecto" className={styles.inputMaterial} label="Proyecto" onChange={handleChange}/>

        <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

   const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Registro de Cliente</h3>
      <TextField name="nombreCliente" className={styles.inputMaterial} label="Nombre del cliente" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombreCliente}/>
      <br />
      <TextField name="contacto" className={styles.inputMaterial} label="Contacto"  onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.contacto}/>
      <br />
      <TextField name="direccion" className={styles.inputMaterial} label="Dirección" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.direccion}/>
      <br />
      <TextField name="telefono" className={styles.inputMaterial} label="Télefono" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.telefono}/>
            <br />
      <TextField name="email" className={styles.inputMaterial} label="E-mail" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.email}/>
      <br />
      <TextField name="proyecto" className={styles.inputMaterial} label="Proyecto" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.proyecto}/>
     <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

    const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar al cliente: <b>{consolaSeleccionada && consolaSeleccionada.nombreCliente}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )



  return (
    <div className="App">
       <br />
    <Button onClick={()=>abrirCerrarModalInsertar()} >Insertar</Button>
      <br /><br />
      




     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Nombre del cliente</TableCell>
             <TableCell>Contacto</TableCell>
             <TableCell>Dirección</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Proyecto</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map( consola=>(
             <TableRow key={consola.nombreCliente}>
               <TableCell>{consola.nombreCliente}</TableCell>
               <TableCell>{consola.contacto}</TableCell>
               <TableCell>{consola.direccion}</TableCell>
               <TableCell>{consola.telefono}</TableCell>
               <TableCell>{consola.email}</TableCell>
               <TableCell>{consola.proyecto}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
      </TableContainer>
      
           <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>
     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>
     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>




    </div>
  );
}

export default App;
