import {combineReducers} from 'redux'
import userReducer from './userReducer'
import authReducer from './authReducer'
import tagSkillReducer  from './tagSkillReducer'
import contractReducer from './contractReducer'


const App = combineReducers({
    userReducer,
    authReducer,
    tagSkillReducer,
    contractReducer
})

export default App