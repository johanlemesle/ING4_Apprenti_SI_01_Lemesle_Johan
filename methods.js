// let users = [
//     {
//         id: '1',
//         name: 'user1',
//     },
//     {
//         id: '2',
//         name: 'user2',
//     },
// ];

// export function listUsers() {
//     return users;
// }

// export function getUser(id) {
//     let idx = users.findIndex(u => id === u.id);
//     if (idx == -1) {
//         throw new Error("user does not exist");
//     }
//     return users[idx];
// }

// export function createUser(user) {
//     if (users.findIndex(u => u.id === user.id) != -1) {
//         throw new Error("user already exists");
//     }
//     users.push(user);
//     return user;
// }

// export function updateUser(id, user) {
//     let idx = users.findIndex(u => u.id == id);
//     if (idx == -1) {
//         throw new Error("user does not exist");
//     }
//     users[idx] = user;
//     return user;
// }

// export function deleteUser(id) {
//     if (users.findIndex(u => u.id == id) === -1) {
//         throw new Error("user does not exist");
//     }
//     users = users.filter(u => u.id !== id);
// }
