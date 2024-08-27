import Message from './message'
import MessageBox from './message-box/main.js'
import locale from './locale'
import BaseAvatar from './avatar'
import Button from "./button/Button";
import ButtonGroup from "./button/ButtonGroup";
import Alert from "./alert/Alert";
import BaseBacktop from "./backtop/main";
import Carousel from "./carousel/Carousel";
import CarouselItem from "./carousel/CarouselItem";
import autocompleteSuggestions from "./autocomplete/autocomplete-suggestions";
import autocomplete from "./autocomplete/autocomplete";
import cascader from "./cascader/cascader";
import cascaderMenu from "./cascader-panel/cascader-menu";
import cascaderPanel from "./cascader-panel/cascader-panel";
import datePicker from "./date-picker/picker/date-picker";
import timePicker from "./date-picker/picker/time-picker";
import timeSelect from "./date-picker/picker/time-select";
import checkbox from "./checkbox/checkbox";
import checkboxButton from "./checkbox/checkbox-button";
import checkboxGroup from "./checkbox/checkbox-group";
import Loading from './loading/index.js';
import col from "./col/col";
import collapse from "./collapse/collapse";
import collapseItem from "./collapse/collapse-item";
import BaseColorPicker from './color-picker/main'
import BaseDialog from './dialog/Index'
import Divider from "./divider/Divider";
import Drawer from "./drawer/Drawer";
import dropdown from "./dropdown/dropdown";
import dropdownItem from "./dropdown/dropdown-item";
import dropdownMenu from "./dropdown/dropdown-menu";
import Form from "./form/Form";
import FormItem from "./form/FormItem";
import icon from "./icon/icon";
import BaseImage from './image/main'
import Input from "./input/Input";
import menu from "./menu/menu";
import menuItem from "./menu/menu-item";
import menuItemGroup from "./menu/menu-item-group";
import submenu from "./menu/submenu";
import pagination from "./pagination/pagination";
import Popover from './popover/index.js'
import Progress from "./progress/Progress";
import radio from "./radio/radio";
import radioButton from "./radio/radio-button";
import radioGroup from "./radio/radio-group";
import row from "./row/row";
import BaseScrollbar from "./scrollbar/index"
import Option from "./select/Option";
import OptionGroup from "./select/OptionGroup";
import Select from "./select/Select";
import SelectDropdown from "./select/SelectDropdown";
import BaseSwitch from './switch/index'
import BaseSkeleton from './skeleton'
import tabs from "./tabs/tabs";
import tabPane from "./tabs/tab-pane";
import Tag from "./tag/Tag";
import tooltip from "./tooltip/tooltip";
import BaseUpload from './upload/Index';
import BaseTable from './table';
import BaseTableColumn from './table-column';
import Timeline from './timeline';
import BaseTimelineItem from './timeline-item';
import Slider from './slider/main.vue'
import Skeleton from './skeleton';
import SkeletonItem from './skeleton-item';
import Step from './step';
import Steps from './steps';
import BaseEmpty from './empty'
import BaseRate from './rate'
import BaseBadge from './badge'
import BaseTree from './tree'
import Notification from './notification';
import BaseDescriptions from './descriptions'
import BaseDescriptionsItem from './descriptions-item'
import InputNumber from './input-number/input-number'
const components = [
    BaseAvatar,
    BaseBadge,
    Button,
    ButtonGroup,
    Alert,
    BaseBacktop,
    Carousel,
    CarouselItem,
    autocomplete,
    autocompleteSuggestions,
    cascaderMenu,
    cascader,
    cascaderPanel,
    datePicker,
    timePicker,
    timeSelect,
    checkbox,
    checkboxButton,
    checkboxGroup,
    col,
    collapse,
    collapseItem,
    BaseColorPicker,
    BaseDialog,
    Divider,
    Drawer,
    dropdown,
    dropdownItem,
    dropdownMenu,
    Form,
    FormItem,
    icon,
    BaseImage,
    Input,
    menu,
    menuItem,
    menuItemGroup,
    submenu,
    pagination,
    Progress,
    radio,
    radioButton,
    radioGroup,
    row,
    BaseScrollbar,
    Option,
    OptionGroup,
    Select,
    SelectDropdown,
    BaseSkeleton,
    BaseSwitch,
    tabs,
    tabPane,
    Tag,
    tooltip,
    BaseUpload,
    BaseTable,
    BaseTableColumn,
    Timeline,
    BaseTimelineItem,
    Slider,
    Skeleton,
    SkeletonItem,
    Step,Steps,
    BaseEmpty,
    BaseRate,
    BaseTree,
    BaseDescriptions,
    BaseDescriptionsItem,
    InputNumber
];
const BaseUI = {
  install: function(Vue, opts = {}) {
    locale.use(opts.locale)
    locale.i18n(opts.i18n)
    components.forEach(component => {
      if(opts.prefix){
        Vue.component(component.name.replace('Base',opts.prefix), component);
      }else{
        Vue.component(component.name, component);
      }
    });
    Vue.use(Loading);
    Vue.use(Popover,opts);
    Vue.prototype.$ELEMENT = {
      size: opts.size || '',
      zIndex: opts.zIndex || 2000
    }
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
  }
}

export default BaseUI
export {
  BaseAvatar,
  BaseBadge,
  Button,
  ButtonGroup,
  Alert,
  BaseBacktop,
  Carousel,
  CarouselItem,
  autocomplete,
  autocompleteSuggestions,
  cascaderMenu,
  cascader,
  cascaderPanel,
  datePicker,
  timePicker,
  timeSelect,
  checkbox,
  checkboxButton,
  checkboxGroup,
  col,
  collapse,
  collapseItem,
  BaseColorPicker,
  BaseDialog,
  Divider,
  Drawer,
  dropdown,
  dropdownItem,
  dropdownMenu,
  Form,
  FormItem,
  icon,
  BaseImage,
  Input,
  menu,
  menuItem,
  menuItemGroup,
  submenu,
  pagination,
  Popover,
  Progress,
  radio,
  radioButton,
  radioGroup,
  row,
  BaseScrollbar,
  Option,
  OptionGroup,
  Select,
  SelectDropdown,
  BaseSwitch,
  tabs,
  tabPane,
  Tag,
  tooltip,
  BaseUpload,
  BaseTable,
  BaseTableColumn,
  Timeline,
  BaseTimelineItem,
  Slider,
  Skeleton,
  SkeletonItem,
  Step,Steps,
  BaseEmpty,
  BaseRate,
  BaseTree
};
