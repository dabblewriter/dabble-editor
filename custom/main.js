import { DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import schema from './schema';
import plugins from './plugins';



let state = EditorState.create({
  schema, plugins,
  doc: DOMParser.fromSchema(schema).parse(document.body)
});
document.body.innerHTML = '';
let view = new EditorView(document.body, { state });

window.view = view;
window.state = state;
