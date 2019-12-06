import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  CircularProgress
} from '@material-ui/core';
import CssTextField from './CssTextField';
import ReactTags from 'react-tag-autocomplete'
import User from '../../apis/user';
import { fetchUser } from '../../actions/user';
import { connect } from 'react-redux';
import toast from '../../utils/toast';

const defaultJobs = ['Giáo viên','Giáo viên toán', 'Giáo viên hóa học', 'Giáo viên văn học', 'Giáo viên tiếng Anh', 'Lập trình viên','Freelancer'];

const Job = (props) => {
  const {user, fetchUser} = props;

  const [job, setJob] = useState(user.job);
  const [otherJob, setOtherJob] = useState("");
  const [loadSaveDone, setLoadSaveDone] = useState(true);
  const [tags, setTags] = useState([
    { id: 1, name: "React" },
    { id: 2, name: "Angular" }
  ])
  const [suggestions, setSuggestions] = useState([
    { id: 3, name: "Toán học" },
    { id: 4, name: "Văn học" },
    { id: 5, name: "Hóa học" },
    { id: 6, name: "Tiếng Anh" }
  ])

  function handleDelete(i) {
    setTags(tags.filter((tag, index) => index !== i));
  }

  function handleAddition(tag) {
    setTags([].concat(tags, tag));
  }


  const handleChange = event => {
    setJob(event.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoadSaveDone(false);
      const data = {
        job: job !== "0"? job: otherJob
      };
      const response = await User.updateInfo(data);
      fetchUser(response);
      console.log('data', data, response)

      setLoadSaveDone(true);
      toast.success('Cập nhật thành công');
    } catch (error) {
      console.log({ error });
      setLoadSaveDone(true);
      let message = 'Some thing wrong!';
      if (error.response && error.response.data && error.response.data.message) message = error.response.data.message;
      toast.error(message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="setting-form">
      <h4>Thông tin cơ bản</h4>
      <label className="text-label">
        Công việc hiện tại của bạn là gì?
            </label>

      <FormControl variant="outlined">
        <Select
          labelId="job"
          id="job-select"
          value={job}
          onChange={handleChange}
          displayEmpty 
        >
          <MenuItem value="" disabled>
            Chọn nghề nghiệp của bạn
          </MenuItem>
          {defaultJobs.map((item,index) => {
            return <MenuItem key={index} value={item}>{item}</MenuItem>
          })}
          <MenuItem value="0">
            Khác
          </MenuItem>
        </Select>
      </FormControl>
      {(job === '0') && <>
        <div className="mt-3"></div>
        <CssTextField
          variant="outlined"
          placeholder="Ví dụ: Freelance"
          value={otherJob}
          onChange={e => setOtherJob(e.target.value)}
        />
      </>
      }

      <label className="text-label">
        Những kĩ năng mà bạn sẽ dạy là gì?
    </label>

      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
      />

      <div className="actions">
        <button className="btn btn-primary">
          {loadSaveDone ? (
            'Cập nhật'
          ) : (
              <CircularProgress size={20} />
            )}
        </button>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps, { fetchUser })(Job);