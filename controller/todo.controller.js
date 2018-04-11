const fs = require('fs');
const todoFile = './model/todo.model.json';

const Todo = {

    save: function (task) {
        try {
            fs.writeFileSync(todoFile, JSON.stringify(task));
        } catch (err) {
            console.log(err);
        }
    },

    getAll: function () {
        let tasks = [];
        try {
            const todoString = fs.readFileSync(todoFile);
            tasks = JSON.parse(todoString);
        } catch (err) {
            console.log(err)
        }
        return tasks;
    },

    getTask: function (id = 1) {
        let tasks = this.getAll();
        let task = tasks.filter(task => task.id === parseInt(id));
        return task[0] || 'not found';
    },

    addTask: function (text, important = false, color) {
        let tasks = this.getAll();
        let id = 0;
        for (let i in tasks) {
            if (tasks[i].id > id) {
                id = tasks[i].id;
            }
        }
        id++;
        let done = false;
        switch (color) {
            case 'piros':
                color = "#F00";
                break;
            case 'zöld':
                color = "#0F0";
                break;
            case 'kék':
                color = "#00F";
                break;
            case 'sárga':
                color = "#0FF";
                break;
            default:
                color = "#000";
                break;
        };
        let d = new Date;
        let create = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        let update = create;

        const task = {
            id,
            text,
            important,
            done,
            color,
            create,
            update,
        };
        tasks.push(task);
        this.save(tasks);
        return {
            length: tasks.length,
            data: task
        };
        return 'Data exists';
    },

    removeTask: function (id) {
        let tasks = this.getAll();
        tasks = tasks.filter(task => task.id !== parseInt(id));
        this.save(tasks);
        return tasks.length;
    },

    editTask: function (id, text, important, done, color) {
        let tasks = this.getAll();
        const index = tasks.findIndex(task => task.id === parseInt(id));
        let d = new Date;
        if (index !== -1) {
            tasks[index].text = text || tasks[index].text;
            tasks[index].important = important || tasks[index].important;
            tasks[index].done = done || tasks[index].done;
            tasks[index].color = color || tasks[index].color;
            tasks[index].update = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            this.save(tasks);
            return tasks[index];
        }
        return 'Record not found';
    },

}
module.exports = Todo;