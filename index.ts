/*! pandoc-filter-node | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
/**
 * Typescript port of https://github.com/jgm/pandocfilters
 */

export type FilterAction = (
  elt: EltTypeMap[EltNames],
  format: string,
  meta: any,
) => void | Tree | Promise<void | Tree>

export type AttrList = Array<[string, string]>

export type Attr = [string, Array<string>, AttrList]

export type MathType = 'DisplayMath' | 'InlineMath'
export type QuoteType = 'SingleQuote' | 'DoubleQuote'
export type Target = [string, string] // [url, title]
export type Format = string

export type CitationMode = 'AuthorInText' | 'SuppressAuthor' | 'NormalCitation'

export type Citation = {
  citationId: string
  citationPrefix: Array<Inline>
  citationSuffix: Array<Inline>
  citationMode: CitationMode
  citationNoteNum: number
  citationHash: number
}

export type ListNumberStyle =
  | 'DefaultStyle'
  | 'Example'
  | 'Decimal'
  | 'LowerRoman'
  | 'UpperRoman'
  | 'LowerAlpha'
  | 'UpperAlpha'

export type ListNumberDelim =
  | 'DefaultDelim'
  | 'Period'
  | 'OneParen'
  | 'TwoParens'

export type ListAttributes = [number, ListNumberStyle, ListNumberDelim]

export type Alignment =
  | 'AlignLeft'
  | 'AlignRight'
  | 'AlignCenter'
  | 'AlignDefault'

export type TableCell = Array<Block>

export interface InlineEltMap {
  // Inline
  Str: string
  Emph: Array<Inline>
  Strong: Array<Inline>
  Strikeout: Array<Inline>
  Superscript: Array<Inline>
  Subscript: Array<Inline>
  SmallCaps: Array<Inline>
  Quoted: [QuoteType, Array<Inline>]
  Cite: [Array<Citation>, Array<Inline>]
  Code: [Attr, string]
  Space: undefined
  SoftBreak: undefined
  LineBreak: undefined
  Math: [{t: MathType}, string]
  RawInline: [Format, string]
  Link: [Attr, Array<Inline>, Target]
  Image: [Attr, Array<Inline>, Target]
  Note: Array<Block>
  Span: [Attr, Array<Inline>]
}

export interface BlockEltMap {
  // Block
  Plain: Array<Inline>
  Para: Array<Inline>
  LineBlock: Array<Array<Inline>>
  CodeBlock: [Attr, string]
  RawBlock: [Format, string]
  BlockQuote: Array<Block>
  OrderedList: [ListAttributes, Array<Array<Block>>]
  BulletList: Array<Array<Block>>
  DefinitionList: Array<[Array<Inline>, Array<Array<Block>>]>
  Header: [number, Attr, Array<Inline>]
  HorizontalRule: undefined
  Table: [
    Array<Inline>,
    Array<Alignment>,
    Array<number>,
    Array<TableCell>,
    Array<Array<TableCell>>
  ]
  Div: [Attr, Array<Block>]
  Null: undefined
}

