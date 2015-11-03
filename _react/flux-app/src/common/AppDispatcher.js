import { Dispatcher } from 'flux';
import assign from 'object-assign';

export default assign(new Dispatcher(), {
  ajaxStart(action) {
    this.dispatch(assign(action, {_loading: true}));
  },
  ajaxEnd(action) {
    this.dispatch(assign(action, {_loading: false}));
  },
});

// 抛出最原始的dispatcher
// export default new Dispatcher();
