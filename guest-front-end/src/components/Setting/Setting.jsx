import React,{ useState } from 'react';
import {
  Typography,
  Box,
  makeStyles,
  Tabs,
  Tab,
} from '@material-ui/core';
import User from "../../apis/user";
import './Setting.scss'
import BasicInfo from './BasicInfo';
import Job from './Job';
import Salary from './Salary';
import ChangePassword from './ChangePassword';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'space-between'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "30%"
  },
  tab: {
    background: 'white',
    boxShadow: '0 4px 12px #c7c7c7',
    width: "63%",
    '& > div': {
      padding: '8px 20px 0'
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%'
  }
}));


const Setting = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="setting page-wrapper">
      <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Thông tin cơ bản" icon={<i className="fas fa-user"/>} {...a11yProps(0)} />
            <Tab label="Nghề nghiệp và kĩ năng" icon={<i className="fas  fa-graduation-cap"/>} {...a11yProps(1)} />
            <Tab label="Thu thập" icon={<i className="fas fa-dollar-sign"/>} {...a11yProps(2)} />
            <Tab label="Đổi mật khẩu" icon={<i className="fas fa-key"/>} {...a11yProps(3)} />
          </Tabs>
          <TabPanel className={classes.tab} value={value} index={0}>
            <BasicInfo/>
          </TabPanel>
          <TabPanel className={classes.tab} value={value} index={1}>
            <Job/>
          </TabPanel>
          <TabPanel className={classes.tab} value={value} index={2}>
            <Salary/>
          </TabPanel>
          <TabPanel className={classes.tab} value={value} index={3}>
            <ChangePassword/>
          </TabPanel>
        </div>
    </div>
  )
}

export default Setting;