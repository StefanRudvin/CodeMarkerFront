import ActionTypes from './ActionTypes';
import Dispatcher from './UserDispatcher';
import UserStore from './Data/Store';

const Actions = {
    login(id, token, username, superuser, staff) {
        Dispatcher.dispatch({
            type: ActionTypes.LOGIN,
            id: id,
            token: token,
            username: username,
            superuser: superuser,
            staff:staff
        });
    },
    logout(id) {
        Dispatcher.dispatch({
            type: ActionTypes.LOGOUT,
            id,
        });
    },
    getUser() {
        if (UserStore.getState()._map.size != 0) {

            let userArray = UserStore.getState()._map._root.entries[0][0]._map._root.entries;

            let userObject = {}

            userArray.forEach(function(item) {
                userObject[item[0]] = item[1]
            })
            return userObject;
        }
        return false;
    }
};

export default Actions;