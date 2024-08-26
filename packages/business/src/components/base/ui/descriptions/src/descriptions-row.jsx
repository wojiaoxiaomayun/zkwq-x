export default {
  name: 'BaseDescriptionsRow',
  props: {
    row: {
      type: Array
    }
  },
  inject: ['baseDescriptions'],
  render(h) {
    const { baseDescriptions } = this;
    const row = (this.row || []).map(item => {
      return {
        ...item,
        label: item.slots.label || item.props.label,
        ...['labelClassName', 'contentClassName', 'labelStyle', 'contentStyle'].reduce((res, key) => {
          res[key] = item.props[key] || baseDescriptions[key];
          return res;
        }, {})
      };
    });
    if (baseDescriptions.direction === 'vertical') {
      return (
        <tbody>
          <tr class="base-descriptions-row">
            {
              row.map(item => {
                return (
                  <th
                    class={{
                      'base-descriptions-item__cell': true,
                      'base-descriptions-item__label': true,
                      'has-colon': baseDescriptions.border ? false : baseDescriptions.colon,
                      'is-bordered-label': baseDescriptions.border,
                      [item.labelClassName]: true
                    }}
                    style={item.labelStyle}
                    colSpan={item.props.span}
                  >{item.label}</th>
                );
              })
            }
          </tr>
          <tr class="base-descriptions-row">
            {
              row.map(item =>{
                return (
                  <td
                    class={['base-descriptions-item__cell', 'base-descriptions-item__content', item.contentClassName]}
                    style={item.contentStyle}
                    colSpan={item.props.span}
                  >{item.slots.default}</td>
                );
              })
            }
          </tr>
        </tbody>
      );
    }
    if (baseDescriptions.border) {
      return (
        <tbody>
          <tr class="base-descriptions-row">
            {
              row.map(item=> {
                return ([
                  <th
                    class={{
                      'base-descriptions-item__cell': true,
                      'base-descriptions-item__label': true,
                      'is-bordered-label': baseDescriptions.border,
                      [item.labelClassName]: true
                    }}
                    style={item.labelStyle}
                    colSpan="1"
                  >{item.label}</th>,
                  <td
                    class={['base-descriptions-item__cell', 'base-descriptions-item__content', item.contentClassName]}
                    style={item.contentStyle}
                    colSpan={item.props.span * 2 - 1}
                  >{item.slots.default}</td>
                ]);
              })
            }
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        <tr class="base-descriptions-row">
          {
            row.map(item=> {
              return (
                <td class="base-descriptions-item base-descriptions-item__cell" colSpan={item.props.span}>
                  <div class="base-descriptions-item__container">
                    <span
                      class={{
                        'base-descriptions-item__label': true,
                        'has-colon': baseDescriptions.colon,
                        [item.labelClassName]: true
                      }}
                      style={item.labelStyle}
                    >{item.label}</span>
                    <span
                      class={['base-descriptions-item__content', item.contentClassName]}
                      style={item.contentStyle}
                    >{item.slots.default}</span>
                  </div>
                </td>);
            })
          }
        </tr>
      </tbody>
    );
  }
};
