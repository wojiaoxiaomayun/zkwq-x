<template>
  <transition name="base-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="base-autocomplete-suggestion base-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <base-scrollbar
        alone
        tag="ul"
        wrap-class="base-autocomplete-suggestion__wrap"
        view-class="base-autocomplete-suggestion__list">
        <li v-if="!parent.hideLoading && parent.loading"><i class="base-icon-loading"></i></li>
        <slot v-else>
        </slot>
      </base-scrollbar>
    </div>
  </transition>
</template>
<script>
  import Popper from '../util/vue-popper';
  import Emitter from '../mixin/emitter';
  import BaseScrollbar from '../scrollbar';

  export default {
    components: { BaseScrollbar },
    mixins: [Popper, Emitter],
    name:'BaseAutocompleteSuggestions',
    componentName: 'BaseAutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      options: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      id: String
    },

    methods: {
      select(item) {
        this.dispatch('BaseAutocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.popperJS && this.updatePopper();
      });
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.$refs.input.$refs.input || this.$parent.$refs.input.$refs.textarea;
      this.referenceList = this.$el.querySelector('.base-autocomplete-suggestion__list');
      this.referenceList.setAttribute('role', 'listbox');
      this.referenceList.setAttribute('id', this.id);
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>
