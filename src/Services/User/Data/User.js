import Immutable from 'immutable';

const User = Immutable.Record({
    id: '',
    token: '',
    username: '',
    superuser: '',
    staff: ''
});

export default User;