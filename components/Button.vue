<template>
  <button :style="{ background: color }" class="btn" @click="handleClick">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },

  emits: ['btn-click'],

  setup(_, context: SetupContext) {
    const handleClick = () => {
      context.emit('btn-click')
    }

    return {
      handleClick,
    }
  },
})
</script>