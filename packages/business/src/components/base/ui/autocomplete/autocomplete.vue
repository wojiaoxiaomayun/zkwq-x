<template>
  <div
    class="base-autocomplete"
    v-clickoutside="close"
    aria-haspopup="listbox"
    role="combobox"
    :aria-expanded="suggestionVisible"
    :aria-owns="id"
  >
    <base-input
      ref="input"
      :show-label="showLabel"
      :ripple="ripple"
      v-bind="[$props, $attrs]"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
      @keydown.down.native.prevent="highlight(highlightedIndex + 1)"
      @keydown.enter.native="handleKeyEnter"
      @keydown.native.tab="close"
      @key-up-enter="handleKeyUpEnter"
    >
      <template slot="prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append" v-if="$slots.append">
        <slot name="append"></slot>
      </template>
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </template>
    </base-input>
    <base-autocomplete-suggestions
      :visible-arrow = "false"
      :class="[popperClass ? popperClass : '']"
      :popper-options="popperOptions"
      :append-to-body="popperAppendToBody"
      ref="suggestions"
      :placement="placement"
      :id="id">
      <li
        v-for="(item, index) in suggestions"
        :key="index"
        :class="{'highlighted': highlightedIndex === index}"
        @click="select(item)"
        :id="`${id}-item-${index}`"
        role="option"
        :aria-selected="highlightedIndex === index"
      >
        <slot :item="item">
          {{ item[valueKey] }}
        </slot>
      </li>
    </base-autocomplete-suggestions>
  </div>
</template>
<script>
  import debounce from '../util/debounce';
  import BaseInput from '../input/Input';
  import Clickoutside from '../util/clickoutside';
  import BaseAutocompleteSuggestions from './autocomplete-suggestions.vue';
  import Emitter from '../mixin/emitter';
  import Migrating from '../mixin/migrating';
  import { generateId } from '../util';
  import Focus from '../mixin/focus';

  export default {
    name: 'BaseAutocomplete',

    mixins: [Emitter, Focus('input'), Migrating],

    inheritAttrs: false,

    componentName: 'BaseAutocomplete',

    components: {
      BaseInput,
      BaseAutocompleteSuggestions
    },

    directives: { Clickoutside },

    props: {
      valueKey: {
        type: String,
        default: 'value'
      },
      popperClass: String,
      popperOptions: Object,
      placeholder: String,
      clearable: {
        type: Boolean,
        default: false
      },
      showLabel: {
        type: Boolean,
        default: true
      },
      ripple: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
      name: String,
      size: String,
      value: String,
      maxlength: Number,
      minlength: Number,
      autofocus: Boolean,
      fetchSuggestions: Function,
      triggerOnFocus: {
        type: Boolean,
        default: true
      },
      customItem: String,
      selectWhenUnmatched: {
        type: Boolean,
        default: false
      },
      prefixIcon: String,
      suffixIcon: String,
      label: String,
      debounce: {
        type: Number,
        default: 300
      },
      placement: {
        type: String,
        default: 'bottom-start'
      },
      hideLoading: Boolean,
      popperAppendToBody: {
        type: Boolean,
        default: true
      },
      highlightFirstItem: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        activated: false,
        suggestions: [],
        loading: false,
        highlightedIndex: -1,
        suggestionDisabled: false
      };
    },
    computed: {
      suggestionVisible() {
        const suggestions = this.suggestions;
        let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
        return (isValidData || this.loading) && this.activated;
      },
      id() {
        return `base-autocomplete-${generateId()}`;
      }
    },
    watch: {
      suggestionVisible(val) {
        let $input = this.getInput();
        if ($input) {
          this.broadcast('BaseAutocompleteSuggestions', 'visible', [val, $input.offsetWidth]);
        }
      }
    },
    methods: {
      getMigratingConfig() {
        return {
          props: {
            'custom-item': 'custom-item is removed, use scoped slot instead.',
            'props': 'props is removed, use value-key instead.'
          }
        };
      },
      getData(queryString) {
        if (this.suggestionDisabled) {
          return;
        }
        if (!queryString || queryString.length < 2) {
          return;
        }
        this.loading = true;
        this.fetchSuggestions(queryString, (suggestions) => {
          this.loading = false;
          if (this.suggestionDisabled) {
            return;
          }
          if (Array.isArray(suggestions)) {
            this.suggestions = suggestions;
            this.highlightedIndex = this.highlightFirstItem ? 0 : -1;
          } else {
            console.error('[Element Error][Autocomplete]autocomplete suggestions must be an array');
          }
        });
      },
      handleInput(value) {
        this.$emit('input', value);
        this.suggestionDisabled = false;
        if (!this.triggerOnFocus && !value) {
          this.suggestionDisabled = true;
          this.suggestions = [];
          return;
        }
        this.debouncedGetData(value);
      },
      handleChange(value) {
        this.$emit('change', value);
      },
      handleFocus(event) {
        this.activated = true;
        this.$emit('focus', event);
        if (this.triggerOnFocus) {
          this.debouncedGetData(this.value);
        }
      },
      handleBlur(event) {
        this.$emit('blur', event);
      },
      handleKeyUpEnter() {
        this.$emit('key-up-enter')
      },
      handleClear() {
        this.activated = false;
        this.$emit('clear');
      },
      close(e) {
        this.activated = false;
      },
      handleKeyEnter(e) {
        if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
          e.preventDefault();
          this.select(this.suggestions[this.highlightedIndex]);
        } else if (this.selectWhenUnmatched) {
          this.$emit('select', {value: this.value});
          this.$nextTick(_ => {
            this.suggestions = [];
            this.highlightedIndex = -1;
          });
        }
      },
      select(item) {
        this.$emit('input', item[this.valueKey]);
        this.$emit('select', item);
        this.$nextTick(_ => {
          this.suggestions = [];
          this.highlightedIndex = -1;
        });
      },
      highlight(index) {
        if (!this.suggestionVisible || this.loading) { return; }
        if (index < 0) {
          this.highlightedIndex = -1;
          return;
        }
        if (index >= this.suggestions.length) {
          index = this.suggestions.length - 1;
        }
        const suggestion = this.$refs.suggestions.$el.querySelector('.base-autocomplete-suggestion__wrap');
        const suggestionList = suggestion.querySelectorAll('.base-autocomplete-suggestion__list li');

        let highlightItem = suggestionList[index];
        let scrollTop = suggestion.scrollTop;
        let offsetTop = highlightItem.offsetTop;

        if (offsetTop + highlightItem.scrollHeight > (scrollTop + suggestion.clientHeight)) {
          suggestion.scrollTop += highlightItem.scrollHeight;
        }
        if (offsetTop < scrollTop) {
          suggestion.scrollTop -= highlightItem.scrollHeight;
        }
        this.highlightedIndex = index;
        let $input = this.getInput();
        $input.setAttribute('aria-activedescendant', `${this.id}-item-${this.highlightedIndex}`);
      },
      getInput() {
        return this.$refs.input.getInput();
      },
      destroy () {
        this.$refs.suggestions.$destroy();
      }
    },
    mounted() {
      this.debouncedGetData = debounce(this.debounce, this.getData);
      this.$on('item-click', item => {
        this.select(item);
      });
      let $input = this.getInput();
      $input.setAttribute('role', 'textbox');
      $input.setAttribute('aria-autocomplete', 'list');
      $input.setAttribute('aria-controls', 'id');
      $input.setAttribute('aria-activedescendant', `${this.id}-item-${this.highlightedIndex}`);
    },
    beforeDestroy() {
      this.$refs.suggestions.$destroy();
    }
  };
</script>
