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
}
const user = new User();
export default user;
