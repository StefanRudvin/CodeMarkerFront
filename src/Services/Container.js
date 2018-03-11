import AppView from './AppView'
import {Container} from 'flux/utils';
import UserStore from './User/Data/Store';
import Actions from './User/UserActions'

function getStores() {
    return [
        UserStore,
    ];
}

function getState() {
    return {
        user: UserStore.getState(),
        onLogin: Actions.login,
        onLogout: Actions.logout,
        onGet: Actions.get
    };
}

export default Container.createFunctional(AppView, getStores, getState);