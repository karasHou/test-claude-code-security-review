<template>
  <div class="todo-filter">
    <span class="todo-count">
      <strong>{{ activeTodosCount }}</strong>
      {{ activeTodosCount === 1 ? 'item' : 'items' }} left
    </span>
    
    <ul class="filters">
      <li>
        <a
          href="#/"
          :class="{ selected: filter === 'all' }"
          @click="todoStore.setFilter('all')"
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          :class="{ selected: filter === 'active' }"
          @click="todoStore.setFilter('active')"
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          :class="{ selected: filter === 'completed' }"
          @click="todoStore.setFilter('completed')"
        >
          Completed
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const { filter, activeTodosCount } = storeToRefs(todoStore)
</script>

<style scoped>
.todo-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.todo-count {
  float: left;
  text-align: left;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}
</style>