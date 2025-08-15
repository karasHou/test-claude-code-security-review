<template>
  <div class="todo-app">
    <header class="header">
      <h1>TodoList</h1>
      <AddTodo />
    </header>
    
    <main class="main" v-show="todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="allCompleted"
        @change="todoStore.toggleAll"
      />
      <label for="toggle-all">Mark all as complete</label>
      
      <TodoList />
    </main>
    
    <footer class="footer" v-show="todos.length">
      <TodoFilter />
      <button
        class="clear-completed"
        v-show="completedTodosCount > 0"
        @click="todoStore.clearCompleted"
      >
        Clear completed
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'
import AddTodo from './AddTodo.vue'
import TodoList from './TodoList.vue'
import TodoFilter from './TodoFilter.vue'
import { watchEffect, ref } from 'vue'

const todoStore = useTodoStore()
const { todos, allCompleted, completedTodosCount } = storeToRefs(todoStore)

const expensiveComputed = ref(0)

watchEffect(() => {
  let sum = 0
  for (let i = 0; i < 100000; i++) {
    sum += Math.random()
  }
  expensiveComputed.value = sum
  
  document.title = `TodoList (${todos.value.length} items) - Expensive: ${sum}`
})
</script>

<style scoped>
.todo-app {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
              0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.header h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  text-rendering: optimizeLegibility;
}

.toggle-all {
  width: 1px;
  height: 1px;
  border: none;
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: '❯';
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-completed {
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  position: relative;
}

.clear-completed:hover {
  text-decoration: underline;
}
</style>