import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  Button,
  Container,
  Card,
  CardHeader,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert
} from "shards-react";

const FormLogin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {isLoggedIn, fetchLogin, isFetching, message} = props;
    const token = localStorage.getItem('token');
    if(isLoggedIn || token !== null)
    return(
      <Redirect push to="/create-account" />
    );

    return( <div>
        
    <Container fluid className="login">
        <Col lg="4">
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <center><h3 className="m-0">Đăng nhập</h3></center>
                </CardHeader>
                {message ? <Container fluid className="px-0">
                <Alert className="mb-0">
                <i className="fa fa-info mx-2"></i>{message}
                </Alert>
            </Container> : null}
                
                <ListGroup flush>
                    <ListGroupItem className="p-3">
                        <Form onSubmit={(e) => {e.preventDefault();fetchLogin(email,password)}}>          
                            <FormGroup>
                                <label htmlFor="feEmailAddress">Email</label>
                                <InputGroup seamless className="mb-3">
                                    <FormInput
                                    id="feEmailAddress"
                                    type="email"
                                    placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                    />
                                    <InputGroupAddon type="append">
                                        <InputGroupText>
                                            <i className="material-icons">email</i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                            
                            <FormGroup> 
                                <label htmlFor="fePassword">Mật khẩu</label>                              
                                <InputGroup seamless className="mb-3">
                                    <FormInput
                                    id="fePassword"
                                    type="password"
                                    placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required
                                    />
                                    <InputGroupAddon type="append">
                                        <InputGroupText>
                                            <i className="material-icons">lock</i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>  
                                
                            <FormGroup>
                                <FormCheckbox>
                                {/* eslint-disable-next-line */}Lưu mật khẩu
                                </FormCheckbox>
                            </FormGroup>

                            <center><Button type="submit" disabled={isFetching}>Đăng nhập</Button></center>
                        </Form>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Container>
    </div>
    )
  
};

export default FormLogin;
