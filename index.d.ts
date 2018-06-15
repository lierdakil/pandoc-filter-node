/*! pandoc-filter-node | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
export declare type FilterAction = (elt: Walkable, format: string, meta?: Meta) => void | Walkable | Walkable[] | Promise<void | Walkable | Walkable[]>;
export interface taggedNoContent<T> {
    t: T;
}
export interface MetaMap {
    [k: string]: MetaValue;
}
export interface Elt<T extends object, K extends keyof T> {
    t: K;
    c: T[K];
}
export declare type Tag<T extends object> = {
    [K in keyof T]: Elt<T, K>;
}[keyof T];
export declare type MetaValue = Tag<MetaValueMap>;
export interface MetaValueMap {
    MetaMap: MetaMap;
    MetaList: MetaValue[];
    MetaBool: boolean;
    MetaString: string;
    MetaInlines: Inline[];
    MetaBlocks: Block[];
}
export declare type Meta = MetaMap;
export declare type CitationMode = taggedNoContent<'AuthorInText' | 'SuppressAuthor' | 'NormalCitation'>;
export declare type Citation = {
    citationId: string;
    citationPrefix: Inline[];
    citationSuffix: Inline[];
    citationMode: CitationMode;
    citationNoteNum: number;
    citationHash: number;
};
export declare type QuoteType = taggedNoContent<'SingleQuote' | 'DoubleQuote'>;
export declare type MathType = taggedNoContent<'DisplayMath' | 'InlineMath'>;
export declare type ListNumberStyle = taggedNoContent<'DefaultStyle' | 'Example' | 'Decimal' | 'LowerRoman' | 'UpperRoman' | 'LowerAlpha' | 'UpperAlpha'>;
export declare type ListNumberDelim = taggedNoContent<'DefaultDelim' | 'Period' | 'OneParen' | 'TwoParens'>;
export declare type Alignment = taggedNoContent<'AlignLeft' | 'AlignRight' | 'AlignCenter' | 'AlignDefault'>;
export declare type Inline = Tag<InlineMap>;
export interface InlineMap {
    Str: string;
    Emph: Inline[];
    Strong: Inline[];
    Strikeout: Inline[];
    Superscript: Inline[];
    Subscript: Inline[];
    SmallCaps: Inline[];
    Quoted: [QuoteType, Inline[]];
    Cite: [Citation, Inline[]];
    Code: [Attr, string];
    Math: [MathType, string];
    RawInline: [string, string];
    Link: [Attr, Inline[], Target];
    Image: [Attr, Inline[], Target];
    Note: Block[];
    Span: [Attr, Inline[]];
    Space: undefined;
    SoftBreak: undefined;
    LineBreak: undefined;
}
export declare type Attr = [string, string[], [string, string][]];
export declare type Target = [string, string];
export declare type Block = Tag<BlockMap>;
export interface BlockMap {
    Plain: Inline[];
    Para: Inline[];
    LineBlock: Inline[][];
    CodeBlock: [Attr, string];
    RawBlock: [string, string];
    BlockQuote: Block[];
    OrderedList: [ListAttrs, Block[][]];
    BulletList: Block[][];
    DefinitionList: Array<[Inline[], Block[][]]>;
    Header: [number, Attr, Inline[]];
    Table: [Inline[], Alignment[], number[], Block[], Block[][]];
    Div: [Attr, Block[]];
    HorizontalRule: undefined;
    Null: undefined;
}
export declare type ListAttrs = [number, ListNumberStyle, ListNumberDelim];
export declare type Pandoc = {
    'pandoc-api-version': string;
    meta: Meta;
    blocks: Block[];
};
export declare type EltFunction<T extends keyof EltMap> = EltMap[T] extends undefined ? () => Elt<EltMap, T> : EltMap[T] extends [infer A1] ? (a1: A1) => Elt<EltMap, T> : EltMap[T] extends [infer A1, infer A2] ? (a1: A1, a2: A2) => Elt<EltMap, T> : EltMap[T] extends [infer A1, infer A2, infer A3] ? (a1: A1, a2: A2, a3: A3) => Elt<EltMap, T> : EltMap[T] extends [infer A1, infer A2, infer A3, infer A4] ? (a1: A1, a2: A2, a3: A3, a4: A4) => Elt<EltMap, T> : EltMap[T] extends [infer A1, infer A2, infer A3, infer A4, infer A5] ? (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => Elt<EltMap, T> : (a1: EltMap[T]) => Elt<EltMap, T>;
export declare type EltTypeMap = {
    [K in keyof EltMap]: Elt<EltMap, K>;
};
export declare type EltMap = InlineMap & BlockMap & MetaValueMap;
export declare type Walkable = Block | Inline | MetaValue;
export declare type Tree = Walkable | string;
export declare function toJSONFilter(action: FilterAction): void;
export declare function filter(data: Pandoc, action: FilterAction, format: string): Promise<Pandoc>;
export declare function walk(x: Pandoc, action: FilterAction, format: string, meta?: Meta): Promise<Pandoc>;
export declare function walk(x: Tree, action: FilterAction, format: string, meta?: Meta): Promise<Tree>;
export declare function walk(x: Tree[], action: FilterAction, format: string, meta?: Meta): Promise<Tree[]>;
export declare function stringify(x: Tree): Promise<string>;
export declare function attributes(attrs?: {
    classes?: string[];
} & {
    [k: string]: string;
}): Attr;
export declare const Plain: (a1: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Plain">;
export declare const Para: (a1: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Para">;
export declare const CodeBlock: (a1: [string, string[], [string, string][]], a2: string) => Elt<EltMap, "CodeBlock">;
export declare const RawBlock: (a1: string, a2: string) => Elt<EltMap, "RawBlock">;
export declare const BlockQuote: (a1: (Elt<BlockMap, "Plain"> | Elt<BlockMap, "Para"> | Elt<BlockMap, "LineBlock"> | Elt<BlockMap, "CodeBlock"> | Elt<BlockMap, "RawBlock"> | Elt<BlockMap, "BlockQuote"> | Elt<BlockMap, "OrderedList"> | Elt<BlockMap, "BulletList"> | Elt<BlockMap, "DefinitionList"> | Elt<BlockMap, "Header"> | Elt<BlockMap, "Table"> | Elt<BlockMap, "Div"> | Elt<BlockMap, "HorizontalRule"> | Elt<BlockMap, "Null">)[]) => Elt<EltMap, "BlockQuote">;
export declare const OrderedList: (a1: [number, taggedNoContent<"DefaultStyle" | "Example" | "Decimal" | "LowerRoman" | "UpperRoman" | "LowerAlpha" | "UpperAlpha">, taggedNoContent<"DefaultDelim" | "Period" | "OneParen" | "TwoParens">], a2: (Elt<BlockMap, "Plain"> | Elt<BlockMap, "Para"> | Elt<BlockMap, "LineBlock"> | Elt<BlockMap, "CodeBlock"> | Elt<BlockMap, "RawBlock"> | Elt<BlockMap, "BlockQuote"> | Elt<BlockMap, "OrderedList"> | Elt<BlockMap, "BulletList"> | Elt<BlockMap, "DefinitionList"> | Elt<BlockMap, "Header"> | Elt<BlockMap, "Table"> | Elt<BlockMap, "Div"> | Elt<BlockMap, "HorizontalRule"> | Elt<BlockMap, "Null">)[][]) => Elt<EltMap, "OrderedList">;
export declare const BulletList: (a1: (Elt<BlockMap, "Plain"> | Elt<BlockMap, "Para"> | Elt<BlockMap, "LineBlock"> | Elt<BlockMap, "CodeBlock"> | Elt<BlockMap, "RawBlock"> | Elt<BlockMap, "BlockQuote"> | Elt<BlockMap, "OrderedList"> | Elt<BlockMap, "BulletList"> | Elt<BlockMap, "DefinitionList"> | Elt<BlockMap, "Header"> | Elt<BlockMap, "Table"> | Elt<BlockMap, "Div"> | Elt<BlockMap, "HorizontalRule"> | Elt<BlockMap, "Null">)[][]) => Elt<EltMap, "BulletList">;
export declare const DefinitionList: (a1: [(Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[], (Elt<BlockMap, "Plain"> | Elt<BlockMap, "Para"> | Elt<BlockMap, "LineBlock"> | Elt<BlockMap, "CodeBlock"> | Elt<BlockMap, "RawBlock"> | Elt<BlockMap, "BlockQuote"> | Elt<BlockMap, "OrderedList"> | Elt<BlockMap, "BulletList"> | Elt<BlockMap, "DefinitionList"> | Elt<BlockMap, "Header"> | Elt<BlockMap, "Table"> | Elt<BlockMap, "Div"> | Elt<BlockMap, "HorizontalRule"> | Elt<BlockMap, "Null">)[][]][]) => Elt<EltMap, "DefinitionList">;
export declare const Header: (a1: number, a2: [string, string[], [string, string][]], a3: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Header">;
export declare const HorizontalRule: () => Elt<EltMap, "HorizontalRule">;
export declare const Table: (a1: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[], a2: taggedNoContent<"AlignLeft" | "AlignRight" | "AlignCenter" | "AlignDefault">[], a3: number[], a4: (Elt<BlockMap, "Plain"> | Elt<BlockMap, "Para"> | Elt<BlockMap, "LineBlock"> | Elt<BlockMap, "CodeBlock"> | Elt<BlockMap, "RawBlock"> | Elt<BlockMap, "BlockQuote"> | Elt<BlockMap, "OrderedList"> | Elt<BlockMap, "BulletList"> | Elt<BlockMap, "DefinitionList"> | Elt<BlockMap, "Header"> | Elt<BlockMap, "Table"> | Elt<BlockMap, "Div"> | Elt<BlockMap, "HorizontalRule"> | Elt<BlockMap, "Null">)[], a5: (Elt<BlockMap, "Plain"> | Elt<BlockMap, "Para"> | Elt<BlockMap, "LineBlock"> | Elt<BlockMap, "CodeBlock"> | Elt<BlockMap, "RawBlock"> | Elt<BlockMap, "BlockQuote"> | Elt<BlockMap, "OrderedList"> | Elt<BlockMap, "BulletList"> | Elt<BlockMap, "DefinitionList"> | Elt<BlockMap, "Header"> | Elt<BlockMap, "Table"> | Elt<BlockMap, "Div"> | Elt<BlockMap, "HorizontalRule"> | Elt<BlockMap, "Null">)[][]) => Elt<EltMap, "Table">;
export declare const Div: (a1: [string, string[], [string, string][]], a2: (Elt<BlockMap, "Plain"> | Elt<BlockMap, "Para"> | Elt<BlockMap, "LineBlock"> | Elt<BlockMap, "CodeBlock"> | Elt<BlockMap, "RawBlock"> | Elt<BlockMap, "BlockQuote"> | Elt<BlockMap, "OrderedList"> | Elt<BlockMap, "BulletList"> | Elt<BlockMap, "DefinitionList"> | Elt<BlockMap, "Header"> | Elt<BlockMap, "Table"> | Elt<BlockMap, "Div"> | Elt<BlockMap, "HorizontalRule"> | Elt<BlockMap, "Null">)[]) => Elt<EltMap, "Div">;
export declare const Null: () => Elt<EltMap, "Null">;
export declare const Str: (a1: string) => Elt<EltMap, "Str">;
export declare const Emph: (a1: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Emph">;
export declare const Strong: (a1: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Strong">;
export declare const Strikeout: (a1: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Strikeout">;
export declare const Superscript: (a1: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Superscript">;
export declare const Subscript: (a1: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Subscript">;
export declare const SmallCaps: (a1: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "SmallCaps">;
export declare const Quoted: (a1: taggedNoContent<"SingleQuote" | "DoubleQuote">, a2: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Quoted">;
export declare const Cite: (a1: Citation, a2: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Cite">;
export declare const Code: (a1: [string, string[], [string, string][]], a2: string) => Elt<EltMap, "Code">;
export declare const Space: () => Elt<EltMap, "Space">;
export declare const LineBreak: () => Elt<EltMap, "LineBreak">;
export declare const Formula: (a1: taggedNoContent<"DisplayMath" | "InlineMath">, a2: string) => Elt<EltMap, "Math">;
export declare const RawInline: (a1: string, a2: string) => Elt<EltMap, "RawInline">;
export declare const Link: (a1: [string, string[], [string, string][]], a2: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[], a3: [string, string]) => Elt<EltMap, "Link">;
export declare const Image: (a1: [string, string[], [string, string][]], a2: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[], a3: [string, string]) => Elt<EltMap, "Image">;
export declare const Note: (a1: (Elt<BlockMap, "Plain"> | Elt<BlockMap, "Para"> | Elt<BlockMap, "LineBlock"> | Elt<BlockMap, "CodeBlock"> | Elt<BlockMap, "RawBlock"> | Elt<BlockMap, "BlockQuote"> | Elt<BlockMap, "OrderedList"> | Elt<BlockMap, "BulletList"> | Elt<BlockMap, "DefinitionList"> | Elt<BlockMap, "Header"> | Elt<BlockMap, "Table"> | Elt<BlockMap, "Div"> | Elt<BlockMap, "HorizontalRule"> | Elt<BlockMap, "Null">)[]) => Elt<EltMap, "Note">;
export declare const Span: (a1: [string, string[], [string, string][]], a2: (Elt<InlineMap, "Str"> | Elt<InlineMap, "Emph"> | Elt<InlineMap, "Strong"> | Elt<InlineMap, "Strikeout"> | Elt<InlineMap, "Superscript"> | Elt<InlineMap, "Subscript"> | Elt<InlineMap, "SmallCaps"> | Elt<InlineMap, "Quoted"> | Elt<InlineMap, "Cite"> | Elt<InlineMap, "Code"> | Elt<InlineMap, "Math"> | Elt<InlineMap, "RawInline"> | Elt<InlineMap, "Link"> | Elt<InlineMap, "Image"> | Elt<InlineMap, "Note"> | Elt<InlineMap, "Span"> | Elt<InlineMap, "Space"> | Elt<InlineMap, "SoftBreak"> | Elt<InlineMap, "LineBreak">)[]) => Elt<EltMap, "Span">;
export declare const stdio: typeof toJSONFilter;
