/**
 * Support the legacy image alignment suffixes from the docsify docs, e.g.
 * `![Alt](../../../assets/x.png#alignright)`.
 *
 * The `#align…` fragment is removed from the URL (so Astro can still resolve
 * and optimize the image) and turned into a CSS class on the <img>.
 */
const ALIGN = /#(alignright|alignleft|alignrightfull|alignleft50)$/;

function walk(node, fn) {
  fn(node);
  if (node.children) for (const child of node.children) walk(child, fn);
}

export default function remarkImageAlign() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'image' || typeof node.url !== 'string') return;
      const match = node.url.match(ALIGN);
      if (!match) return;
      node.url = node.url.replace(ALIGN, '');
      node.data ??= {};
      node.data.hProperties = { ...node.data.hProperties, class: `img-${match[1]}` };
    });
  };
}
