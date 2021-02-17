export function List(elem) {
    return elem;
}

export function Create(array, user) {
    array.push(user);
}

export function Update(array, id, user) {
    array[id] = user;
}

export function Delete(array, id) {
    array.splice(id, 1);
}