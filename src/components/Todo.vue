<template>
  <div class="todo">
    <h1 class="todo-title">SimpleTodo</h1>
    <h2 class="todo-text">{{ userName }} さんのやることリスト</h2>
    <Form />
    <Task />
    <div class="todo-btn" @click="signOut" tabindex="0">
      サインアウト
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task"
import Form from "@/components/Form"
import firebase from "@/plugins/firebase.js"
export default {
  name: 'todo',
  data() {
    return {
      tasks: [],
      userName: null
    }
  },
  components: {
    Task,
    Form,
  },
  mounted() {
    firebase.firestore().collection('users').doc(this.$store.state.user.uid)
      .get().then(d=>this.userName = d.data().name)
  },
  methods: {
    signOut: () => firebase.auth().signOut()
  },
}
</script>

<style scoped>
.todo {
  text-align: center;
}
.todo-title {
  color: #fff;
}
.todo-text {
  color: #fff;
}
.todo-btn {
  cursor: pointer;
  width: 150px;
  border: 2px solid #fff;
  margin: 50px auto 50px;
  padding: 12px 0;
  color: #fff;
  transition: .4s;
}
.todo-btn:hover {
  background: #fff;
  color: #6DCB93;
}
@media screen and (max-width: 479px) {
  .todo-btn {
    width: 200px;
  }
}
</style>