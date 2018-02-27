import { keymap } from 'prosemirror-keymap';

let test = keymap({
  'Enter': (state, dispatch) => {
    let { $from, $to } = state.selection;
    console.log($from.parent.inlineContent);
    if ($from.parent.inlineContent || $to.parent.inlineContent) return false;
    return true;
  }
})

export default [
  test
];
