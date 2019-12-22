
import {sha256} from 'js-sha256';
export default {
    verifyToken: (checksumToken, timestamp) => {
        const token = sha256.hex(`${process.env.API_USER || process.env.REACT_APP_API_USER}|${timestamp}|${process.env.API_PASSWORD || process.env.REACT_APP_API_PASSWORD}`);
        
        return token === checksumToken;
    },
    genarateToken: (timestamp) => {
        return sha256.hex(`${process.env.API_USER || process.env.REACT_APP_API_USER}|${timestamp}|${process.env.API_PASSWORD || process.env.REACT_APP_API_PASSWORD}`);
    }
}