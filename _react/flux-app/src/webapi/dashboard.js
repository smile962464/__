/*
 *
 */
import WebapiUtil from '../common/WebapiUtil';

class Dashboard extends WebapiUtil {
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

const dashboardApi = new Dashboard('dashboard.json');

export default dashboardApi;
