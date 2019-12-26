import {TAG_SKILL_FAILURE,TAG_SKILL_SUCCESS, TAG_SKILL_REQUEST, ADD_TAG_SKILL_SUCCESS, DELETE_TAG_SKILL_SUCCESS, UPDATE_TAG_SKILL_SUCCESS} from '../constants/actionTypes'

const initalState = {
    isFetching: false,
    message: null,
    tagskills: null,
    totalTagSkills: 0
}
const tagSkillReducer = (state = initalState, action) => {
    switch (action.type) {
        case TAG_SKILL_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case TAG_SKILL_FAILURE:
            return {
                ...state,
                isFetching: false,
            }
    
        case TAG_SKILL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                tagskills: action.tagskills,
                totalTagSkills : action.numOfTagSkills
            }

        case ADD_TAG_SKILL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                message: action.message,
                tagskills : state.tagskills.concat(action.tagskill)
            }
        case DELETE_TAG_SKILL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                message: action.message,
                tagskills: state.tagskills.filter(tagskill => tagskill._id !== action.id)
            }
        case UPDATE_TAG_SKILL_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                message: action.message,
                tagskills: state.tagskills.map((tagskill, i) => tagskill._id === action.id ? {...tagskill, content: action.content}: tagskill)
            }
        default:
            return state;
    }
}

export default tagSkillReducer;