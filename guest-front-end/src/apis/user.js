import {Api} from './api';

class User extends Api{
  constructor(){
    super();
    this.module = 'user';
  }

  async getInfo(){
    const setting = {
      method: 'GET',
      url: '/me',
      headers: this.tokenHeader,
    }
    const response = await this.exec(setting);

    return response.data.results.object;
  }

  async  updateInfo(data){
    const setting = {
      method: 'POST',
      url: this.getUrl('update'),
      headers: this.tokenHeader,
      data
    }
    const response = await this.exec(setting);

    return response.data.results.object;
  }

  async  changePassword(data){
    const setting = {
      method: 'POST',
      url: this.getUrl('changePassword'),
      headers: this.tokenHeader,
      data
    }
    const response = await this.exec(setting);

    return response.data;
  }
}
const user = new User();
export default user;
