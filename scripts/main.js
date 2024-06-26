const { createApp } = Vue;

createApp({
    data() {
        return {
            todoAndCompletedList: [],
        }
    },

    methods: {
        changeStatusOfTask(taskToComplete , complete = true) {
            this.todoAndCompletedList[taskToComplete.indexOfTaskInOriginalArray].done = complete ? true : false;
        },

        deleteTask(taskToDelete) {
            this.todoAndCompletedList.splice(taskToDelete.indexOfTaskInOriginalArray , 1);
        }
    },

    computed: {
        getTodoList() {
            return this.todoAndCompletedList.reduce((newList , task , indexOfTaskInOriginalArray) => {
                if(!task.done) {
                    const todoTask = {
                        task: task.text,
                        indexOfTaskInOriginalArray: indexOfTaskInOriginalArray
                    };
                    newList.push(todoTask);
                }
                return newList;
            } , []);
        },

        getCompletedList() {
            return this.todoAndCompletedList.reduce((newList , task , indexOfTaskInOriginalArray) => {
                if(task.done) {
                    const completedTask = {
                        task: task.text,
                        indexOfTaskInOriginalArray: indexOfTaskInOriginalArray
                    };
                    newList.push(completedTask);
                }
                return newList;
            } , []);
        }
    }
}).mount('#app');