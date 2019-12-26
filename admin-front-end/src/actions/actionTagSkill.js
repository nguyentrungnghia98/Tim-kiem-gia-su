import fetch from 'cross-fetch';
import {TAG_SKILL_FAILURE, TAG_SKILL_SUCCESS, TAG_SKILL_REQUEST, ADD_TAG_SKILL_SUCCESS, DELETE_TAG_SKILL_SUCCESS, UPDATE_TAG_SKILL_SUCCESS} from '../constants/actionTypes';


export const tagSkillRequest = () => {
    return {
        type: TAG_SKILL_REQUEST
    };
}

export const tagSkillFailure = () => {
    return {
        type: TAG_SKILL_FAILURE
    };
}
export const tagSkillSuccess = (tagskills, numOfTagSkills) => {
    return {
        type: TAG_SKILL_SUCCESS,
        tagskills,
        numOfTagSkills
    };
}

export const addTagSkillSuccess = (message, tagskill) => {
    return {
        type: ADD_TAG_SKILL_SUCCESS,
        message,
        tagskill
    };
}

export const fetchTagSkill = (token, page) => {

    return dispatch => {
  
        dispatch(tagSkillRequest());

        const bearerToken = `Bearer ${  token}`;

        return fetch(`http://localhost:3001/tag-skill?page=${page !== undefined ? page : ''}`, {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                // console.log(error);
                dispatch(tagSkillFailure());
            }
        )
        .then(json => {
            dispatch(tagSkillSuccess(json.tagskills, json.numOfTagSkills));
        })
        .catch(err => {
            //console.log(err);
            dispatch(tagSkillFailure());
        })
    }
  }

  export const fetchAddTagSkill = (content, token) => {

    return dispatch => {

        dispatch(tagSkillRequest('Đang tạo mới tag kĩ năng !'));

        const bearerToken = `Bearer ${  token}`;

        return fetch('http://localhost:3001/tag-skill/add', {
            method: 'POST',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                content
            })
        })
        .then(
            response => response.json(),
        )
        .then(json => {
            if (json.err)
                dispatch(tagSkillFailure(json.err));
            else{
                dispatch(addTagSkillSuccess(json.message, json.tagskill));
            }
            
        })
    }
}

export const delTagSkillSuccess = (message,id) => {
    return {
        type: DELETE_TAG_SKILL_SUCCESS,
        message,
        id
    };
}

export const fetchDelTagSkill = (token, id) => {

    return dispatch => {
  
        dispatch(tagSkillRequest());

        const bearerToken = `Bearer ${  token}`;
        return fetch(`http://localhost:3001/tag-skill/delete/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': bearerToken
            }
        })
        .then(
            response => response.json(),
            error => {
                // console.log(error);
                dispatch(tagSkillFailure());
            }
        )
        .then(json => {
            dispatch(delTagSkillSuccess(json.message, id));
        })
        .catch(err => {
            //console.log(err);
            dispatch(tagSkillFailure());
        })
    }
  }

export const updateTagSkillSuccess = (message, id, content) => {
    return {
        type: UPDATE_TAG_SKILL_SUCCESS,
        message,
        id,
        content
    };
}

  export const fetchUpdateTagSkill = (id, content, token) => {

    return dispatch => {

        dispatch(tagSkillRequest(''));

        const bearerToken = `Bearer ${  token}`;

        return fetch('http://localhost:3001/tag-skill/update', {
            method: 'POST',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id,
                content
            })
        })
        .then(
            response => response.json(),
        )
        .then(json => {
            if (json.err)
                dispatch(tagSkillFailure(json.err));
            else{
                dispatch(updateTagSkillSuccess(json.message, id, content));
            }
            
        })
    }
}
