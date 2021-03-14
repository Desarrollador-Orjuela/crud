import './App.css';
import { Fragment, useState } from 'react';
import { isEmpty, size } from 'lodash';

function App()
{
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [editarTarea, setEditarTarea] = useState(false);
  const [idTarea, setIdTarea] = useState(0);
  const [error, setError] = useState(null);

  // Validar Formulario
  const ValidarFormulario = () =>
  {
    //
  }
  
  // Funciones
  const AgregarTarea = (e) =>
  {
    e.preventDefault();
    if(isEmpty(tarea))
    {
      setError("Debes ingresar una tarea.");
    }
    else
    {
      console.log("Tarea correcta", tarea);
      let idTemp = 1;
      if(tareas.length >= 1)
      {
        idTemp = tareas[tareas.length - 1]?.id;
      }
      const nuevaTarea =
      {
        id: (tareas.length !== null)? (idTemp + 1) : 1,
        nombre: tarea   
      }

      setTareas([...tareas, nuevaTarea]);
      setTarea("");
      setError(null);
    }
  }


  const EditarTarea = (e) =>
  {
    e.preventDefault();
    if (isEmpty(tarea))
    {
      setError("Debes ingresar una tarea.");
    }
    else
    {
      const tareaEditarTem2 = tareas.map(t => t.id === idTarea ? {id:idTarea, nombre: tarea} :t); // modifica el objeto tarea
      setTareas(tareaEditarTem2);
      setTarea("");
      setEditarTarea(false);
      setIdTarea(0);
      setError(null);
    }
  }


  const ClickEliminar = (id) =>
  {
    const tareasFiltradas = tareas.filter(t => t.id !== id);
    setTareas(tareasFiltradas);
    setTarea("");
    setEditarTarea(false);
    setIdTarea(0);
    setError(null);
  }

  const ClickEditar = (id) =>
  {
    const tareaEditar = tareas.find(t => t.id === id);
    console.log("Tarea filtrada:  ", tareaEditar);
    setTarea(tareaEditar.nombre);
    setEditarTarea(true);
    setIdTarea(id);
    setError(null);
  }

  return (
    <div className="container mt-5 text-center">
      <h1>Tareas</h1>
      <hr></hr>
      
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          {
            (size(tareas) === 0) ?
            (
              <Fragment>
                <br></br>
                <li className="list-group-item">No hay tareas programadas...</li>
              </Fragment>
            ):
            (
              <ul className="list-group">
                {
                  tareas.map((tareaR) =>
                  {
                    return(
                    <li className="list-group-item" key={tareaR.id}>
                      <span className="lead">{tareaR.nombre}</span>
                      <button className="btn btn-danger btn-sm float-right mx-2" onClick={() => ClickEliminar(tareaR.id)}>Eliminar</button>
                      <button className="btn btn-warning btn-sm float-right" onClick={() => ClickEditar(tareaR.id)}>Editar</button>
                    </li>
                    );
                  })
                }
              </ul>
            )
          }
        </div>
        <div className="col-4">
          <h4>{editarTarea ? "Editar tarea" : "Agregar tarea"}</h4>
          {
            (editarTarea === false) ?
            (
              <form onSubmit={ (e) => AgregarTarea(e) }>
                {
                  error && (<span className="text-danger">{error}</span>)
                }
                <input type="text" className="form-control mb-2" placeholder="Ingrese la tarea..." onChange={ (text) => setTarea(text.target.value) } value={tarea}/>
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              </form>
            ):
            (
              <Fragment>
                <form onSubmit={ (e) => EditarTarea(e) }>
                  {
                    error && (<span className="text-danger">{error}</span>)
                  }
                  <input type="text" className="form-control mb-2"  onChange={ (text) => setTarea(text.target.value) } value={tarea}/>
                  <button className="btn btn-warning btn-block" type="submit">Guardar</button>
                </form>
              </Fragment>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
