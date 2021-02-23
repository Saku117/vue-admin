<template>
  <div>
    <!-- 新增todo -->
    <input
      type="text"
      v-model="newTodo"
      @keyup.enter="addTodo"
      autofocus
      autocomplete="false"
      placeholder="新增今日待办"
    />
    <!-- Todo 列表 -->
    <ul>
      <li
        v-for="todo in filterdTodos"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo === editedTodo }"
      >
        <!-- 绑定完成状态 -->
        <div class="view">
          <input type="checkbox" v-model="todo.completed" />
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button @click="romoveTodo(todo)">X</button>
        </div>
        <!-- 编辑待办 -->
        <input
          type="text"
          class="edit"
          v-model="todo.title"
          v-todo-focus="todo === editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(todo)"
        />
      </li>
    </ul>
    <!-- 过滤类表 -->
    <p class="filters">
      <span
        @click="visvibility = 'all'"
        :class="{ selected: visvibility === 'all' }"
      >
        ALL
      </span>
      <span
        @click="visvibility = 'active'"
        :class="{ selected: visvibility === 'active' }"
      >
        Active
      </span>
      <span
        @click="visvibility = 'completed'"
        :class="{ selected: visvibility === 'completed' }"
      >
        Completed
      </span>
    </p>
  </div>
</template>

<script>
  import { computed, reactive, toRefs, watchEffect } from "vue";

  const filiters = {
    all(todos) {
      return todos;
    },
    active(todos) {
      return todos.filter((todo) => !todo.completed);
    },
    completed(todos) {
      return todos.filter((todo) => todo.completed);
    },
  };

  //缓存操作

  const todoStorage = {
    fetch() {
      let todos = JSON.parse(localStorage.getItem("vue3-todos") || "[]");
      todos.forEach((todo, index) => {
        todo.id = index + 1;
      });
      return todos;
    },
    save(todos) {
      localStorage.setItem("vue3-todos", JSON.stringify(todos));
    },
  };
  export default {
    setup() {
      const state = reactive({
        newTodo: "",
        todos: todoStorage.fetch(),
        beforeEditCache: "", //缓存编辑前的todo
        editedTodo: "", //正在编辑的todo
        visvibility: "all",
        filterdTodos: computed(() => {
          return filiters[state.visvibility](state.todos);
        }),
      });
      /**
       * 新增todo项
       */
      function addTodo() {
        let newTodo = state.newTodo;
        // 判断输入的是否为空格或者为空
        if (newTodo.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
          alert("输入为空");
          return false;
        }
        state.todos.push({
          id: state.todos.length + 1,
          title: state.newTodo,
          completed: false,
        });
        state.newTodo = "";
      }
      /**
       * 移除todo项
       */
      function romoveTodo(todo) {
        state.todos.splice(state.todos.indexOf(todo), 1);
      }

      /**
       * 编辑todo项
       */
      function editTodo(todo) {
        state.editedTodo = todo;
        state.beforeEditCache = todo;
      }

      /**
       * 取消编辑todo项
       */
      function cancelEdit(todo) {
        todo.title = state.beforeEditCache;
        state.editedTodo = null;
      }
      /**
       * 完成编辑todo项
       */
      function doneEdit() {
        state.editedTodo = null;
      }
      watchEffect(() => {
        todoStorage.save(state.todos)
      });
      return {
        ...toRefs(state),
        addTodo,
        romoveTodo,
        cancelEdit,
        editTodo,
        doneEdit,
      };
    },
    directives: {
      "todo-focus": (el, { value }) => {
        if (value) {
          el.focus();
        }
      },
    },
  };
</script>

<style scoped>
  li {
    list-style: none;
  }
  .completed label {
    text-decoration: line-through;
  }
  .edit,
  .editing .view {
    display: none;
  }
  .view,
  .editing .edit {
    display: block;
  }
  .filters > span {
    padding: 2px 4px;
    margin-right: 4px;
    border: 1px solid transparent;
  }
  .filters > span.selected {
    border-color: rgba(173, 47, 47, 0.2);
  }
</style>
