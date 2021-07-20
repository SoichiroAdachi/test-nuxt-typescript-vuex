import { Ref } from '@vue/composition-api'
import Task from '@/types/task'

export default function useList(tasksRef: Ref<Task[] | undefined>) {
  const load = async () => {
    tasksRef.value = await fetch('http://localhost:5000/tasks')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data as Task[]
      })
  }

  const addTask = async (task: Task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    }).catch((err) => {
      return err.response
    })

    if (response.status === 201) {
      load()
    } else {
      alert('Error add task')
    }
  }

  const deleteTask = async (id: number) => {
    if (confirm('Are you sure?')) {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      }).catch((err) => {
        return err.response
      })

      if (response.status === 200) {
        load()
      } else {
        alert('Error deleting task')
      }
    }
  }

  const toggleDone = async (id: number) => {
    const getResponse = await fetch(`http://localhost:5000/tasks/${id}`)
    const taskToToggle = await getResponse.json()
    const updTask = { ...taskToToggle, done: !taskToToggle.done }

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    load()
  }

  return {
    tasksRef,
    load,
    addTask,
    deleteTask,
    toggleDone,
  }
}
