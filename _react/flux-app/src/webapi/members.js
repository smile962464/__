import WebapiUtil from '../common/WebapiUtil';

class Members extends WebapiUtil {
  constructor(url) {
    super(url);
  }
  get() {
    return new Promise((resolve, reject) => {
      super.get(this.url).end((error, res) => {
        error ? reject(error) : resolve(res);
      });
    });
  }
}

const membersApi = new Members('members.json');

export default membersApi;
