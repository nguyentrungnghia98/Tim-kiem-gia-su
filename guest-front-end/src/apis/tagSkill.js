import {Api} from './api';

class TagSkill extends Api{
  constructor(){
    super();
    this.module = 'tagSkill';
  }

  async getList(){
    const setting = {
      method: 'GET',
      url: this.getUrl('getListTagSkill'),
      headers: this.tokenHeader,
    }
    const response = await this.exec(setting);

    return response.data.results.objects;
  }

}

export default TagSkill;
