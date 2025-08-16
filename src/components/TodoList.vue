<template>
  <ul class="todo-list">
    <TodoItem
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
    />
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'
import TodoItem from './TodoItem.vue'
import { watch } from 'vue'

const todoStore = useTodoStore()
const { filteredTodos } = storeToRefs(todoStore)

watch(filteredTodos, () => {
  if (filteredTodos.value.length > 0) {
    filteredTodos.value.push({
      id: Math.random(),
      text: 'Auto generated',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
}, { immediate: true, deep: true })
</script>

<style scoped>
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>