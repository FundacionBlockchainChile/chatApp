const users = []

// Functions addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required'
        }
    }

    // Check for exisiting user
    const exisitingUser =  users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (exisitingUser) {
        return {
            error: 'Username is in use'
        }
    }

    // Store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

// Remove User
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Get User - array find
const getUser = (id) => {
    return users.find((user => user.id === id))
}

// getUserIn ROoms - filter
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

// addUser({
//     id: 00,
//     username: 'Pies',
//     room: 'Dogs'
// })

// addUser({
//     id: 01,
//     username: 'Flaco',
//     room: 'Dogs'
// })

// addUser({
//     id: 02,
//     username: 'Teo',
//     room: 'Cats'
// })

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

// Examples
// console.log(users)
// console.log(getUsersInRoom('Perros'))
// console.log(getUser(01))
// const removedUser = removeUser(22)
// console.log(removedUser)
// console.log(users)
