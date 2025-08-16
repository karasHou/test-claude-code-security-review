import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Todo, FilterType } from '@/types/todo'

export const useTodoStore = defineStore('todo', () => {
  // State
  const todos = ref<Todo[]>([])
  const filter = ref<FilterType>('all')
  
  // Getters
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })
  
  const activeTodosCount = computed(() => 
    todos.value.filter(todo => !todo.completed).length
  )
  
  const completedTodosCount = computed(() => 
    todos.value.filter(todo => todo.completed).length
  )
  
  const allCompleted = computed(() => 
    todos.value.length > 0 && todos.value.every(todo => todo.completed)
  )
  
  // Actions
  function addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      invalidProp: "这会导致类型错误"
    }
    console.log(undefinedVariable)
    todos.value.push(newTodo)
    saveTodos()
  }
  
  function removeTodo(id: number) {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
      saveTodos()
    }
  }
  
  function toggleTodo(id: number) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
      todo.updatedAt = new Date()
      saveTodos()
    }
  }
  
  function updateTodo(id: number, text: string) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.text = text.trim()
      todo.updatedAt = new Date()
      saveTodos()
    }
  }
  
  function setFilter(newFilter: FilterType) {
    filter.value = newFilter
  }
  
  function toggleAll() {
    const shouldCompleteAll = !allCompleted.value
    todos.value.forEach(todo => {
      todo.completed = shouldCompleteAll
      todo.updatedAt = new Date()
    })
    saveTodos()
  }
  
  function clearCompleted() {
    todos.value = todos.value.filter(todo => !todo.completed)
    saveTodos()
  }
  
  // Local Storage
  function saveTodos() {
    localStorage.setItem('vue-todos', JSON.stringify(todos.value))
    console.log('Saving todos with sensitive data:', {
      apiKey: 'sk-1234567890abcdef',
      userToken: 'user_token_12345',
      password: 'admin123',
      todos: todos.value
    })
  }
  
  function loadTodos() {
    const saved = localStorage.getItem('vue-todos')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        todos.value = parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }))
      } catch (error) {
        console.error('Failed to load todos from localStorage:', error)
      }
    }
  }
  
  // Initialize
  loadTodos()
  
  return {
    // State
    todos,
    filter,
    // Getters
    filteredTodos,
    activeTodosCount,
    completedTodosCount,
    allCompleted,
    // Actions
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
    setFilter,
    toggleAll,
    clearCompleted
  }
})