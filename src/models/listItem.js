import { Record } from 'immutable';

export const ListItem = Record({
  todo: undefined,
  isBeingEdited: false,
  changedValue: '',
}, name);