export type EltFunction<T extends keyof EltMap> = EltMap[T] extends undefined
  ? () => Elt<T>
  : EltMap[T] extends [infer A1]
  ? (a1: A1) => Elt<T>
  : EltMap[T] extends [infer A1, infer A2]
  ? (a1: A1, a2: A2) => Elt<T>
  : EltMap[T] extends [infer A1, infer A2, infer A3]
  ? (a1: A1, a2: A2, a3: A3) => Elt<T>
  : EltMap[T] extends [infer A1, infer A2, infer A3, infer A4]
  ? (a1: A1, a2: A2, a3: A3, a4: A4) => Elt<T>
  : EltMap[T] extends [infer A1, infer A2, infer A3, infer A4, infer A5]
  ? (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => Elt<T>
  : (a1: EltMap[T]) => Elt<T>

export interface MetaEltMap {
  // Meta
  MetaString: string
}

export type EltMap = InlineEltMap & BlockEltMap & MetaEltMap

export interface Elt<A extends EltNames> {
  t: A
  c: EltMap[A]
}
export type EltTypeMap = { [K in EltNames]: Elt<K> }

export type InlineEltNames = keyof InlineEltMap
export type Inline = EltTypeMap[InlineEltNames]
export type BlockEltNames = keyof BlockEltMap
export type Block = EltTypeMap[BlockEltNames]
export type EltNames = keyof EltMap
export type MetaEltNames = keyof MetaEltMap
export type Meta = EltTypeMap[MetaEltNames]
export type Tree = Block | Inline | Meta | string

declare global {
  interface ObjectConstructor {
    entries<K extends string, T>(o: { [Key in K]: T }): [K, T][];
  }
}

/**
 * Converts an action into a filter that reads a JSON-formatted pandoc
 * document from stdin, transforms it by walking the tree with the action, and
 * returns a new JSON-formatted pandoc document to stdout. The argument is a
 * function action(key, value, format, meta), where key is the type of the
 * pandoc object (e.g. 'Str', 'Para'), value is the contents of the object
 * (e.g. a string for 'Str', a list of inline elements for 'Para'), format is
 * the target output format (which will be taken for the first command
 * line argument if present), and meta is the document's metadata. If the
 * function returns None, the object to which it applies will remain
 * unchanged. If it returns an object, the object will be replaced. If it
 * returns a list, the list will be spliced in to the list to which the target
 * object belongs. (So, returning an empty list deletes the object.)
 *
 * @param  {Function} action Callback to apply to every object
 */
export function toJSONFilter(action: FilterAction): void {
  require('get-stdin')(function(json: string) {
    var data = JSON.parse(json)
    var format = process.argv.length > 2 ? process.argv[2] : ''
    filter(data, action, format).then(function(output) {
      process.stdout.write(JSON.stringify(output))
    }).catch(function(e) {
      console.error(e)
    })
  })
}

/**
 * Filter the given object
 */
export async function filter(
  data: Tree & { meta: any },
  action: FilterAction,
  format: Format,
): Promise<Tree> {
  return walk(data, action, format, data.meta || data[0].unMeta)
}

/**
 * Walk a tree, applying an action to every object.
 * @param  {Object}   x      The object to traverse
 * @param  {Function} action Callback to apply to each item
 * @param  {String}   format Output format
 * @param  {Object}   meta   Pandoc metadata
 * @return {Object}          The modified tree
 */
export async function walk(
  x: Tree,
  action: FilterAction,
  format: Format,
  meta: any,
): Promise<Tree>
export async function walk(
  x: Tree[],
  action: FilterAction,
  format: Format,
  meta: any,
): Promise<Tree[]>
export async function walk(
  x: Tree | Tree[],
  action: FilterAction,
  format: Format,
  meta: any,
): Promise<Tree | Tree[]> {
  if (Array.isArray(x)) {
    var array: Tree[] = []
    for (const item of x) {
      if (typeof item === 'object' && item.t) {
        var res = await action(item, format, meta)
        if (!res) {
          array.push(await walk(item, action, format, meta))
        } else if (Array.isArray(res)) {
          for (const z of res) {
            array.push(await walk(z, action, format, meta))
          }
        } else {
          array.push(await walk(res, action, format, meta))
        }
      } else {
        array.push(await walk(item, action, format, meta))
      }
    }
    return array
  } else if (typeof x === 'object') {
    var obj = {} as typeof x
    for (const [k, s] of Object.entries(x)) {
      obj[k] = await walk(s, action, format, meta)
    }
    return obj
  }
  return x
}

/**
 * Walks the tree x and returns concatenated string content, leaving out all
 * formatting.
 * @param  {Object} x The object to walk
 * @return {String}   JSON string
 */
export async function stringify(x: Tree): Promise<string> {
  if (!Array.isArray(x) && typeof x === 'object' && x.t === 'MetaString')
    return x.c

  var result: string[] = []
  var go: FilterAction = function (x: EltTypeMap[EltNames]) {
    if (x.t === 'Str') result.push(x.c)
    else if (x.t === 'Code') result.push(x.c[1])
    else if (x.t === 'Math') result.push(x.c[1])
    else if (x.t === 'LineBreak') result.push(' ')
    else if (x.t === 'Space') result.push(' ')
  }
  await walk(x, go, '', {})
  return result.join('')
}

/**
 * Returns an attribute list, constructed from the dictionary attrs.
 * @param  {Object} attrs Attribute dictionary
 * @return {Array}        Attribute list
 */
export function attributes(
  attrs: { classes?: string[] } & { [k: string]: string } = {},
): Attr {
  var ident = attrs.id || ''
  var classes = attrs.classes || []
  var keyvals = [] as Array<[string, string]>
  for (const [k, v] of Object.entries<string, string>(attrs)) {
    if (k !== 'classes' && k !== 'id') keyvals.push([k, v])
  }
  return [ident, classes, keyvals]
}

// Utility for creating constructor functions
function elt<T extends EltNames>(eltType: T, numargs: number): EltFunction<T> {
  return function(...args: any[]) {
    var len = args.length
    if (len !== numargs)
      throw new Error(
        eltType + ' expects ' + numargs + ' arguments, but given ' + len,
      )
    return { t: eltType, c: len === 1 ? args[0] : args }
  } as EltFunction<T>
}

export const Plain = elt('Plain', 1)
export const Para = elt('Para', 1)
export const CodeBlock = elt('CodeBlock', 2)
export const RawBlock = elt('RawBlock', 2)
export const BlockQuote = elt('BlockQuote', 1)
export const OrderedList = elt('OrderedList', 2)
export const BulletList = elt('BulletList', 1)
export const DefinitionList = elt('DefinitionList', 1)
export const Header = elt('Header', 3)
export const HorizontalRule = elt('HorizontalRule', 0)
export const Table = elt('Table', 5)
export const Div = elt('Div', 2)
export const Null = elt('Null', 0)

// Constructors for inline elements

export const Str = elt('Str', 1)
export const Emph = elt('Emph', 1)
export const Strong = elt('Strong', 1)
export const Strikeout = elt('Strikeout', 1)
export const Superscript = elt('Superscript', 1)
export const Subscript = elt('Subscript', 1)
export const SmallCaps = elt('SmallCaps', 1)
export const Quoted = elt('Quoted', 2)
export const Cite = elt('Cite', 2)
export const Code = elt('Code', 2)
export const Space = elt('Space', 0)
export const LineBreak = elt('LineBreak', 0)
export const Formula = elt('Math', 2) // don't conflict with js builtin Math
export const RawInline = elt('RawInline', 2)
export const Link = elt('Link', 3)
export const Image = elt('Image', 3)
export const Note = elt('Note', 1)
export const Span = elt('Span', 2)

// a few aliases
export const stdio = toJSONFilter
