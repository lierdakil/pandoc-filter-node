/*! pandoc-filter-node | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
export declare type FilterAction = (elt: EltTypeMap[EltNames], format: string, meta: any) => void | Tree | Promise<void | Tree>;
export declare type AttrList = Array<[string, string]>;
export declare type Attr = [string, Array<string>, AttrList];
export declare type MathType = 'DisplayMath' | 'InlineMath';
export declare type QuoteType = 'SingleQuote' | 'DoubleQuote';
export declare type Target = [string, string];
export declare type Format = string;
export declare type CitationMode = 'AuthorInText' | 'SuppressAuthor' | 'NormalCitation';
export declare type Citation = {
    citationId: string;
    citationPrefix: Array<Inline>;
    citationSuffix: Array<Inline>;
    citationMode: CitationMode;
    citationNoteNum: number;
    citationHash: number;
};
export declare type ListNumberStyle = 'DefaultStyle' | 'Example' | 'Decimal' | 'LowerRoman' | 'UpperRoman' | 'LowerAlpha' | 'UpperAlpha';
export declare type ListNumberDelim = 'DefaultDelim' | 'Period' | 'OneParen' | 'TwoParens';
export declare type ListAttributes = [number, ListNumberStyle, ListNumberDelim];
export declare type Alignment = 'AlignLeft' | 'AlignRight' | 'AlignCenter' | 'AlignDefault';
export declare type TableCell = Array<Block>;
export interface InlineEltMap {
    Str: string;
    Emph: Array<Inline>;
    Strong: Array<Inline>;
    Strikeout: Array<Inline>;
    Superscript: Array<Inline>;
    Subscript: Array<Inline>;
    SmallCaps: Array<Inline>;
    Quoted: [QuoteType, Array<Inline>];
    Cite: [Array<Citation>, Array<Inline>];
    Code: [Attr, string];
    Space: undefined;
    SoftBreak: undefined;
    LineBreak: undefined;
    Math: [{
        t: MathType;
    }, string];
    RawInline: [Format, string];
    Link: [Attr, Array<Inline>, Target];
    Image: [Attr, Array<Inline>, Target];
    Note: Array<Block>;
    Span: [Attr, Array<Inline>];
}
export interface BlockEltMap {
    Plain: Array<Inline>;
    Para: Array<Inline>;
    LineBlock: Array<Array<Inline>>;
    CodeBlock: [Attr, string];
    RawBlock: [Format, string];
    BlockQuote: Array<Block>;
    OrderedList: [ListAttributes, Array<Array<Block>>];
    BulletList: Array<Array<Block>>;
    DefinitionList: Array<[Array<Inline>, Array<Array<Block>>]>;
    Header: [number, Attr, Array<Inline>];
    HorizontalRule: undefined;
    Table: [Array<Inline>, Array<Alignment>, Array<number>, Array<TableCell>, Array<Array<TableCell>>];
    Div: [Attr, Array<Block>];
    Null: undefined;
}
export declare type EltFunction<T extends keyof EltMap> = EltMap[T] extends undefined ? () => Elt<T> : EltMap[T] extends [infer A1] ? (a1: A1) => Elt<T> : EltMap[T] extends [infer A1, infer A2] ? (a1: A1, a2: A2) => Elt<T> : EltMap[T] extends [infer A1, infer A2, infer A3] ? (a1: A1, a2: A2, a3: A3) => Elt<T> : EltMap[T] extends [infer A1, infer A2, infer A3, infer A4] ? (a1: A1, a2: A2, a3: A3, a4: A4) => Elt<T> : EltMap[T] extends [infer A1, infer A2, infer A3, infer A4, infer A5] ? (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => Elt<T> : (a1: EltMap[T]) => Elt<T>;
export interface MetaEltMap {
    MetaString: string;
}
export declare type EltMap = InlineEltMap & BlockEltMap & MetaEltMap;
export interface Elt<A extends EltNames> {
    t: A;
    c: EltMap[A];
}
export declare type EltTypeMap = {
    [K in EltNames]: Elt<K>;
};
export declare type InlineEltNames = keyof InlineEltMap;
export declare type Inline = EltTypeMap[InlineEltNames];
export declare type BlockEltNames = keyof BlockEltMap;
export declare type Block = EltTypeMap[BlockEltNames];
export declare type EltNames = keyof EltMap;
export declare type MetaEltNames = keyof MetaEltMap;
export declare type Meta = EltTypeMap[MetaEltNames];
export declare type Tree = Block | Inline | Meta | string;
declare global  {
    interface ObjectConstructor {
        entries<K extends string, T>(o: {
            [Key in K]: T;
        }): [K, T][];
    }
}
export declare function toJSONFilter(action: FilterAction): void;
export declare function filter(data: Tree & {
    meta: any;
}, action: FilterAction, format: Format): Promise<Tree>;
export declare function walk(x: Tree, action: FilterAction, format: Format, meta: any): Promise<Tree>;
export declare function walk(x: Tree[], action: FilterAction, format: Format, meta: any): Promise<Tree[]>;
export declare function stringify(x: Tree): Promise<string>;
export declare function attributes(attrs?: {
    classes?: string[];
} & {
    [k: string]: string;
}): Attr;
export declare const Plain: (a1: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Plain">;
export declare const Para: (a1: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Para">;
export declare const CodeBlock: (a1: [string, string[], [string, string][]], a2: string) => Elt<"CodeBlock">;
export declare const RawBlock: (a1: string, a2: string) => Elt<"RawBlock">;
export declare const BlockQuote: (a1: (Elt<"Plain"> | Elt<"Para"> | Elt<"LineBlock"> | Elt<"CodeBlock"> | Elt<"RawBlock"> | Elt<"BlockQuote"> | Elt<"OrderedList"> | Elt<"BulletList"> | Elt<"DefinitionList"> | Elt<"Header"> | Elt<"HorizontalRule"> | Elt<"Table"> | Elt<"Div"> | Elt<"Null">)[]) => Elt<"BlockQuote">;
export declare const OrderedList: (a1: [number, ListNumberStyle, ListNumberDelim], a2: (Elt<"Plain"> | Elt<"Para"> | Elt<"LineBlock"> | Elt<"CodeBlock"> | Elt<"RawBlock"> | Elt<"BlockQuote"> | Elt<"OrderedList"> | Elt<"BulletList"> | Elt<"DefinitionList"> | Elt<"Header"> | Elt<"HorizontalRule"> | Elt<"Table"> | Elt<"Div"> | Elt<"Null">)[][]) => Elt<"OrderedList">;
export declare const BulletList: (a1: (Elt<"Plain"> | Elt<"Para"> | Elt<"LineBlock"> | Elt<"CodeBlock"> | Elt<"RawBlock"> | Elt<"BlockQuote"> | Elt<"OrderedList"> | Elt<"BulletList"> | Elt<"DefinitionList"> | Elt<"Header"> | Elt<"HorizontalRule"> | Elt<"Table"> | Elt<"Div"> | Elt<"Null">)[][]) => Elt<"BulletList">;
export declare const DefinitionList: (a1: [(Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[], (Elt<"Plain"> | Elt<"Para"> | Elt<"LineBlock"> | Elt<"CodeBlock"> | Elt<"RawBlock"> | Elt<"BlockQuote"> | Elt<"OrderedList"> | Elt<"BulletList"> | Elt<"DefinitionList"> | Elt<"Header"> | Elt<"HorizontalRule"> | Elt<"Table"> | Elt<"Div"> | Elt<"Null">)[][]][]) => Elt<"DefinitionList">;
export declare const Header: (a1: number, a2: [string, string[], [string, string][]], a3: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Header">;
export declare const HorizontalRule: () => Elt<"HorizontalRule">;
export declare const Table: (a1: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[], a2: Alignment[], a3: number[], a4: (Elt<"Plain"> | Elt<"Para"> | Elt<"LineBlock"> | Elt<"CodeBlock"> | Elt<"RawBlock"> | Elt<"BlockQuote"> | Elt<"OrderedList"> | Elt<"BulletList"> | Elt<"DefinitionList"> | Elt<"Header"> | Elt<"HorizontalRule"> | Elt<"Table"> | Elt<"Div"> | Elt<"Null">)[][], a5: (Elt<"Plain"> | Elt<"Para"> | Elt<"LineBlock"> | Elt<"CodeBlock"> | Elt<"RawBlock"> | Elt<"BlockQuote"> | Elt<"OrderedList"> | Elt<"BulletList"> | Elt<"DefinitionList"> | Elt<"Header"> | Elt<"HorizontalRule"> | Elt<"Table"> | Elt<"Div"> | Elt<"Null">)[][][]) => Elt<"Table">;
export declare const Div: (a1: [string, string[], [string, string][]], a2: (Elt<"Plain"> | Elt<"Para"> | Elt<"LineBlock"> | Elt<"CodeBlock"> | Elt<"RawBlock"> | Elt<"BlockQuote"> | Elt<"OrderedList"> | Elt<"BulletList"> | Elt<"DefinitionList"> | Elt<"Header"> | Elt<"HorizontalRule"> | Elt<"Table"> | Elt<"Div"> | Elt<"Null">)[]) => Elt<"Div">;
export declare const Null: () => Elt<"Null">;
export declare const Str: (a1: string) => Elt<"Str">;
export declare const Emph: (a1: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Emph">;
export declare const Strong: (a1: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Strong">;
export declare const Strikeout: (a1: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Strikeout">;
export declare const Superscript: (a1: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Superscript">;
export declare const Subscript: (a1: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Subscript">;
export declare const SmallCaps: (a1: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"SmallCaps">;
export declare const Quoted: (a1: QuoteType, a2: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Quoted">;
export declare const Cite: (a1: Citation[], a2: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Cite">;
export declare const Code: (a1: [string, string[], [string, string][]], a2: string) => Elt<"Code">;
export declare const Space: () => Elt<"Space">;
export declare const LineBreak: () => Elt<"LineBreak">;
export declare const Formula: (a1: {
    t: MathType;
}, a2: string) => Elt<"Math">;
export declare const RawInline: (a1: string, a2: string) => Elt<"RawInline">;
export declare const Link: (a1: [string, string[], [string, string][]], a2: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[], a3: [string, string]) => Elt<"Link">;
export declare const Image: (a1: [string, string[], [string, string][]], a2: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[], a3: [string, string]) => Elt<"Image">;
export declare const Note: (a1: (Elt<"Plain"> | Elt<"Para"> | Elt<"LineBlock"> | Elt<"CodeBlock"> | Elt<"RawBlock"> | Elt<"BlockQuote"> | Elt<"OrderedList"> | Elt<"BulletList"> | Elt<"DefinitionList"> | Elt<"Header"> | Elt<"HorizontalRule"> | Elt<"Table"> | Elt<"Div"> | Elt<"Null">)[]) => Elt<"Note">;
export declare const Span: (a1: [string, string[], [string, string][]], a2: (Elt<"Str"> | Elt<"Emph"> | Elt<"Strong"> | Elt<"Strikeout"> | Elt<"Superscript"> | Elt<"Subscript"> | Elt<"SmallCaps"> | Elt<"Quoted"> | Elt<"Cite"> | Elt<"Code"> | Elt<"Space"> | Elt<"SoftBreak"> | Elt<"LineBreak"> | Elt<"Math"> | Elt<"RawInline"> | Elt<"Link"> | Elt<"Image"> | Elt<"Note"> | Elt<"Span">)[]) => Elt<"Span">;
export declare const stdio: typeof toJSONFilter;
