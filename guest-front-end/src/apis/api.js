import axios from "./axios";
export class Api{
  module = '';

  get axios(){
    return axios;
  }

  get tokenHeader() {
    const userToken = localStorage.getItem('userToken');
    return { authorization : userToken }
  }
  getUrl(path=""){
    if(!this.module) return '/';
    return `/${this.module}/${path}`
  }

  async exec(option) {
    if (!option) throw new Error("option undefined in exec")
    try {
      return await axios(option)
    } catch (resError) {
      // this.alertService.alert(resError.error.message, 'error');
      throw resError;
    }
  }

  async  getItem(id = ''){
    const setting = {
      method: 'GET',
      url: this.getUrl(id),
      headers: this.tokenHeader,
    }
    const response = await this.exec(setting);

    return response.data.results.object;
  }
}
const api  = new Api();
export default api;