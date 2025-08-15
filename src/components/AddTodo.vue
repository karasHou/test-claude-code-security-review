<template>
  <form @submit.prevent="handleSubmit" class="add-todo-form">
    <input
      ref="inputRef"
      v-model="newTodo"
      class="new-todo"
      autocomplete="off"
      placeholder="What needs to be done?"
      autofocus
    />
  </form>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const newTodo = ref('')
const inputRef = ref<HTMLInputElement>()

const handleSubmit = async () => {
  const value = newTodo.value.trim()
  if (value) {
    todoStore.addTodo(value)
    newTodo.value = ''
    await nextTick()
    inputRef.value?.focus()
  }
}
</script>

<style scoped>
.add-todo-form {
  position: relative;
}

.new-todo {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.new-todo:focus {
  outline: none;
}

.new-todo::placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}
</style>