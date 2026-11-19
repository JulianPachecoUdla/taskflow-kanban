
import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('Pruebas de la aplicación TaskFlow', () => {

  it('debe mostrar las tres columnas del tablero', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Pendiente' })).toBeInTheDocument()
    //expect(screen.getByRole('heading', { name: 'Pendiente XYZ' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'En progreso' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Completado' })).toBeInTheDocument()
  })

  it('debe permitir agregar una tarea', () => {
    render(<App />)

    fireEvent.change(screen.getByPlaceholderText('Título de la tarea'), {
      target: { value: 'Preparar presentación' },
    })

    fireEvent.change(screen.getByPlaceholderText('Descripción de la tarea'), {
      target: { value: 'Preparar las diapositivas del proyecto' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Agregar tarea' }))

    expect(screen.getByText('Preparar presentación')).toBeInTheDocument()
  })

  it('debe permitir eliminar una tarea', () => {
    render(<App />)

    const task = screen.getByText('Diseñar la interfaz').closest('article')

    fireEvent.click(within(task).getByRole('button', { name: 'Eliminar' }))

    expect(screen.queryByText('Diseñar la interfaz')).not.toBeInTheDocument()
  })

  it('debe permitir cambiar el estado de una tarea', () => {
    render(<App />)

    const statusSelect = screen.getByRole('combobox', {
      name: 'Estado de Diseñar la interfaz',
    })

    fireEvent.change(statusSelect, {
      target: { value: 'En progreso' },
    })

    expect(statusSelect).toHaveValue('En progreso')
  })

})
