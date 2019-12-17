import { Api } from './api';

class User extends Api {
  constructor() {
    super();
    this.module = 'user';
  }

  async getInfo() {
    const setting = {
      method: 'GET',
      url: '/me',
      headers: this.tokenHeader,
    }
    const response = await this.exec(setting);

    return response.data.results.object;
  }

  async  updateInfo(data) {
    const setting = {
      method: 'POST',
      url: this.getUrl('update'),
      headers: this.tokenHeader,
      data
    }
    const response = await this.exec(setting);

    return response.data.results.object;
  }

  async  changePassword(data) {
    const setting = {
      method: 'POST',
      url: this.getUrl('changePassword'),
      headers: this.tokenHeader,
      data
    }
    const response = await this.exec(setting);

    return response.data;
  }

  async  getListTeacher(data, reload = false) {
    const setting = {
      method: 'POST',
      url: this.getUrl('getListTeacher'),
      headers: this.tokenHeader,
      data
    }
    const hashedQuery = this.hash({...data, url:'getListTeacher' });
    if (
      this.hashCache[hashedQuery] &&
      this.hashCache[hashedQuery].expired > new Date()
    ) {
      let items = this.hashCache[hashedQuery].item;
      return items;
    }

    const response = await this.exec(setting);
    const item =  response.data.results.object;

    this.hashCache[hashedQuery] = {
      item,
      expired: this.moment()
          .add(3, "minutes")
          .toDate(),
      isGetList: true
    };
    return item;
    
  }

}

export default User;
