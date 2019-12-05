import React, { useState, useEffect } from 'react';
import {
  InputBase,
  CircularProgress
} from '@material-ui/core';
import CssTextField from './CssTextField';

const Salary = () => {
  const [loadSaveDone, setLoadSaveDone] = useState(true);
  const [salary, setSalary] = useState(0) ;
  function handleSubmit() {

  }

  return (
    <form onSubmit={handleSubmit} className="setting-form salary-form">
      <h4>Thu phí giảng dạy</h4>
      <div className="salary-field"> 
        <div className="salary-info">
          <p>Phí trên giờ</p>
          <span>Đây là tổng số tiền học sinh sẽ thấy</span>
        </div>
        <div className="salary-price">
            <CssTextField
            variant="outlined"
            placeholder="Ví dụ: Freelance"
            value={salary}
            onChange={e => setSalary(e.target.value)}
          />
          <span>/hr</span>
        </div>
      </div>

      <div className="salary-field"> 
        <div className="salary-info">
          <p>Hệ thống thu phí</p>
          <span>Hệ thống sẽ chiết khấu 20% thu nhập của bạn</span>
        </div>
        <div className="salary-price">
          <div> {Math.round(salary*0.2,3)} </div>
          <span>/hr</span>
        </div>
      </div>

      <div className="salary-field no-border"> 
        <div className="salary-info">
          <p>Số tiền bạn nhận được</p>
          <span>Số tiền sau khi trừ phí</span>
        </div>
        <div className="salary-price">
        <div> {Math.round(salary*0.8,3)} </div>
          <span>/hr</span>
        </div>
      </div>
      <div className="actions">
            <button className="btn btn-primary">
              {loadSaveDone ? (
                'Cập nhật'
              ) : (
                  <CircularProgress size={26} />
                )}
            </button>
    </div>
      </form>
  )
}

export default Salary;