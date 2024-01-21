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
        <span :class="{ 'font-italic line-through': todo.completed }">
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
        <p v-if="toastMessage" class="pt-2">{{ toastMessage }}</p>
      </div>
    </ul>
  </div>

  <div class="fixed top-5% left-50% translate--50% -50%">
    <Transition name="slide" mode="out-in">
      <p
        v-if="toastMessage"
        class="bg-green-message shadow-xl text-5 py-5 px-10 rounded-2 text-center w-60"
      >
        {{ toastMessage }}
      </p>
    </Transition>
  </div>
  <div v-if="allTodosCompleted" class="absolute top-0 left-34vw z--1">
    <img src="/img/panda_danser.gif" alt="All todos completed GIF" />
  </div>
</template>

<script setup>
const newTodo = ref("");
const todoList = ref([]);
const toastMessage = ref("");
const allTodosCompleted = computed(
  () =>
    todoList.value.length > 0 && todoList.value.every((todo) => todo.completed)
);

function toggleCompleted(index) {
  todoList.value[index].completed = !todoList.value[index].completed;
  saveTodoList();

  if (todoList.value[index].completed) {
    toastMessage.value = `WOHOO!`;
    clearMessages();
  }
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
    toastMessage.value = "Opgaven blev tilføjet!";
  } else {
    toastMessage.value = "Feltet er tomt";
  }
  clearMessages();
}

function deleteTodo(index) {
  const confirmation = confirm(
    "Er du sikker på, at du vil slette denne opgave?"
  );
  if (confirmation) {
    const deletedTask = todoList.value[index].task;
    todoList.value.splice(index, 1);
    saveTodoList();
    toastMessage.value = `Opgaven "${deletedTask}" blev slettet!`;
    clearMessages();
  }
}

function clearMessages() {
  setTimeout(() => {
    toastMessage.value = "";
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
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-leave-to,
.slide-enter-from {
  transform: translateY(-100%);
}
</style>
