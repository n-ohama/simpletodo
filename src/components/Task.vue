<template>
  <div class="todos-container">
    <div class="todo-container" v-for="task in tasks" :key="task.id">
      <div class="task-container">
        <input type="checkbox" v-model="task.isDone">
        <div :class="{done: task.isDone}">{{ task.text }}</div>
      </div>
      <div class="task-btn-container">
        <div class="task-btn" @click="delTask(task.id)" tabindex="0">
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
    }
  },
  created() {
    firebase.firestore().collection('users')
      .doc(this.$store.state.user.uid).collection('tasks').orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        let i = 0
        let snapData = querySnapshot.docs.map(d=>d.data())
        snapData.forEach(element => {
          element.id = querySnapshot.docs.map(d=>d.id)[i]
          i++
        });
        this.tasks = snapData
      });
  },
  methods: {
    delTask: function(id) {
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