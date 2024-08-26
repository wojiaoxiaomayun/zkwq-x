import Popover from './main';
import directive from './directive';
import Vue from 'vue';

Vue.directive('popover', directive);

/* istanbul ignore next */
Popover.install = function(Vue,opts = {}) {
  Vue.directive('popover', directive);
  if(opts.prefix){
    Vue.component(Popover.name.replace('Base',opts.prefix), Popover);
  }else{
    Vue.component(Popover.name, Popover);
  }
};
Popover.directive = directive;

export default Popover;
