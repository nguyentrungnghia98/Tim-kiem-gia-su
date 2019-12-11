import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {Container, Row, Col, Card, CardBody} from "shards-react";

import PageTitle from "../components/common/PageTitle";

import {fetchListStudents} from '../actions/actionUser'



const ManagerStudents = (props) => {

// const [open, setOpen] = useState(false);
// const [content, setContent] = useState('');

const {listStudents, fetchListStudents} = props;

const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        await fetchListStudents(token);
      } catch (err) {
        console.log('err', err);
      }
    };
    fetchDataUser();
  }, []);

let rowsUser;

if(listStudents !== null){
  rowsUser = listStudents.map((user, index) => {
    return(
                <tr>
                  <td><center>{index+1}</center></td>
                  <td><center>{user.username}</center></td>
                  <td><center>{user.email}</center></td>
                  <td><center>{(user.status === 'active') ? <i class="material-icons icon-green">done</i> : <i class="material-icons icon-red">highlight_off</i>}</center></td>
                  <td><center>
                  <i class="material-icons icon-blue">
                  remove_red_eye
                  </i>
                  <i class="material-icons ml-2 icon-red">block</i>
                  </center></td>            
               </tr>
    )
});
}else{
  return <tr></tr>
}

return(
<Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Người dạy" subtitle="Quản lý" className="text-sm-left" />
    </Row>
    {/*{message ? <Container fluid className="px-0 mb-3">
                <Alert className="mb-0">
                <i className="fa fa-info mx-2"></i>{message}
                </Alert>
        </Container> : null}*/}
    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
            {/*<Button type="button" className="mr-3" onClick={() => setOpen(!open)}>Thêm Tag mới</Button>
            <Modal size="sm" open={open} toggle={() => setOpen(!open)} centered>
              <ModalHeader><center>Thêm tag kĩ năng mới</center></ModalHeader>
              <ModalBody className="p-3">
              
              <Form onSubmit={(e) => {e.preventDefault(); fetchAddTagSkill(content, token); setOpen(!open)}}>             
              <FormGroup>
                  <label htmlFor="feTagSkill">Tag kĩ năng</label>    
                      <FormInput
                      id="feTagSkill"
                      type="text"
                      value={content} onChange={(e) => setContent(e.target.value)} required
                      />

              </FormGroup><center>
              <Button theme="secondary" className="mr-3" type="button"  onClick={() => setOpen(!open)}>Đóng</Button>
              <Button type="submit">Tạo</Button></center>
              </Form>
              
              </ModalBody>
                </Modal>*/}
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                  <center>#</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Họ và tên</center>
                  </th>
                  <th scope="col" className="border-0">
                    <center>Email</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Trạng thái</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Chức năng</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowsUser}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </Container>
)
};

const mapStateToProps = (state) => {
  return {
      listStudents: state.authReducer.listStudents,
  };
};

export default connect(mapStateToProps,{fetchListStudents})(ManagerStudents);