<template>
  <div class="input-container">
    <p class="form-text">タスクを追加！</p>
    <textarea v-model="text"></textarea>
    <div class="form-btn" @click="addTask">
      Add
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js"
export default {
  data() {
    return {
      text: null
    }
  },
  methods: {
    addTask() {
      firebase.firestore().collection('users').doc(this.$store.state.user.uid).collection('tasks').add({
        text: this.text,
        createdAt: new Date().getTime(),
        isDone: false
      }).then(doc => {
        this.text = null
      })
    },
  }
}
</script>

<style scoped>
.input-container {
  padding: 10px;
  height: 100%;
  text-align: center;
}
.form-text {
  color: #fff;
}
textarea {
  width: 50%;
  height: 100%;
  border: none;
}
.form-btn {
  cursor: pointer;
  width: 150px;
  border: 2px solid #fff;
  margin: 20px auto 10px;
  padding: 12px 0;
  color: #fff;
  transition: .4s;
}
.form-btn:hover {
  background: #fff;
  color: #6DCB93;
}
@media screen and (max-width: 479px) {
  textarea {
    width: 100%;
  }
  .form-btn {
    width: 200px;
  }
}
</style>