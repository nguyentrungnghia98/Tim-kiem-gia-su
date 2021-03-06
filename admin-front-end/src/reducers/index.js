import {combineReducers} from 'redux'
import userReducer from './userReducer'
import authReducer from './authReducer'
import tagSkillReducer  from './tagSkillReducer'
import contractReducer from './contractReducer'
import staticReducer from './staticReducer'
import topIncomeReducer from './topIncomeReducer'


const App = combineReducers({
    userReducer,
    authReducer,
    tagSkillReducer,
    contractReducer,
    staticReducer,
    topIncomeReducer
})

export default App