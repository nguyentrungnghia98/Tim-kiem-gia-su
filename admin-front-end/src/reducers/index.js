import {combineReducers} from 'redux'
import userReducer from './userReducer'
import authReducer from './authReducer'
import tagSkillReducer  from './tagSkillReducer'
import contractReducer from './contractReducer'
import staticReducer from './staticReducer'


const App = combineReducers({
    userReducer,
    authReducer,
    tagSkillReducer,
    contractReducer,
    staticReducer
})

export default App