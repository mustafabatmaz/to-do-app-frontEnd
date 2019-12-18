// referenced https://medium.com/hackernoon/routing-in-react-the-uncomplicated-way-b2c5ffaee997

const onChangeListeners = [];

function push(pathname) {
    window.history.pushState({}, '', pathname);

    onChangeListeners.forEach(callback => callback(pathname));
}

export default {
    push,
    onChange: cb => onChangeListeners.push(cb),
};