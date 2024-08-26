import Color from './color.legacy.js';
export const ColorMix = (color1, color2, weight = 0.5) => {
  if (weight > 1) weight = 1;
  if (weight < 0) weight = 0;
  let color1Obj = new Color(color1);
  let color2Obj = new Color(color2);
  let hex = new Color(`rgb(${(color1Obj.coords[0] * weight + color2Obj.coords[0] * (1 - weight)) * 255},${(color1Obj.coords[1] * weight + color2Obj.coords[1] * (1 - weight)) * 255},${(color1Obj.coords[2] * weight + color2Obj.coords[2] * (1 - weight)) * 255})`).toString({ format: 'hex' });
  if (hex.length < 7) {
    let arr = []
    for (let i = 0; i < 7 - hex.length; i++) {
      arr.push('0')
    }
    hex = hex + arr.join('')
  }
  return hex;
}
export const onlineChangeBaseUI = (dom,options = {}) => {
  // 获取文档的根元素
  const root = dom || document.documentElement;
  const varOptions = {
    primary:'--base-ui-primary',
    success:'--base-ui-success',
    warning:'--base-ui-warning',
    danger:'--base-ui-danger',
    info:'--base-ui-info',
  }
  const BaseUIColors = {
    primary: '#2F3A91',
    success: '#67C23A',
    warning: '#FF791A',
    danger: '#F1403C',
    info: '#8590a6'
  };
  options.primary = options.primary || BaseUIColors.primary;
  options.success = options.success || BaseUIColors.success;
  options.warning = options.warning || BaseUIColors.warning;
  options.danger = options.danger || BaseUIColors.danger;
  options.info = options.info || BaseUIColors.info;
  root.style.setProperty(varOptions.primary, options.primary);
  [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].forEach((scale,index) => {
    root.style.setProperty(`${varOptions.primary}-F-${index}`, ColorMix('#FFFFFF', options.primary, scale));
    root.style.setProperty(`${varOptions.primary}-0-${index}`, ColorMix('#000000', options.primary, scale));
  })
  root.style.setProperty(varOptions.success, options.success);
  [0.8, 0.9].forEach((scale,index) => {
    root.style.setProperty(`${varOptions.success}-F-${index}`, ColorMix('#FFFFFF', options.success, scale));
    root.style.setProperty(`${varOptions.success}-0-${index}`, ColorMix('#000000', options.success, scale));
  })
  root.style.setProperty(varOptions.warning, options.warning);
  [0.8, 0.9].forEach((scale,index) => {
    root.style.setProperty(`${varOptions.warning}-F-${index}`, ColorMix('#FFFFFF', options.warning, scale));
    root.style.setProperty(`${varOptions.warning}-0-${index}`, ColorMix('#000000', options.warning, scale));
  })
  root.style.setProperty(varOptions.danger, options.danger);
  [0.8, 0.9].forEach((scale,index) => {
    root.style.setProperty(`${varOptions.danger}-F-${index}`, ColorMix('#FFFFFF', options.danger, scale));
    root.style.setProperty(`${varOptions.danger}-0-${index}`, ColorMix('#000000', options.danger, scale));
  })
  root.style.setProperty(varOptions.info, options.info);
  [0.8, 0.9].forEach((scale,index) => {
    root.style.setProperty(`${varOptions.info}-F-${index}`, ColorMix('#FFFFFF', options.info, scale));
    root.style.setProperty(`${varOptions.info}-0-${index}`, ColorMix('#000000', options.info, scale));
  })
}