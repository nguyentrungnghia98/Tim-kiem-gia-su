const KEYS = {
  SECRET_KEY: "1612419_1612421_1612424",
  EXPIRE_IN: "365d"
}


const prod = {
  ...KEYS,
  url: {
    API_URL: 'https://backend-giasu.herokuapp.com/',
  }
}

const dev = {
  ...KEYS,
  url: {
    API_URL: 'http://localhost:3001'
  }
};

export default  process.env.NODE_ENV === 'development' ? dev : prod;