import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormSelect,
  Button,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

const CreateNewAccount = () => (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
        <PageTitle title="Tạo tài khoản quản trị mới" subtitle="Cài đặt" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <div className="create-account">
            <Col lg="6">
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
                                <label htmlFor="rePassword">Nhập lại mật khẩu</label>                              
                                <InputGroup seamless className="mb-3">
                                    <FormInput
                                    id="rePassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    />
                                    <InputGroupAddon type="append">
                                        <InputGroupText>
                                            <i className="material-icons">lock</i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="feInputFullName">Họ và tên</label>
                                <InputGroup seamless className="mb-3">
                                    <FormInput id="feInputFullName" placeholder="Nguyễn Văn A" />
                                    <InputGroupAddon type="append">
                                        <InputGroupText>
                                            <i className="material-icons">create</i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
  
                            <FormGroup>                        
                                <label htmlFor="feInputState">Vai trò</label>
                                <FormSelect id="feInputState">
                                    <option>Chọn...</option>
                                    <option>Admin</option>
                                    <option>Quản trị viên</option>
                                </FormSelect>
                            </FormGroup>
                               
                         <center><Button type="submit">Tạo tài khoản mới</Button></center>
                    </Form>
                 </ListGroupItem>
            </ListGroup>
        </Col>
      </div>
  </Container>
);

export default CreateNewAccount;
