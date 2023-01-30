const Task = require('../models/task')

const getTasksList = async () => {
    const tasks = await Task.findAll()
    return tasks
}

const getTaskById = async (id) => {
    const task = await Task.findByPk(id)
    return task
}

const createTask = async ({ name }) => {
    const task = await Task.create({ name })
    return task
}

const updateTask = async (id, data) => {
    const task = await Task.update(data, {
        where: {
            id
        }
    })

    return task
}

const removeTask = async (id) => {
    await Task.destroy({
        where: {
            id
        }
    })

    return true
}

module.exports = {
    getTasksList,
    getTaskById,
    createTask,
    updateTask,
    removeTask
}