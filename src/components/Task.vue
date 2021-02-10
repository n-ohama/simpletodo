<template>
  <div class="todos-container">
    <div class="todo-container" v-for="task in tasks" :key="task.id">
      <div class="task-container">
        <input type="checkbox" v-model="task.isDone">
        <div :class="{done: task.isDone}">{{ task.text }}</div>
      </div>
      <div class="task-btn-container">
        <div class="task-btn" @click="delTask(task.text)">
          Delete
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";
export default {
  data() {
    return {
      tasks: null,
      tasksids: null
    }
  },
  created() {
    firebase.firestore().collection('users')
      .doc(this.$store.state.user.uid).collection('tasks').orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot.docs.map(d=>d.id))
        console.log(querySnapshot.docs.map(d=>d.data()))
        this.tasks = querySnapshot.docs.map((d)=>d.data())
      });
  },
  methods: {
    delTask: function(id) {
      console.log(id)
      firebase.firestore().collection('users')
        .doc(this.$store.state.user.uid).collection('tasks').doc(id).delete()
    }
  }
}
</script>

<style scoped>
.todos-container {
  padding: 16px;
  margin: 0 50px;
}
.todo-container {
  display: flex;
  padding: 8px;
  justify-content: space-between;
}
.task-container {
  word-wrap: break-word;
  width: 80%;
  text-align: left;
  display: flex;
}
.done{
	text-decoration: line-through;
	color: gray;
}
.task-btn-container {
  width: 20%;
}
.task-btn {
  cursor: pointer;
  width: 80px;
  border: 2px solid #fff;
  margin: 0 auto;
  padding: 12px 0;
  color: #fff;
  transition: .4s;
}
.task-btn:hover {
  background: #fff;
  color: #6DCB93;
}
/* ウィンドウ幅が最大479pxまでの場合（スマホの場合）に適用 */
@media screen and (max-width: 479px) {
  .todos-container {
    margin: 0;
  }
  .todo-container {
    display: block;
  }
  .task-container {
    width: 100%;
    margin: 0 auto;
  }
  .task-btn-container {
    width: 100%;
  }
  .task-btn {
    width: 200px;
    margin-top: 20px;
  }
}
</style>