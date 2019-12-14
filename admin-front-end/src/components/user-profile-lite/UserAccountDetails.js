import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Alert
} from "shards-react";

const UserAccountDetails = (props) => {

  const {userInfo, message, fetchUpdate} = props;

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const token = localStorage.getItem('token');

  return (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <center><h4 className="m-0">Cập nhật tài khoản</h4></center>
    </CardHeader>
    {message ? <Container fluid className="px-0 mb-3">
                <Alert className="mb-0">
                <i className="fa fa-info mx-2"></i>{message}
                </Alert>
            </Container> : null}
    <ListGroup flush>
                    <ListGroupItem className="p-3">
                        <Form onSubmit={(e) => {e.preventDefault(); fetchUpdate(password, rePassword, token)}}>             

                        <FormGroup>
                        <label htmlFor="feInputFullName">Họ và tên</label>
                        <InputGroup seamless className="mb-3">
                            <FormInput type="text" id="feInputFullName" value={userInfo.fullName} disabled/>
                            <InputGroupAddon type="append">
                                <InputGroupText>
                                    <i className="material-icons">create</i>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                          </FormGroup>

                            <FormGroup>
                                <label htmlFor="feEmailAddress">Email</label>
                                <InputGroup seamless className="mb-3">
                                    <FormInput
                                    id="feEmailAddress"
                                    type="email"
                                    value={userInfo.email || ''} 
                                    required
                                    disabled
                                    />
                                    <InputGroupAddon type="append">
                                        <InputGroupText>
                                            <i className="material-icons">email</i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
      
                            <FormGroup> 
                                <label htmlFor="fePassword">Mật khẩu mới</label>                              
                                <InputGroup seamless className="mb-3">
                                    <FormInput
                                    id="fePassword"
                                    type="password"
                                    placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <InputGroupAddon type="append">
                                        <InputGroupText>
                                            <i className="material-icons">lock</i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>  

                            <FormGroup> 
                                <label htmlFor="rePassword">Nhập lại mật khẩu mới</label>                              
                                <InputGroup seamless className="mb-3">
                                    <FormInput
                                    id="rePassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu" value={rePassword} onChange={(e) => setRePassword(e.target.value)}
                                    />
                                    <InputGroupAddon type="append">
                                        <InputGroupText>
                                            <i className="material-icons">lock</i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                            
  
                            <FormGroup>                        
                                <label htmlFor="feInputState">Vai trò</label>
                                <FormSelect id="feInputState" value={userInfo.role} disabled>
                                    <option hidden>Chọn...</option>
                                    <option>Admin</option>
                                    <option>Quản trị viên</option>
                                </FormSelect>
                            </FormGroup>
                               
                         <center>
                         
                         <Button type="submit" >Cập nhật</Button>
                         </center>
                    </Form>
                 </ListGroupItem>
            </ListGroup>
  </Card>);
};

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails;
