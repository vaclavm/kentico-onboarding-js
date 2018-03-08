// components/ListItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { ListItemEditor } from '../containers/ListItemEditor';
import { ListItemDisplay } from '../containers/ListItemDisplay';
import { ListItem as ListItemModel } from '../models/listItem';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.instanceOf(ListItemModel).isRequired,
    bullet: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  };

  render() {
    const { item, bullet } = this.props;

    let listItem = (
      <ListItemDisplay
        item={item}
        bullet={bullet}
      />
    );

    if (item.isBeingEdited) {
      listItem = (
        <ListItemEditor
          item={item}
          bullet={bullet}
        />
      );
    }

    return (
      <div>
        {listItem}
      </div>
    );
  }
}
