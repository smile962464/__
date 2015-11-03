/*
 *
 */
import WebapiUtil from '../common/webapiUtil';

class Webapi extends WebapiUtil {
  constructor(url) {
    super(url);
  }
  get() {
    return new Promise((resolve, reject) => {
      // debugger
      super.get(this.url).query({page: 'jry'}).end((error, res) => {
        error ? reject(error) : resolve(res);
      });
    });
  }
  save() {
    return this.save(this.url);
  }
}

const appApi = new Webapi('app.json');

export default appApi;
