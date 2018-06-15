/*! pandoc-filter-node | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
/**
 * Typescript port of https://github.com/jgm/pandocfilters
 */

export type FilterAction = (
  elt: Walkable,
  format: string,
  meta?: Meta,
) => void | Walkable | Walkable[] | Promise<void | Walkable | Walkable[]>

export interface taggedNoContent<T> {
  t: T
}

export interface MetaMap {
  [k: string]: MetaValue
}

export interface Elt<T extends object, K extends keyof T> {
  t: K
  c: T[K]
}
export type Tag<T extends object> = { [K in keyof T]: Elt<T, K> }[keyof T]

export type MetaValue = Tag<MetaValueMap>

export interface MetaValueMap {
  MetaMap: MetaMap
  MetaList: MetaValue[]
  MetaBool: boolean
  MetaString: string
  MetaInlines: Inline[]
  MetaBlocks: Block[]
}

export type Meta = MetaMap

export type CitationMode = taggedNoContent<
  'AuthorInText' | 'SuppressAuthor' | 'NormalCitation'
  >

export type Citation = {
  citationId: string
  citationPrefix: Inline[]
  citationSuffix: Inline[]
  citationMode: CitationMode
  citationNoteNum: number
  citationHash: number
}

export type QuoteType = taggedNoContent<'SingleQuote' | 'DoubleQuote'>

export type MathType = taggedNoContent<'DisplayMath' | 'InlineMath'>

export type ListNumberStyle = taggedNoContent<
  | 'DefaultStyle'
  | 'Example'
  | 'Decimal'
  | 'LowerRoman'
  | 'UpperRoman'
  | 'LowerAlpha'
  | 'UpperAlpha'
  >

export type ListNumberDelim = taggedNoContent<
  'DefaultDelim' | 'Period' | 'OneParen' | 'TwoParens'
  >

export type Alignment = taggedNoContent<
  'AlignLeft' | 'AlignRight' | 'AlignCenter' | 'AlignDefault'
  >

export type Inline = Tag<InlineMap>

export interface InlineMap {
  Str: string
  Emph: Inline[]
  Strong: Inline[]
  Strikeout: Inline[]
  Superscript: Inline[]
  Subscript: Inline[]
  SmallCaps: Inline[]
  Quoted: [QuoteType, Inline[]]
  Cite: [Citation, Inline[]]
  Code: [Attr, string]
  Math: [MathType, string]
  RawInline: [string, string]
  Link: [Attr, Inline[], Target]
  Image: [Attr, Inline[], Target]
  Note: Block[]
  Span: [Attr, Inline[]]
  Space: undefined
  SoftBreak: undefined
  LineBreak: undefined
}

export type Attr = [string, string[], [string, string][]]

export type Target = [string, string]

export type Block = Tag<BlockMap>

export interface BlockMap {
  Plain: Inline[]
  Para: Inline[]
  LineBlock: Inline[][]
  CodeBlock: [Attr, string]
  RawBlock: [string, string]
  BlockQuote: Block[]
  OrderedList: [ListAttrs, Block[][]]
  BulletList: Block[][]
  DefinitionList: Array<[Inline[], Block[][]]>
  Header: [number, Attr, Inline[]]
  Table: [Inline[], Alignment[], number[], Block[], Block[][]]
  Div: [Attr, Block[]]
  HorizontalRule: undefined
  Null: undefined
}

export type ListAttrs = [number, ListNumberStyle, ListNumberDelim]

export type Pandoc = {
  'pandoc-api-version': string
  meta: Meta
  blocks: Block[]
}

export type EltFunction<T extends keyof EltMap> =
  EltMap[T] extends undefined
    ? () => Elt<EltMap, T>
  : EltMap[T] extends [infer A1]
    ? (a1: A1) => Elt<EltMap, T>
  : EltMap[T] extends [infer A1, infer A2]
    ? (a1: A1, a2: A2) => Elt<EltMap, T>
  : EltMap[T] extends [infer A1, infer A2, infer A3]
    ? (a1: A1, a2: A2, a3: A3) => Elt<EltMap, T>
  : EltMap[T] extends [infer A1, infer A2, infer A3, infer A4]
    ? (a1: A1, a2: A2, a3: A3, a4: A4) => Elt<EltMap, T>
  : EltMap[T] extends [infer A1, infer A2, infer A3, infer A4, infer A5]
    ? (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => Elt<EltMap, T>
  : (a1: EltMap[T]) => Elt<EltMap, T>

type NumArgs<T extends keyof EltMap> =
  EltFunction<T> extends () => any ? 0
  : EltFunction<T> extends (a1: any) => any ? 1
  : EltFunction<T> extends (a1: any, a2: any) => any ? 2
  : EltFunction<T> extends (a1: any, a2: any, a3: any) => any ? 3
  : EltFunction<T> extends (a1: any, a2: any, a3: any, a4: any) => any ? 4
  : EltFunction<T> extends (a1: any, a2: any, a3: any, a4: any, a5: any) => any ? 5
  : never

export type EltTypeMap = { [K in keyof EltMap]: Elt<EltMap, K> }

export type EltMap = InlineMap & BlockMap & MetaValueMap
export type Walkable = Block | Inline | MetaValue
export type Tree = Walkable | string

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
    filter(data, action, format)
      .then(function(output) {
        process.stdout.write(JSON.stringify(output))
      })
      .catch(function(e) {
        console.error(e)
      })
  })
}

/**
 * Filter the given object
 */
export async function filter(
  data: Pandoc,
  action: FilterAction,
  format: string,
): Promise<Pandoc> {
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
  x: Pandoc,
  action: FilterAction,
  format: string,
  meta?: Meta,
): Promise<Pandoc>
export async function walk(
  x: Tree,
  action: FilterAction,
  format: string,
  meta?: Meta,
): Promise<Tree>
export async function walk(
  x: Tree[],
  action: FilterAction,
  format: string,
  meta?: Meta,
): Promise<Tree[]>
export async function walk(
  x: Tree | Tree[] | Pandoc,
  action: FilterAction,
  format: string,
  meta?: Meta,
): Promise<Tree | Tree[] | Pandoc> {
  if (Array.isArray(x)) {
    var array: Tree[] = []
    for (const item of x) {
      if (typeof item === 'object') {
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
    const obj = Object.assign({}, x)
    for(const [k,v] of Object.entries(obj)) {
      obj[k] = await walk(v, action, format, meta)
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
  var go: FilterAction = function(x) {
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
  for (const [k, v] of Object.entries(attrs)) {
    if (k !== 'classes' && k !== 'id') keyvals.push([k, v])
  }
  return [ident, classes, keyvals]
}

// Utility for creating constructor functions
function elt<T extends keyof EltMap>(
  eltType: T,
  numargs: NumArgs<T>,
): EltFunction<T> {
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
