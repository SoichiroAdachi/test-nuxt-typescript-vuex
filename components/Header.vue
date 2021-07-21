<template>
  <header>
    <h1>{{ title }}</h1>

    <Button
      v-if="!isShowAddFormRef"
      text="Add Task"
      color="green"
      @btn-click="toggleShowAddForm"
    />

    <Button v-else text="Close" color="red" @btn-click="toggleShowAddForm" />
  </header>
</template>

<script lang="ts">
import { defineComponent, Ref } from '@nuxtjs/composition-api'
import { showAddFormStore } from '~/utils/store-accessor'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  setup() {
    const isShowAddFormRef: Ref<boolean> = showAddFormStore.isShowAddFormRef

    return {
      isShowAddFormRef,
      toggleShowAddForm: showAddFormStore.toggle,
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