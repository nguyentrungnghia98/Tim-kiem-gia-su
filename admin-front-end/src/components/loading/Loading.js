import React from 'react'
import {Container} from 'shards-react'

const Loading = () => {
    return(
        <Container fluid className="main-content-container">
            <div className="error">
                <div className="error__content">
                <h4>Loading...</h4>
                </div>
            </div>
        </Container>)
};

export default Loading;