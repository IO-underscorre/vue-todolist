const { createApp } = Vue;

createApp({
    data() {
        return {
            todoAndCompletedList: [],

            taskInputed: '',

            hasInputError: false,
            inputIsFocused: false
        }
    },

    methods: {
        changeStatusOfTask(taskToComplete , complete = true) {
            this.todoAndCompletedList[taskToComplete.indexOfTaskInOriginalArray].done = complete ? true : false;
        },

        deleteTask(taskToDelete) {
            this.todoAndCompletedList.splice(taskToDelete.indexOfTaskInOriginalArray , 1);
        },

        addNewTask() {
            if(/[a-z]{3,}/i.test(this.taskInputed)) {
                this.hasInputError = false;
                const newTask = {
                    text: this.taskInputed.replace(/\s+/g,' ').trim(),
                    done: false
                };
                this.todoAndCompletedList.unshift(newTask);
                this.taskInputed = '';
                return true;
            } else {
                this.hasInputError = true;
                return false;
            }
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
        },

        placeholderAddTaskInput() {
            if(!this.inputIsFocused) {
                return !this.todoAndCompletedList.length ? 'Aggiungi un compito per iniziare!' : 'Aggiungi un altro compito...';
            } else {
                return '';
            }
        }
    }
}).mount('#app');