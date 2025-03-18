import BaseTimelineItem from '../timeline/src/item';

/* istanbul ignore next */
BaseTimelineItem.install = function(Vue) {
  Vue.component(BaseTimelineItem.name, BaseTimelineItem);
};

export default BaseTimelineItem;
