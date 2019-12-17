import React, { useState, useEffect } from 'react';
import { TagSkill } from '../../apis';
import './Salary.scss';
import {  MenuItem, Select, InputLabel, FormControl, Tab, Tabs, AppBar } from '@material-ui/core';
import {  MuiPickersUtilsProvider, DatePicker  } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import LineChart from './LineChart';

function TabPanel(props) {
  const { children, value, index } = props;
  const [date, setDate] = React.useState('7day');
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());

  return (
    <div
      className="statistic-box"
    >
      {value === index && (
        <header className="filter-date">
          <FormControl className="select-date">
            <InputLabel id="demo-simple-select-label">Thời gian</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={date}
              onChange={e => setDate(e.target.value)}
            >
              <MenuItem value='7day'>7 ngày trước</MenuItem>
              <MenuItem value='30day'>30 ngày trước</MenuItem>
              <MenuItem value='custom'>Tùy chỉnh</MenuItem>
            </Select>
          </FormControl>

          <div className="pick-date">

            <span>từ</span>
            <DatePicker 
              disableToolbar
              variant="inline"
              format="DD/MM/YYYY"
              margin="normal"
              value={fromDate}
              onChange={date => setFromDate(date)}
            />
            <span>đến</span>
            <DatePicker 
              variant="inline"
              format="DD/MM/YYYY"
              margin="normal"
              value={toDate}
              onChange={date => setToDate(date)}
            />
          </div>
        </header>
      )}

      {value === index && <div className="pt-3 pb-5">{children}</div>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const Salary = (props) => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  async function reload() {
    try {
      setLoading(true);
      //const response = await TagSkill.getList();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      TagSkill.alert.error(error);
    }
  }

  useEffect(() => {
    reload()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <div className="page-wrapper teacher-info-container d-flex justify-content-center">
        <div className="spinner-wrapper mt-5" >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <div className="salary-container ">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"

          >
            <Tab label={<div className="statistic-title"><span>Số tiền nhận được</span><h5>12,000,000đ</h5></div>} {...a11yProps(0)} />
            <Tab label={<div className="statistic-title"><span>Số học sinh</span><h5>123</h5></div>} {...a11yProps(1)} />
            <Tab label={<div className="statistic-title"><span>Số hợp đồng</span><h5>321</h5></div>} {...a11yProps(2)} />
            <Tab label={<div className="statistic-title"><span>Chờ nhận tiền</span><h5>1,000,000đ</h5></div>} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <TabPanel value={value} index={0}>
            <LineChart />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LineChart />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <LineChart />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <LineChart />
          </TabPanel>
        </MuiPickersUtilsProvider>
      </div>
    </div>
  );
}


export default Salary;