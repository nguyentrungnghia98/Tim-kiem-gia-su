import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import {Alert, Container, Row, Col, Card, CardHeader, CardBody , Button,Modal, ModalBody, ModalHeader, Form, FormGroup, FormInput} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Loading from "../components/loading/Loading";

import {fetchTagSkill, fetchAddTagSkill, fetchDelTagSkill, fetchUpdateTagSkill} from '../actions/actionTagSkill'



const TagSkill = (props) => {

const [openModalAdd, setOpenModalAdd] = useState(false);
const [openModalDel, setOpenModalDel] = useState(false);
const [openModalUp, setOpenModalUp] = useState(false);
const [content, setContent] = useState('');
const [id, setId] = useState('');

const {message, tagskills, fetchTagSkill, fetchAddTagSkill,fetchDelTagSkill, fetchUpdateTagSkill} = props;

const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDataTagSkill = async () => {
      try {
        const token = localStorage.getItem('token');
        await fetchTagSkill(token);

      } catch (err) {
        console.log('err', err);
      }
    };
    fetchDataTagSkill();
  }, []);
console.log(tagskills);

let rowsTagSkill;

if(tagskills !== null){
  rowsTagSkill = tagskills.map((tagskill, index) => {
    return(
              
                <tr key={index}>
                  <td><center>{index+1}</center></td>
                  <td><center>{tagskill.content}</center></td>
                  <td><center>{tagskill.numOfTeacher}</center></td>
                  <td><center>
                  <Button theme="while" className="p-0 btn-icon" title="Chỉnh sửa" onClick={() => {setOpenModalUp(!openModalUp); setContent(tagskill.content); setId(tagskill._id)}}><i className="material-icons icon-blue">
                  edit
                  </i></Button>
                  <Button theme="while" className="p-0 btn-icon" title="Xóa" onClick={() => {setOpenModalDel(!openModalDel); setContent(tagskill.content); setId(tagskill._id)}}><i className="material-icons ml-2 icon-red">delete</i></Button>
                  </center></td>
                  
               </tr>
    )
});
}else{
  return <Loading/>
}

return(
<Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Tag kĩ năng" subtitle="Quản lý" className="text-sm-left" />
    </Row>
    {message ? <Container fluid className="px-0 mb-3">
                <Alert className="mb-0">
                <i className="fa fa-info mx-2"></i>{message}
                </Alert>
            </Container> : null}
    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
          <strong className="d-block">
            
            <span className="pt-2 fs-header-table">Danh sách tag kĩ năng </span>
            <Button type="button" className="ml-3 " onClick={() => {setOpenModalAdd(!openModalAdd); setContent('')}}>Thêm Kĩ năng mới</Button>
            <Modal size="sm" open={openModalAdd} toggle={() => setOpenModalAdd(!openModalAdd)} centered>
              <ModalHeader><center>Thêm tag kĩ năng mới</center></ModalHeader>
              <ModalBody className="p-3">
              
              <Form onSubmit={(e) => {e.preventDefault(); fetchAddTagSkill(content, token); setOpenModalAdd(!openModalAdd)}}>             
              <FormGroup>
                  <label htmlFor="feTagSkill">Tag kĩ năng</label>    
                      <FormInput
                      id="feTagSkill"
                      type="text"
                      value={content} onChange={(e) => setContent(e.target.value)} required
                      />

              </FormGroup><center>
              <Button theme="secondary" className="mr-3" type="button"  onClick={() => setOpenModalAdd(!openModalAdd)}>Đóng</Button>
              <Button type="submit">Tạo</Button></center>
              </Form>
              
              </ModalBody>
            </Modal>
            </strong>       
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                  <center>#</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Tag kĩ năng</center>
                  </th>
                  <th scope="col" className="border-0">
                    <center>Số lượng giáo viên</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Chức năng</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                
                  {rowsTagSkill}
                
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>

    <Modal size="sm" open={openModalUp} toggle={() => setOpenModalUp(!openModalUp)} centered>
      <ModalHeader><center>Cập nhật tag kĩ năng</center></ModalHeader>
      <ModalBody className="p-3">
      
      <Form onSubmit={(e) => {e.preventDefault(); fetchAddTagSkill(content, token); setOpenModalUp(!openModalUp)}}>             
      <FormGroup>
          <label htmlFor="feTagSkill">Tag kĩ năng</label>    
              <FormInput
              id="feTagSkill"
              type="text"
              value={content} onChange={(e) => setContent(e.target.value)} required
              />
        <input type="text" value={id} hidden/>
      </FormGroup><center>
      <Button theme="secondary" className="mr-3" type="button"  onClick={() => setOpenModalUp(!openModalUp)}>Đóng</Button>
      <Button type="submit" onClick={() => {setOpenModalUp(!openModalUp); fetchUpdateTagSkill(id,content, token)}}>Cập nhật</Button></center>
      </Form>
      
      </ModalBody>
    </Modal>

    <Modal size="sm" open={openModalDel} toggle={() => setOpenModalDel(!openModalDel)} centered>
      <ModalHeader>Xóa tag kĩ năng</ModalHeader>
      <ModalBody className="p-3">

        <label className="mb-3">Bạn có chắc chắn muốn xóa tag kĩ năng <b className="text-danger">{content}</b> ?</label>    
      <center>
        <Button theme="secondary" className="mr-3" type="button"  onClick={() => setOpenModalDel(!openModalDel)}>Đóng</Button>
        <Button type="submit"  onClick={() => {setOpenModalDel(!openModalDel); fetchDelTagSkill(token,id)}}>Xóa</Button>
      </center>

      
      </ModalBody>
    </Modal>
    </Container>
)
};

const mapStateToProps = (state) => {
  return {
      tagskills: state.tagSkillReducer.tagskills,
      message: state.tagSkillReducer.message,
  };
};

export default connect(mapStateToProps,{fetchTagSkill, fetchAddTagSkill, fetchDelTagSkill, fetchUpdateTagSkill})(TagSkill);