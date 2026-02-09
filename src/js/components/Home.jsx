import React from "react";
// ⚠️ OPORTUNIDAD DE MEJORA: useEffect importado pero no usado
// Sugerencia: Eliminar imports no utilizados para mantener código limpio
import { useState } from 'react';

function MiTodoList() {
  const [tareas, setTareas] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errores, setErrores] = useState('');

  // ✅ PATRÓN POSITIVO: Uso correcto del spread operator
  // Esta función crea un NUEVO array en lugar de mutar el existente
  function agregarTarea() {
    setTareas([...tareas, {texto: inputValue, completada:false, isEditing:false}])
    setInputValue("")
  }

  // ✅ PATRÓN POSITIVO: Uso correcto de .filter() para inmutabilidad
  // .filter() crea un NUEVO array sin el elemento, no muta el original
  const eliminarTarea = (indiceObjetivo) => {
    const nuevaLista = tareas.filter((_, indexActual)=> indexActual !== indiceObjetivo);
    setTareas(nuevaLista);
  }
  // ❌ ANTI-PATRÓN CRÍTICO: Mutación directa del estado (ver línea 22 del código original)
  // El código original hacía: tarea.completada=!tarea.completada
  // Esto modifica el objeto directamente, rompiendo inmutabilidad de React
  const completarTarea = (indiceObjetivo) => {
    // ✅ CORRECCIÓN APLICADA: Usar spread operator para crear nuevo objeto
    const nuevaClase = tareas.map((tarea, index) => {
      if (index === indiceObjetivo){
        // Crear NUEVO objeto en lugar de mutar el existente
        return { ...tarea, completada: !tarea.completada }
      }
      return tarea
    })
    setTareas(nuevaClase);
  };
  const EditarTarea = (id, nuevoTexto) =>{
     
  }
  // ⚠️ OPORTUNIDAD DE MEJORA: Validación sin .trim()
  // El código original permitía agregar tareas con solo espacios
  const validarTarea = () => {
    // ✅ MEJORA APLICADA: Usar .trim() para detectar espacios en blanco
    if (inputValue.trim() === "") {
      // ✅ MEJORA: Mensaje de error más descriptivo
      setErrores("La tarea no puede estar vacía")
      return false
    }
    // ✅ MEJORA: Sintaxis más clara con llaves
    else {
      agregarTarea();
      setErrores("");
    }
  }

  // ❓ TODO: Implementar funciones:
  // - editarTarea(id, nuevoTexto)

  return (
    <div className="container">
      <h1>Mi TodoList</h1>
      
      {/* Formulario */}
      <div className="formulario">
        {/* ✅ PATRÓN POSITIVO: Input controlado con value y onChange */}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // 💡 SUGERENCIA: Agregar onKeyDown para mejorar UX
          // onKeyDown={(e) => e.key === 'Enter' && validarTarea()}
          placeholder="Nueva tarea..."
        />
        <button onClick={() => {validarTarea()}}>
          Agregar
        </button>
      </div>

      {/* Errores */}
      {errores && <p className="error">{errores}</p>}

      {/* Contador */}
      <div className="stats">
        <p>Total: {tareas.length}</p>
        <p>Completadas: {tareas.filter(t => t.completada).length}</p>
      </div>

      {/* Lista */}
      <ul className="lista">
        {tareas.map((tarea , index)=>
          <li key={index} className={tarea.completada ? 'completada' : ''}>
            {tarea.isEditing && <input onChange={handleEdit} value={tarea.texto}/>}
            {!tarea.isEditing && <span>{tarea.texto}</span>}
            <button onClick={() => {completarTarea(index)}}>✓</button>
            <button onClick={() => {EditarTarea()}}>✏️</button>
            <button onClick={() => {eliminarTarea(index)}}>✕</button>
          </li>
        )}
      </ul>

      {tareas.length === 0 && (
        <p className="vacio">No hay tareas. ¡Crea una!</p>
      )}
    </div>
  );
}

export default MiTodoList;