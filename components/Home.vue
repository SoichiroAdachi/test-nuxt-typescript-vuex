<template>
  <div>
    <AddTaskForm v-if="isShowAddTaskForm" @add-task="addTask" />

    <Tasks
      v-if="tasksRef"
      :tasks="tasksRef"
      @delete-task="deleteTask"
      @toggle-done="toggleDone"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Task from '@/types/task'
import useList from '../composables/use-list'

export default defineComponent({
  props: {
    isShowAddTaskForm: Boolean,
  },

  setup() {
    const tasksRef = ref<Task[]>()
    const { load, addTask, deleteTask, toggleDone } = useList(tasksRef)

    load()

    return {
      tasksRef,
      addTask,
      deleteTask,
      toggleDone,
    }
  },
})
</script>