import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';


const baseUrl = 'https://localhost:44377/api/Trabajador/'

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
    cedulaTra: '',
    nombre:'',
    apellido: '',
    puesto: '',
    edad: '',
    telefono: '',
    correo:'',
    fechaNacimiento: '',
    nacionalidad: '',
    ciudad: '',
    direccion:'',
    fechaEmpleo: '',
    empleador: '',
    fechaDespido: '',
    inicioIncapacidad:'',
    finalIncapacidad: '',
    padecimientos: '',
    estado: '',
    observacion: ''
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
    await axios.put(baseUrl+consolaSeleccionada.cedulaTra, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.cedulaTra===consola.cedulaTra){
          consola.nombre=consolaSeleccionada.nombre;
          consola.apellido=consolaSeleccionada.apellido;
          consola.puesto=consolaSeleccionada.puesto;
          consola.edad = consolaSeleccionada.edad;
            consola.telefono = consolaSeleccionada.telefono;
                      consola.correo=consolaSeleccionada.correo;
          consola.fechaNacimiento=consolaSeleccionada.fechaNacimiento;
            consola.ciudad = consolaSeleccionada.ciudad;
            consola.nacionalidad=consolaSeleccionada.nacionalidad;
          consola.direccion = consolaSeleccionada.direccion;
            consola.fechaEmpleo = consolaSeleccionada.proyecfechaEmpleoto;
                      consola.empleador=consolaSeleccionada.empleador;
          consola.fechaDespido=consolaSeleccionada.fechaDespido;
          consola.inicioIncapacidad=consolaSeleccionada.inicioIncapacidad;
          consola.finalIncapacidad = consolaSeleccionada.finalIncapacidad;
            consola.padecimientos = consolaSeleccionada.padecimientos;
            consola.estado = consolaSeleccionada.estado;
            consola.observacion=consolaSeleccionada.observacion;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

    const peticionDelete=async()=>{
    await axios.delete(baseUrl+consolaSeleccionada.cedulaTra)
    .then(response=>{
      setData(data.filter(consola=>consola.cedulaTra!==consolaSeleccionada.cedulaTra));
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
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre " onChange={handleChange}/>
      <br />
      <TextField name="apellido" className={styles.inputMaterial} label="Apellido"  onChange={handleChange}/>
      <br />
      <TextField name="puesto" className={styles.inputMaterial} label="Puesto" onChange={handleChange}/>
      <br />
      <TextField name="edad" className={styles.inputMaterial} label="Edad" onChange={handleChange}/>
            <br />
      <TextField name="telefono" className={styles.inputMaterial} label="Télefono" onChange={handleChange}/>
      <br />
      <TextField name="correo" className={styles.inputMaterial} label="E-mail" onChange={handleChange}/>
      <br />
      <TextField name="fechaNacimiento" className={styles.inputMaterial} label="Fecha de Nacimiento"  onChange={handleChange}/>
      <br />
      <TextField name="nacionalidad" className={styles.inputMaterial} label="Nacionalidad" onChange={handleChange}/>
      <br />
      <TextField name="ciudad" className={styles.inputMaterial} label="Ciudad" onChange={handleChange}/>
            <br />
      <TextField name="direccion" className={styles.inputMaterial} label="Dirección" onChange={handleChange}/>
      <br />
      <TextField name="fechaEmpleo" className={styles.inputMaterial} label="Fecha de empleo" onChange={handleChange}/>
      <br />
      <TextField name="empleador" className={styles.inputMaterial} label="Contratador" onChange={handleChange}/>
      <br />
      <TextField name="padecimientos" className={styles.inputMaterial} label="Padecimientos" onChange={handleChange}/>
      <br />
      <TextField name="estado" className={styles.inputMaterial} label="Estado" onChange={handleChange}/>
      <br />
      <TextField name="observacion" className={styles.inputMaterial} label="Observación" onChange={handleChange}/>

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
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre " onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombre}/>
      <br />
      <TextField name="apellido" className={styles.inputMaterial} label="Apellido"  onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellido}/>
      <br />
      <TextField name="puesto" className={styles.inputMaterial} label="Puesto" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.puesto}/>
      <br />
      <TextField name="edad" className={styles.inputMaterial} label="Edad" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.edad}/>
            <br />
      <TextField name="telefono" className={styles.inputMaterial} label="Télefono" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.telefono}/>
      <br />
      <TextField name="correo" className={styles.inputMaterial} label="E-mail" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.correo}/>
      <br />
      <TextField name="fechaNacimiento" className={styles.inputMaterial} label="Fecha de Nacimiento"  onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fechaNacimiento}/>
      <br />
      <TextField name="nacionalidad" className={styles.inputMaterial} label="Nacionalidad" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nacionalidad}/>
      <br />
      <TextField name="ciudad" className={styles.inputMaterial} label="Ciudad" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.ciudad}/>
            <br />
      <TextField name="direccion" className={styles.inputMaterial} label="Dirección" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.direccion}/>
      <br />
      <TextField name="fechaEmpleo" className={styles.inputMaterial} label="Fecha de empleo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fechaEmpleo}/>
      <br />
      <TextField name="empleador" className={styles.inputMaterial} label="Contratador" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.empleador}/>
            <br />
      <TextField name="fechaDespido" className={styles.inputMaterial} label="Fecha de despido" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.fechaDespido}/>
      <br />
      <TextField name="inicioIncapacidad" className={styles.inputMaterial} label="Inicio de Incapacidad" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.inicioIncapacidad}/>
      <br />
      <TextField name="finalIncapacidad" className={styles.inputMaterial} label="Final de Incapacidad"  onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.finalIncapacidad}/>
      <br />
      <TextField name="padecimientos" className={styles.inputMaterial} label="Padecimientos" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.padecimientos}/>
      <br />
      <TextField name="estado" className={styles.inputMaterial} label="Estado" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.estado}/>
      <br />
           <TextField name="observacion" className={styles.inputMaterial} label="Observación" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.observacion}/>
           <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

    const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar a <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> <b>{consolaSeleccionada && consolaSeleccionada.apellido}</b> ? </p>
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
            <TableCell>Cedula</TableCell>
            <TableCell>N° Empleado</TableCell>
             <TableCell>Nombre</TableCell>
             <TableCell>Puesto</TableCell>
              <TableCell>Nacionalidad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Télefono</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map( consola=>(
               <TableRow key={consola.cedulaTra}>
                   <TableCell>{consola.cedulaTra}</TableCell>
               <TableCell>{consola.numEmpleado}</TableCell>
               <TableCell>{consola.nombre} {consola.apellido}</TableCell>
               <TableCell>{consola.puesto}</TableCell>
               <TableCell>{consola.nacionalidad}</TableCell>
               <TableCell>{consola.estado}</TableCell>
               <TableCell>{consola.telefono}</TableCell>
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
