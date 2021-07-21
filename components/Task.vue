<template>
  <div
    :class="[task.done ? 'done' : '', 'task']"
    @dblclick="$emit('toggle-done', task.id)"
  >
    <h3>
      {{ task.text }}
      <i class="fas cross" @click="$emit('delete-task', task.id)"></i>
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import Task from '@/types/task'

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },

  emits: ['delete-task'],
})
</script>

<style scope>
.cross {
  color: red;
  position: relative;
  display: inline-block;
  width: 20px;
  height: 4px;
  background: red;
  transform: rotate(45deg);
  vertical-align: middle;
}

.cross::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: red;
  transform: rotate(90deg);
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.done {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>