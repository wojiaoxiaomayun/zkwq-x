import BaseTableColumn from '../table/src/table-column';

/* istanbul ignore next */
BaseTableColumn.install = function(Vue) {
  Vue.component(BaseTableColumn.name, BaseTableColumn);
};

export default BaseTableColumn;
