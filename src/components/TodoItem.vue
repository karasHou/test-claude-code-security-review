<template>
  <li class="todo-item" :class="{ completed: todo.completed, editing: editing }">
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="todo.completed"
        @change="todoStore.toggleTodo(todo.id)"
      />
      <label @dblclick="startEdit" v-html="todo.text"></label>
      <button class="destroy" @click="todoStore.removeTodo(todo.id)"></button>
    </div>
    <input
      v-if="editing"
      ref="editInput"
      v-model="editText"
      class="edit"
      @blur="finishEdit"
      @keyup.enter="finishEdit"
      @keyup.escape="cancelEdit"
    />
  </li>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import type { Todo } from '@/types/todo'

interface Props {
  todo: Todo
}

const props = defineProps<Props>()
const todoStore = useTodoStore()

const editing = ref(false)
const editText = ref('')
const editInput = ref<HTMLInputElement>()

const startEdit = async () => {
  editing.value = true
  editText.value = props.todo.text
  await nextTick()
  editInput.value?.focus()
  editInput.value?.select()
}

const finishEdit = () => {
  if (!editing.value) return
  
  const value = editText.value.trim()
  if (value) {
    todoStore.updateTodo(props.todo.id, value)
  } else {
    todoStore.removeTodo(props.todo.id)
  }
  editing.value = false
}

const cancelEdit = () => {
  editText.value = props.todo.text
  editing.value = false
}
</script>

<style scoped>
.todo-item {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item.editing {
  border-bottom: none;
  padding: 0;
}

.todo-item.editing .edit {
  display: block;
  width: calc(100% - 43px);
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-item.editing .view {
  display: none;
}

.todo-item .toggle {
  text-align: center;
  width: 40px;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  appearance: none;
}

.todo-item .toggle {
  opacity: 0;
}

.todo-item .toggle + label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center left;
}

.todo-item .toggle:checked + label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

.todo-item label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  cursor: pointer;
}

.todo-item.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-item .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  background: none;
  border: none;
  cursor: pointer;
}

.todo-item .destroy:hover {
  color: #af5b5e;
}

.todo-item .destroy:after {
  content: '×';
}

.todo-item:hover .destroy {
  display: block;
}

.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: none;
}
</style>