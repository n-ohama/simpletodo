<template>
  <div class="todo">
    <h1 class="todo-title">SimpleTodo</h1>
    <h2 class="todo-text">hogeさんのやることリスト</h2>
    <Form />
    <Task />
    <div class="todo-btn" @click="signOut">
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
    }
  },
  components: {
    Task,
    Form,
  },
  methods: {
    signOut: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  },
  mounted() {
    console.log('todo mounted')
    // db.collection('users').doc(userId).collection('tasks').orderBy('createdAt')
    // .onSnapshot((snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     const doc = change.doc
    //     const index = this.tasks.findIndex(task => task.id === change.doc.id)
    //     if (change.type === 'added') {
    //       this.tasks.push({id: doc.id, ...doc.data()})
    //     }
    //     if (change.type === "removed") {
    //       this.tasks.splice(index, 1)
    //     }
    //   })
    // })
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