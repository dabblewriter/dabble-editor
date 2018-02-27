import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';


/**
 * 
 * @param {EditorState} state 
 * @param {Function} dispatch
 * @returns {Boolean}
 */
export function deleteSelection(state, dispatch) {
  if (state.selection.empty) return false;
  if (dispatch) dispatch(state.tr.deleteSelection().scrollIntoView());
  return true;
}

/**
 * 
 * @param {EditorState} state 
 * @param {Function} dispatch 
 * @param {EditorView} view 
 */
export function joinBackwards(state, dispatch, view) {
  
}


