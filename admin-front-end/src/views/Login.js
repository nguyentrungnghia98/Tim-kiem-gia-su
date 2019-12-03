import React from "react";
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
  InputGroupText
} from "shards-react";

const FormLogin = () => (

    <Container fluid className="login">
        <Col lg="4">
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <center><h3 className="m-0">Đăng nhập</h3></center>
                </CardHeader>

                <ListGroup flush>
                    <ListGroupItem className="p-3">
                        <Form>          
                            <FormGroup>
                                <label htmlFor="feEmailAddress">Email</label>
                                <InputGroup seamless className="mb-3">
                                    <FormInput
                                    id="feEmailAddress"
                                    type="email"
                                    placeholder="Email"
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
                                    placeholder="Mật khẩu"
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

                            <center><Button type="submit">Đăng nhập</Button></center>
                        </Form>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Container>
  
);

export default FormLogin;
