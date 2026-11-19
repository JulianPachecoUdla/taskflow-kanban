
import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Diseñar la interfaz',
      description: 'Crear el diseño inicial del tablero.',
      status: 'Pendiente',
    },
    {
      id: 2,
      title: 'Configurar React',
      description: 'Preparar el entorno de desarrollo.',
      status: 'En progreso',
    },
    {
      id: 3,
      title: 'Crear el proyecto',
      description: 'Inicializar el proyecto con Vite.',
      status: 'Completado',
    },
  ])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)

  const columns = ['Pendiente', 'En progreso', 'Completado']

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim()) return

    if (editingId !== null) {
      setTasks(tasks.map((task) =>
        task.id === editingId
          ? { ...task, title, description }
          : task
      ))
      setEditingId(null)
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        status: 'Pendiente',
      }

      setTasks([...tasks, newTask])
    }

    setTitle('')
    setDescription('')
  }

  function editTask(task) {
    setTitle(task.title)
    setDescription(task.description)
    setEditingId(task.id)
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))

    if (editingId === id) {
      cancelEdit()
    }
  }

  function changeStatus(id, status) {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    ))
  }

  function cancelEdit() {
    setEditingId(null)
    setTitle('')
    setDescription('')
  }

  return (
    <main className="app">
      <header className="header">
        <div>
          <h1>TaskFlow</h1>
          <p>Organiza tus tareas y mantén el control de tu trabajo.</p>
        </div>
        <span className="task-count">
  {tasks.length} tareas | {tasks.filter((task) => task.status === 'Completado').length} completadas
</span>
      </header>

      <section className="task-form">
        <h2>{editingId !== null ? 'Editar tarea' : 'Nueva tarea'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <textarea
            placeholder="Descripción de la tarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <div className="form-actions">
            <button type="submit">
              {editingId !== null ? 'Guardar cambios' : 'Agregar tarea'}
            </button>

            {editingId !== null && (
              <button type="button" className="cancel-button" onClick={cancelEdit}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="board">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column
          )

          return (
            <div className="column" key={column}>
              <div className="column-header">
                <h2>{column}</h2>
                <span>{columnTasks.length}</span>
              </div>

              <div className="task-list">
                {columnTasks.length === 0 && (
                  <p className="empty-message">No hay tareas aquí.</p>
                )}

                {columnTasks.map((task) => (
                  <article className="task-card" key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description || 'Sin descripción'}</p>

                    <div className="task-actions">
                      <button type="button" onClick={() => editTask(task)}>
                        Editar
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => deleteTask(task.id)}
                      >
                        Eliminar
                      </button>
                    </div>

                    <select
                      aria-label={`Estado de ${task.title}`}
                      value={task.status}
                      onChange={(event) =>
                        changeStatus(task.id, event.target.value)
                      }
                    >
                      {columns.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default App
