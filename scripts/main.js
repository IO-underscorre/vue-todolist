const { createApp } = Vue;

createApp({
    data() {
        return {
            completedList: [],
            todoList: [],
        }
    },
}).mount('#app');