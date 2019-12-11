import {combineReducers} from 'redux'
import userReducer from './userReducer'
import authReducer from './authReducer'
import tagSkillReducer  from './tagSkillReducer'


const App = combineReducers({
    userReducer,
    authReducer,
    tagSkillReducer
})

export default App