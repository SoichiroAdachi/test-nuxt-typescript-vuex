import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ref, Ref } from '@nuxtjs/composition-api'
import Task from '~/types/task'

@Module({ name: 'TaskStore', namespaced: true, stateFactory: true })
export default class TaskStore extends VuexModule {
  private _tasksRef = ref<Task[]>([
    {
      id: -1,
      text: 'default text',
      done: false,
    },
  ])

  get tasksRef(): Ref<Task[]> {
    return this._tasksRef
  }

  @Mutation
  private _load(tasks: Task[]): void {
    this._tasksRef.value = tasks
  }

  @Mutation
  private _addTask(task: Task): void {
    this._tasksRef.value.push(task)
  }

  @Mutation
  private _deleteTask(id: number): void {
    const deleted = this._tasksRef.value.filter((task: Task) => task.id !== id)
    this._tasksRef.value = deleted
  }

  @Mutation
  private _toggleDone(id: number): void {
    const modified = this._tasksRef.value.map((task: Task) => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task
    })
    this._tasksRef.value = modified
  }

  @Action({ rawError: true })
  async load(): Promise<void> {
    const tasks: Task[] = await fetch('http://localhost:5000/tasks')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data as Task[]
      })

    this._load(tasks)
  }

  @Action({ rawError: true })
  async addTask(task: Task): Promise<void> {
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
      this._addTask(task)
    } else {
      alert('Error add task')
    }
  }

  @Action({ rawError: true })
  async deleteTask(id: number): Promise<void> {
    if (confirm('Are you sure?')) {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      }).catch((err) => {
        return err.response
      })

      if (response.status === 200) {
        this._deleteTask(id)
      } else {
        alert('Error deleting task')
      }
    }
  }

  @Action({ rawError: true })
  async toggleDone(id: number): Promise<void> {
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

    this._toggleDone(id)
  }
}
