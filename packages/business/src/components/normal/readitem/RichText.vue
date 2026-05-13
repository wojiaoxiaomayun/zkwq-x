<template>
  <vue-mathjax :formula="text" :options="mathOptions" :safe="false"></vue-mathjax>
</template>

<script>
import { VueMathjax } from 'vue-mathjax'
export default {
  name: 'RichText',
  components: {
    VueMathjax
  },
  data () {
    return {
      formula: null,
      mathOptions: {
        'HTML-CSS': {
          showMathMenu: false
        },
        'tex2jax': {
          inlineMath: [["$", "$"], ["\\(", "\\)"]],
          displayMath: [["$$", "$$"], ["\\[", "\\]"]]
        }
      }
    }
  },
  props: {
    text: String
  },
  methods: {
    formatChemicalFormula (formula) {
      // 完整化学元素列表
      const elements = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr"];

      // 处理电荷
      let chargeMatch = formula.match(/(\d*[+-]|\d+[+-])$/);
      let formatted = formula;
      let charge = '';

      if (chargeMatch) {
        charge = chargeMatch[0];
        formatted = formatted.substring(0, formatted.length - charge.length);
      }

      // 分步处理
      // 1. 处理括号后的数字
      formatted = formatted.replace(/([\]\)\}])(\d+)/g, '$1<sub>$2</sub>');

      // 2. 处理元素符号后的数字
      formatted = formatted.replace(
        /([A-Z][a-z]?\d+)/g,
        (match) => {
          // 分离元素符号和数字
          const elementMatch = match.match(/^([A-Z][a-z]?)(\d+)$/);
          if (elementMatch) {
            const [_, element, digits] = elementMatch;
            // 检查是否是已知元素
            if (elements.includes(element)) {
              return `${element}<sub>${digits}</sub>`;
            }
          }
          return match;
        }
      );

      // 3. 处理复杂分隔符后的元素
      formatted = formatted.replace(
        /([\-/@.\s({\[](?:[A-Z][a-z]?)?)([A-Z][a-z]?)(\d+)/g,
        (match, prefix, element, digits) => {
          // 检查是否是已知元素
          if (elements.includes(element)) {
            return prefix + element + `<sub>${digits}</sub>`;
          }
          return match;
        }
      );

      // 4. 处理连续元素符号
      formatted = formatted.replace(
        /([a-z])([A-Z][a-z]?)(\d+)/g,
        (match, prevChar, element, digits) => {
          // 检查是否是已知元素
          if (elements.includes(element)) {
            return prevChar + element + `<sub>${digits}</sub>`;
          }
          return match;
        }
      );

      // 恢复电荷
      if (charge) {
        formatted += '<sup>' + charge + '</sup>';
      }

      return formatted;
    }
  },
  mounted () {
    //this.formula  = this.formatChemicalFormula(this.text)
    this.formula  = this.text
  }
}
</script>

<style scoped>

</style>
