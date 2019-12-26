import {GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, UPDATE_USER,GET_LIST_USER_SUCCESS,GET_LIST_STUDENT_SUCCESS, SET_STATUS_STUDENT_SUCCESS,SET_STATUS_TEACHER_SUCCESS, GET_USER_DETAIL_SUCCESS} from '../constants/actionTypes'

const initalState = {
    isFetching: false,
    userInfo: null,
    listUsers: null,
    listStudents: null,
    messageStudent: null,
    messageTeacher: null,
    userDetail: undefined,
    totalTeachers: 0,
    totalStudents: 0
}
const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
            }
    
        case GET_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                userInfo: action.userInfo
            }

        case GET_LIST_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listUsers: action.listUsers,
                totalTeachers: action.numOfUsers
            }
        case GET_LIST_STUDENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listStudents: action.listStudents,
                totalStudents: action.numOfUsers
            }
            
        case UPDATE_USER:
            return{
                ...state,
                userInfo : action.userInfo
            }
        case SET_STATUS_STUDENT_SUCCESS:
            return {
                ...state,
                messageStudent: action.message,
                listStudents : state.listStudents !== null ? state.listStudents.map((user,i) => user._id === action.id ? {...user, status : action.status} : user ): null
            }
        case SET_STATUS_TEACHER_SUCCESS:
            return {
                ...state,
                messageTeacher: action.message,
                listUsers : state.listUsers !== null ? state.listUsers.map((user,i) => user._id === action.id ? {...user, status : action.status} : user ) : null,
            }
        case GET_USER_DETAIL_SUCCESS:
            return{
                ...state,
                isFetching: false,
                userDetail: action.user
            }
        default:
            return state;
    }
}

export default authReducer;