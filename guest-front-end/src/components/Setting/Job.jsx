import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@material-ui/core';
import CssTextField from './CssTextField';
import ReactTags from 'react-tag-autocomplete'

const KeyCodes = {
  comma: 9,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Job = () => {
  const [job, setJob] = useState("0");
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

  function handleDelete (i) {
    setTags(tags.filter((tag, index) => index !== i));
  }
 
  function handleAddition (tag) {
    setTags([].concat(tags, tag));
  }

  function handleDrag(tag, currPos, newPos) {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  }

  const handleChange = event => {
    setJob(event.target.value);
  };

  function handleSubmit() {

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
        >

          <MenuItem value={10}>Lập trình viên</MenuItem>
          <MenuItem value={20}>Giáo viên hóa học</MenuItem>
          <MenuItem value={30}>Giáo viên toán</MenuItem>
          <MenuItem value="0">
            Khác
          </MenuItem>
        </Select>
      </FormControl>
      {(job === '' || job === '0') && <>
      <div className="mt-3"></div>
      <CssTextField
        variant="outlined"
        placeholder="Ví dụ: Freelance"
        value={job}
        onChange={e => setJob(e.target.value)}
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
                  <CircularProgress size={26} />
                )}
            </button>
    </div>
    </form>
  )
}

export default Job;