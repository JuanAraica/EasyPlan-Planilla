import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';


const baseUrl = 'https://localhost:44377/api/Adelanto/'

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
  
    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    idAdelento: '',
    cedulaTra: '',
    monto:'',
    fechaAdelanto: '',
    emisorAdelento: ''
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
    await axios.put(baseUrl+consolaSeleccionada.idAdelento, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.idAdelento===consola.idAdelento){
          consola.cedulaTra=consolaSeleccionada.cedulaTra;
          consola.monto=consolaSeleccionada.monto;
          consola.fechaAdelanto=consolaSeleccionada.fechaAdelanto;
          consola.emisorAdelento = consolaSeleccionada.emisorAdelento;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

    const peticionDelete=async()=>{
    await axios.delete(baseUrl+consolaSeleccionada.idAdelento)
    .then(response=>{
      setData(data.filter(consola=>consola.idAdelento!==consolaSeleccionada.idAdelento));
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
      <h3>Agregar Nuevo Registro</h3>
      <TextField name="cedulaTra" className={styles.inputMaterial} label="Ced. Trabajador " onChange={handleChange}/>
      <br />
      <TextField name="monto" className={styles.inputMaterial} label="Monto"  onChange={handleChange}/>
      <br />
      <TextField name="fechaAdelanto" className={styles.inputMaterial} label="Fecha del prestamo" onChange={handleChange}/>
      <br />
      <TextField name="emisorAdelento" className={styles.inputMaterial} label="Emisor" onChange={handleChange}/>
      

        <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

   const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Registro de Trabajador</h3>
      <TextField name="cedulaTra" className={styles.inputMaterial} label="Ced. Trabajador " onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.cedulaTra}/>
      <br />
      <TextField name="monto" className={styles.inputMaterial} label="Monto"  onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.monto}/>
      <br />
      <TextField name="fechaAdelanto" className={styles.inputMaterial} label="Fecha del prestamo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fechaAdelanto}/>
      <br />
      <TextField name="emisorAdelento" className={styles.inputMaterial} label="Emisor" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.emisorAdelento}/>          <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

    const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el registro <b>{consolaSeleccionada && consolaSeleccionada.idAdelento}</b>  ? </p>
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
            <TableCell>Cedula del Trabajador</TableCell>
            <TableCell>Monto</TableCell>
             <TableCell>Fecha</TableCell>
             <TableCell>Emisor</TableCell>
 
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map( consola=>(
             <TableRow key={consola.idAdelento}>
               <TableCell>{consola.cedulaTra}</TableCell>
               <TableCell>{consola.monto}  </TableCell>
               <TableCell>{consola.fechaAdelanto}</TableCell>
               <TableCell>{consola.emisorAdelento}</TableCell>
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
