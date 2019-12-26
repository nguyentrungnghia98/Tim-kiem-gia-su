const prod = {
  url : 'https://server-gia-su.herokuapp.com'
}

const dev = {
  url:  'http://localhost:3002'
};

export default  process.env.NODE_ENV === 'development' ? dev : prod;