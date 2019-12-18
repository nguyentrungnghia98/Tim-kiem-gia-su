import {Api} from './api';

class Contract extends Api{
  constructor(){
    super();
    this.module = 'contract';
  }

  async create(data){
    const setting = {
      method: 'POST',
      url: this.getUrl('create'),
      headers: this.tokenHeader,
      data
    }
    const response = await this.exec(setting);

    return response.data.results.object;
  }

  async  getList(data){
    const setting = {
      method: 'POST',
      url: this.getUrl('getList'),
      headers: this.tokenHeader,
      data
    }
    const response = await this.exec(setting);

    return response.data.results.object;
  }

  async  getListReview(data){
    const setting = {
      method: 'POST',
      url: this.getUrl('getListReview'),
      headers: this.tokenHeader,
      data
    }
    const response = await this.exec(setting);

    return response.data.results.object;
  }

  async  update(data){
    const setting = {
      method: 'POST',
      url: this.getUrl('update'),
      headers: this.tokenHeader,
      data
    }
    const response = await this.exec(setting);

    return response.data.results.object;
  }
}

export default Contract;
