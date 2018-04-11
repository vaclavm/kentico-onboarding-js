import { OrderedMap } from 'immutable';

import {
  addItemFailed,
  getItemsFailed,
  saveItemFailed,
  deleteItemFailed,
  saveItemSuccess,
  deleteItemSuccess,
} from '../../actions';
import {
  ERROR_ADD_ITEM,
  ERROR_GET_ITEMS,
  ERROR_SAVE_ITEM,
  ERROR_DELETE_ITEM,
} from '../../constants/constants';
import { ErrorComposition } from '../../models/ErrorComposition';
import { error as errorReducer } from './error';
import { Key } from '../../@types/Key';
import { actionTypes } from '../../constants/actionTypes';

describe('error reducer works correctly', () => {
  it('ITEMS_GET_FAILED returns new state with global error', () => {
    const state = new ErrorComposition({ globalError: 'previous test error' });
    const expected = state.with({ globalError: ERROR_GET_ITEMS });

    const action = getItemsFailed('');
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_ADD_FAILED returns preserve state with new item error', () => {
    const errorDetail = 'item error detail';
    const itemError = ERROR_ADD_ITEM + ' (' + errorDetail + ')';
    const key = 'keyI';
    const itemsError = OrderedMap<Key, string>().set('x', 'error');
    const state = new ErrorComposition({ globalError: 'previous test error', itemsError: itemsError });
    const expected = state.with({ itemsError: itemsError.set(key, itemError) });

    const action = addItemFailed(key, errorDetail);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_SAVE_FAILED returns preserve state with new item error', () => {
    const errorDetail = 'item error detail';
    const itemError = ERROR_SAVE_ITEM + ' (' + errorDetail + ')';
    const key = 'keyI';
    const itemsError = OrderedMap<Key, string>().set('x', 'error');
    const state = new ErrorComposition({ globalError: 'previous test error', itemsError: itemsError });
    const expected = state.with({ itemsError: itemsError.set(key, itemError) });

    const action = saveItemFailed(key, errorDetail);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });


  it('ITEM_DELETE_FAILED returns preserve state with new item error', () => {
    const errorDetail = 'item error detail';
    const itemError = ERROR_DELETE_ITEM + ' (' + errorDetail + ')';
    const key = 'keyI';
    const itemsError = OrderedMap<Key, string>().set('x', 'error')
    const state = new ErrorComposition({ globalError: 'previous test error', itemsError: itemsError });
    const expected = state.with({ itemsError: itemsError.set(key, itemError) });

    const action = deleteItemFailed(key, errorDetail);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });


  it('ITEM_SAVE_SUCCESS returns preserve state without specified item error', () => {
    const key = 'keyI';
    const itemsError = OrderedMap<Key, string>().set('x', 'error').set(key, 'error II');
    const state = new ErrorComposition({ globalError: 'previous test error', itemsError: itemsError });
    const expected = state.with({ itemsError: itemsError.delete(key) });

    const action = saveItemSuccess(key);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_DELETE_SUCCESS returns preserve state without specified item error', () => {
    const key = 'keyI';
    const itemsError = OrderedMap<Key, string>().set('x', 'error').set(key, 'error II');
    const state = new ErrorComposition({ globalError: 'previous test error', itemsError: itemsError });
    const expected = state.with({ itemsError: itemsError.delete(key) });

    const action = deleteItemSuccess(key);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('undefined action returns default state', () => {
    const action = { type: actionTypes.ITEM_VALUE_CHANGED, payload: undefined };
    const actual = errorReducer(undefined, action);

    expect(actual).toEqual(new ErrorComposition());
  });

  it('undefined action returns previous state', () => {
    const emptyErrors = OrderedMap<Key, string>();
    const errors = emptyErrors.set('xy', 'error 1');
    const state = new ErrorComposition({
      globalError: 'previous test error',
      itemsError: errors,
    });

    const action = { type: actionTypes.ITEM_VALUE_CHANGED, payload: undefined };
    const actual = errorReducer(state, action);

    expect(actual).toEqual(state);
  });
});
