import { saveItem } from './itemActions';

export const saveItems = (state, selectedKeys) => {
  let newState = state;

  for (let keyIndex = 0; keyIndex < selectedKeys.length; keyIndex++) {
    const key = selectedKeys[keyIndex];
    const newItem = saveItem(state.get(key));
    newState = newState.mergeIn([key], newItem);
  }

  return newState;
};
