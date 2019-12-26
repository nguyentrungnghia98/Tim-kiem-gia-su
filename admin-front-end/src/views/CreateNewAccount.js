import React,{useState} from "react";
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
  InputGroupAddon,
  Alert
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

const CreateNewAccount = (props) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [role, setRole] = useState('');
    const [visibleMess, setVisibleMess] = useState(true);

    const {isFetching, message, fetchRegister} = props;

    let messageErr = message;
    if (password !== rePassword && rePassword)
    {
        messageErr = 'Mật khẩu không trùng khớp !';
    }

    return(
    <Container fluid className="main-content-container px-4 mb-3">
        <Row noGutters className="page-header py-4">
        <PageTitle title="Tạo tài khoản quản trị mới" subtitle="Cài đặt" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        {messageErr ? <Container fluid className="px-0 mb-3">
                <Alert className="mb-0" dismissible={() => setVisibleMess(false)} open={visibleMess}>
                <i className="fa fa-info mx-2"></i>{messageErr}
                </Alert>
            </Container> : null}
        <div className="create-account">
            <Col lg="6">
                <ListGroup flush>
                    <ListGroupItem className="p-3">
                        <Form onSubmit={(e) => {e.preventDefault(); fetchRegister(email,password,fullName, role);}}>             
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
                                <label htmlFor="rePassword">Nhập lại mật khẩu</label>                              
                                <InputGroup seamless className="mb-3">
                                    <FormInput
                                    id="rePassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required
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
                                    <FormInput id="feInputFullName" placeholder="Nguyễn Văn A" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                                    <InputGroupAddon type="append">
                                        <InputGroupText>
                                            <i className="material-icons">create</i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
  
                            <FormGroup>                        
                                <label htmlFor="feInputState">Vai trò</label>
                                <FormSelect required id="feInputState" onChange={(e) => setRole(e.target.value)}>
                                    <option hidden>Chọn...</option>
                                    <option value="admin">Admin</option>
                                    <option value="moderater">Quản trị viên</option>
                                </FormSelect>
                            </FormGroup>    
                               
                         <center><Button type="submit" disabled={isFetching || password !== rePassword}>Tạo tài khoản mới</Button></center>
                    </Form>
                 </ListGroupItem>
            </ListGroup>
        </Col>
      </div>
  </Container>
)};

export default CreateNewAccount;
