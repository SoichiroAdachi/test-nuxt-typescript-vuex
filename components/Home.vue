<template>
  <div>
    <AddTaskForm v-if="isShowAddFormRef" @add-task="addTask" />

    <Tasks
      v-if="tasksRef"
      :tasks="tasksRef"
      @delete-task="deleteTask"
      @toggle-done="toggleDone"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref } from '@nuxtjs/composition-api'
import Task from '~/types/task'
import { taskStore, showAddFormStore } from '~/utils/store-accessor'

export default defineComponent({
  setup() {
    const tasksRef: Ref<Task[]> = taskStore.tasksRef
    const isShowAddFormRef: Ref<boolean> = showAddFormStore.isShowAddFormRef

    taskStore.load()

    return {
      tasksRef,
      addTask: taskStore.addTask,
      deleteTask: taskStore.deleteTask,
      toggleDone: taskStore.toggleDone,
      isShowAddFormRef,
    }
  },
})
</script>