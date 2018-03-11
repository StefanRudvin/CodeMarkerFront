import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import ActionTypes from '../ActionTypes';
import UserDispatcher from '../UserDispatcher';
import User from './User'

class UserStore extends ReduceStore {
    constructor() {
        super(UserDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.LOGIN:

                return state.set(new User({
                    id: action.id,
                    token: action.token,
                    username: action.username,
                    superuser: action.superuser,
                    staff: action.staff
                }));
                return state;

            case ActionTypes.LOGOUT:
                return state.delete(action.id);

            case ActionTypes.GET:
                return state;

            default:
                return state;
        }
    }
}

export default new UserStore();