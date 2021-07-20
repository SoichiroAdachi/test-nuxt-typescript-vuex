<template>
  <form class="add-form" @submit.prevent="submit">
    <div class="form-control">
      <label>Task</label>
      <input v-model="text" type="text" name="text" placeholder="Add Task" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@vue/composition-api'
import Task from '@/types/task'

export default defineComponent({
  emits: ['add-task'],

  setup(_, context: SetupContext) {
    const text = ref<string>('')
    const done = ref<boolean>(false)

    const submit = () => {
      if (!text.value) {
        alert('Please add a task')
        return
      }

      const newTask: Task = {
        // idは被らない値であれば良い
        id: Math.floor(Math.random() * 100000),
        text: text.value,
        done: done.value,
      }

      context.emit('add-task', newTask)

      text.value = ''
      done.value = false
    }

    return {
      text,
      submit,
    }
  },
})
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>