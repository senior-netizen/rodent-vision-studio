import type { InsightBlock } from '@/data/blog';

export function ArchitectureDiagram({ items, label }: { items: string[]; label: string }) {
  return <figure className="article-diagram" aria-label={label}><div>{items.map((item, index) => <span key={`${item}-${index}`}><b>{item}</b>{index < items.length - 1 && <i aria-hidden="true">→</i>}</span>)}</div><figcaption>{label}</figcaption></figure>;
}

export function ArticleBody({ blocks }: { blocks: InsightBlock[] }) {
  return <div className="article-prose">{blocks.map((block, index) => {
    if (block.type === 'heading') { const Tag = block.level === 3 ? 'h3' : 'h2'; return <Tag id={block.id} key={block.id}>{block.text}</Tag>; }
    if (block.type === 'paragraph') return <p key={index}>{block.text}</p>;
    if (block.type === 'list') { const Tag = block.ordered ? 'ol' : 'ul'; return <Tag key={index}>{block.items.map(item => <li key={item}>{item}</li>)}</Tag>; }
    if (block.type === 'callout') return <aside className={`article-callout callout-${block.variant.toLowerCase().replaceAll(' ', '-')}`} key={index}><strong>{block.variant}{block.title ? ` · ${block.title}` : ''}</strong><p>{block.text}</p></aside>;
    if (block.type === 'diagram') return <ArchitectureDiagram items={block.items} label={block.label} key={index} />;
    if (block.type === 'code') return <figure className="article-code" key={index}><div><span>{block.language}</span></div><pre tabIndex={0}><code className={`language-${block.language}`}>{block.code}</code></pre>{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
    if (block.type === 'table') return <figure className="article-table" key={index}><div tabIndex={0}><table><thead><tr>{block.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
    if (block.type === 'quote') return <blockquote key={index}>{block.text}</blockquote>;
    return <section className="article-references" key={index}><h2>References</h2><ol>{block.items.map(item => <li key={item.href}><a href={item.href} target="_blank" rel="noreferrer noopener">{item.label} ↗</a></li>)}</ol></section>;
  })}</div>;
}
