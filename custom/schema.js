import { Schema } from 'prosemirror-model';

export default new Schema({
  nodes: {
    doc: {
      content: 'page*'
    },
    chapter: {
      group: 'page',
      content: 'title scene+',
      parseDOM: [{ tag: 'div.chapter' }],
      toDOM() { return [ 'div', { class: 'chapter page' }, 0 ]}
    },
    scene: {
      attrs: { page: { default: false}},
      group: 'page',
      content: 'block+',
      parseDOM: [
        { tag: 'div.page.scene', attrs: { page: true }},
        { tag: 'div.scene'}
      ],
      toDOM(node) {
        return [ 'div', { class: 'scene' + (node.attrs.page ? ' page' : '') }, 0 ];
      }
    },
    title: {
      content: 'text*',
      parseDOM: [{ tag: 'h2.title' }],
      toDOM() { return [ 'h2', { class: 'title' }, 0 ]}
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM() { return [ 'p', 0 ]}
    },
    text: {
      group: 'inline',
      inline: true
    },
    break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM() { return [ 'br' ]}
    }
  },
  marks: {
    em: {
      parseDOM: [{ tag: 'em' }, { tag: 'i' }, { style: 'font-style=italic' }],
      toDOM() { return [ 'em' ]}
    },
    strong: {
      parseDOM: [{ tag: 'strong' },
        { tag: 'b', getAttrs: node => node.style.fontWeight !== 'normal' && null },
        { style: 'font-weight', getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null }
      ],
      toDOM() { return [ 'strong' ]}
    }
  }
});
