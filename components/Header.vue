<template>
  <header>
    <h1>{{ title }}</h1>

    <Button
      v-if="toggleShowButton"
      text="Close"
      color="red"
      @btn-click="handleClick"
    />

    <Button v-else text="Add Task" color="green" @btn-click="handleClick" />
  </header>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    toggleShowButton: Boolean,
  },

  emits: ['toggle-add-task-form'],

  setup(_, context: SetupContext) {
    const handleClick = () => {
      context.emit('toggle-add-task-form')
    }

    return {
      handleClick,
    }
  },
})
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>