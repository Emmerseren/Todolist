<template>
  <div id="todoList">
    <h1 class="text-12 pb-10">Todo List</h1>

    <div class="mb-5">
      <button
        @click="sortTodoAB"
        class="bg-sort-btn py-2.5 px-5 mr-3 rounded-2 border-btn border-1 cursor-pointer"
      >
        Sorter a-å
      </button>
      <button
        @click="sortTodoBA"
        class="bg-sort-btn py-2.5 px-5 rounded-2 border-btn border-1 cursor-pointer"
      >
        Sorter å-a
      </button>
    </div>

    <ul class="pt-5 w-150 h-60vh flex flex-col flex-wrap">
      <li
        v-for="(todo, index) in todoList"
        :key="index"
        class="pb-5 list-none text-5 flex flex-wrap w-70"
      >
        <span :class="{ completed: todo.completed }">
          <input
            v-if="todo.editing"
            v-model="todo.editedTask"
            @keydown.enter="saveTodo(index)"
            @blur="cancelEdit(todo)"
            class="py-2 px-3"
          />

          <span v-else>
            <input
              type="checkbox"
              v-model="todo.Completed"
              @change="toggleCompleted(index)"
              class="w-5 h-5"
            />

            {{ todo.task }}

            <div class="py-2.5 px-5">
              <button
                @click="editTodo(todo)"
                class="py-1.5 px-4 rounded-2 mr-3 border-btn border-1 cursor-pointer"
              >
                Rediger
              </button>
              <button
                class="py-1.5 px-4 rounded-2 text-white bg-delete-btn border-btn border-1 cursor-pointer"
                @click="deleteTodo(index)"
              >
                Slet
              </button>
            </div>
          </span>
        </span>
      </li>
      <div class="w-70">
        <input
          placeholder="Tilføj opgave her"
          v-model="newTodo"
          @keydown.enter="addTodo"
          class="py-2 px-3 mr-3"
        />
        <button
          @click="addTodo"
          class="py-2 px-3 rounded-2 border-btn border-1 cursor-pointer"
        >
          Tilføj
        </button>
        <p v-if="invalidInputMessage" class="pt-2">{{ invalidInputMessage }}</p>
      </div>
    </ul>
  </div>

  <div class="fixed top-5% left-50% translate--50% -50%">
    <TransitionGroup name="slide">
      <p
        v-if="taskAddedMessage"
        class="bg-green-message shadow-xl text-5 py-5 px-10 rounded-2 text-center w-60"
      >
        {{ taskAddedMessage }}
      </p>
      <p
        v-if="taskDeletedMessage"
        class="bg-green-message shadow-xl text-5 py-5 px-10 rounded-2 text-center w-60"
      >
        {{ taskDeletedMessage }}
      </p>
      <p
        v-if="taskCompletedMessage"
        class="bg-green-message shadow-xl text-5 py-5 px-10 rounded-2 text-center w-60"
      >
        {{ taskCompletedMessage }}
      </p>
    </TransitionGroup>
  </div>
  <div v-if="allTodosCompleted" class="absolute top-0 left-34vw z--1">
    <img src="/img/panda_danser.gif" alt="All todos completed GIF" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const newTodo = ref("");
const todoList = ref([]);
const taskAddedMessage = ref("");
const taskDeletedMessage = ref("");
const taskCompletedMessage = ref("");
const invalidInputMessage = ref("");
const allTodosCompleted = ref(false);

function checkAllTodosCompleted() {
  allTodosCompleted.value =
    todoList.value.length > 0 && todoList.value.every((todo) => todo.completed);
}

function toggleCompleted(index) {
  todoList.value[index].completed = !todoList.value[index].completed;
  saveTodoList();

  if (todoList.value[index].completed) {
    taskCompletedMessage.value = `WOHOO!`;
    clearMessages();
  }
  checkAllTodosCompleted();
}

function addTodo() {
  if (newTodo.value.trim() !== "") {
    const newId =
      todoList.value.length > 0
        ? todoList.value[todoList.value.length - 1].id + 1
        : 1;
    todoList.value.push({ id: newId, task: newTodo.value });
    newTodo.value = "";
    saveTodoList();
    taskAddedMessage.value = "Opgaven blev tilføjet!";
    clearMessages();
  } else {
    invalidInputMessage.value = "Feltet er tomt";
    clearMessages();
  }
  checkAllTodosCompleted();
}

function deleteTodo(index) {
  const confirmation = confirm(
    "Er du sikker på, at du vil slette denne opgave?"
  );
  if (confirmation) {
    const deletedTask = todoList.value[index].task;
    todoList.value.splice(index, 1);
    saveTodoList();
    taskDeletedMessage.value = `Opgaven "${deletedTask}" blev slettet!`;
    clearMessages();
  }
  checkAllTodosCompleted();
}

function clearMessages() {
  setTimeout(() => {
    taskAddedMessage.value = "";
    taskDeletedMessage.value = "";
    taskCompletedMessage.value = "";
    invalidInputMessage.value = "";
  }, 2000);
}

function editTodo(todo) {
  todo.editing = true;
  todo.editedTask = todo.task;
}

function cancelEdit(todo) {
  todo.editing = false;
}

function saveTodo(index) {
  const todo = todoList.value[index];
  todo.task = todo.editedTask;
  todo.editing = false;
  saveTodoList();
}

function sortTodoAB() {
  todoList.value.sort((a, b) =>
    a.task.toLowerCase().localeCompare(b.task.toLowerCase())
  );
}

function sortTodoBA() {
  todoList.value.sort((a, b) =>
    b.task.toLowerCase().localeCompare(a.task.toLowerCase())
  );
}

function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
}

onMounted(() => {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
  if (savedTodoList) {
    todoList.value = savedTodoList;
  }
  checkAllTodosCompleted();
});
</script>

<style scoped>
/*h1 {
  font-size: 2vw;
  padding-bottom: 1vw;
}

.todo_list__checkbox {
  width: 20px;
  height: 20px;
}

button {
  border-radius: 5px;
  border: 1px solid rgb(100, 100, 100);
  padding: 0.3vw 1vw 0.3vw 1vw;
  margin-right: 0.5vw;
  cursor: pointer;
  font-size: 0.9vw;
}

.todo_list_button__sort button {
  background-color: rgb(147, 177, 214);
  margin-bottom: 1vw;
}

.todo_list_task__buttons {
  padding: 0.3vw 0.7vw;
}

.todo_list_button__delete {
  background-color: rgb(250, 57, 57);
  color: white;
}

ul {
  padding-top: 1vw;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

li {
  list-style: none;
  padding-bottom: 1vw;
  font-size: 1vw;
}

input {
  padding: 0.3vw 0.3vw;
  margin-right: 0.5vw;
}
*/
.completed {
  text-decoration: line-through;
  font-style: italic;
}
/*
.todo_list__messages {
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
} 
.todo_list__messages p {
  background-color: #96f8a2;
  text-align: center;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 1.5vw;
}
*/
.slide-enter-active {
  animation: slide 1s ease;
}

.slide-leave-active {
  animation: slide 1s ease reverse;
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }

  50% {
    opacity: 1;
    transform: translateY(0);
  }
}
/*
.todo_list__gif {
  position: absolute;
  top: 0;
  margin-left: 30vw;
}*/
</style>
