"use strict";
/*! pandoc-filter-node | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function toJSONFilter(action) {
    require('get-stdin')(function (json) {
        var data = JSON.parse(json);
        var format = process.argv.length > 2 ? process.argv[2] : '';
        filter(data, action, format)
            .then(function (output) {
            process.stdout.write(JSON.stringify(output));
        })
            .catch(function (e) {
            console.error(e);
        });
    });
}
exports.toJSONFilter = toJSONFilter;
function filter(data, action, format) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, walk(data, action, format, data.meta || data[0].unMeta)];
        });
    });
}
exports.filter = filter;
function walk(x, action, format, meta) {
    return __awaiter(this, void 0, void 0, function () {
        var array, _i, x_1, item, res, _a, _b, _c, res_1, z, _d, _e, _f, _g, _h, _j, obj, _k, _l, _m, k, v, _o, _p;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    if (!Array.isArray(x)) return [3, 16];
                    array = [];
                    _i = 0, x_1 = x;
                    _q.label = 1;
                case 1:
                    if (!(_i < x_1.length)) return [3, 15];
                    item = x_1[_i];
                    if (!(typeof item === 'object')) return [3, 12];
                    return [4, action(item, format, meta)];
                case 2:
                    res = _q.sent();
                    if (!!res) return [3, 4];
                    _b = (_a = array).push;
                    return [4, walk(item, action, format, meta)];
                case 3:
                    _b.apply(_a, [_q.sent()]);
                    return [3, 11];
                case 4:
                    if (!Array.isArray(res)) return [3, 9];
                    _c = 0, res_1 = res;
                    _q.label = 5;
                case 5:
                    if (!(_c < res_1.length)) return [3, 8];
                    z = res_1[_c];
                    _e = (_d = array).push;
                    return [4, walk(z, action, format, meta)];
                case 6:
                    _e.apply(_d, [_q.sent()]);
                    _q.label = 7;
                case 7:
                    _c++;
                    return [3, 5];
                case 8: return [3, 11];
                case 9:
                    _g = (_f = array).push;
                    return [4, walk(res, action, format, meta)];
                case 10:
                    _g.apply(_f, [_q.sent()]);
                    _q.label = 11;
                case 11: return [3, 14];
                case 12:
                    _j = (_h = array).push;
                    return [4, walk(item, action, format, meta)];
                case 13:
                    _j.apply(_h, [_q.sent()]);
                    _q.label = 14;
                case 14:
                    _i++;
                    return [3, 1];
                case 15: return [2, array];
                case 16:
                    if (!(typeof x === 'object')) return [3, 21];
                    obj = Object.assign({}, x);
                    _k = 0, _l = Object.entries(obj);
                    _q.label = 17;
                case 17:
                    if (!(_k < _l.length)) return [3, 20];
                    _m = _l[_k], k = _m[0], v = _m[1];
                    _o = obj;
                    _p = k;
                    return [4, walk(v, action, format, meta)];
                case 18:
                    _o[_p] = _q.sent();
                    _q.label = 19;
                case 19:
                    _k++;
                    return [3, 17];
                case 20: return [2, obj];
                case 21: return [2, x];
            }
        });
    });
}
exports.walk = walk;
function stringify(x) {
    return __awaiter(this, void 0, void 0, function () {
        var result, go;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!Array.isArray(x) && typeof x === 'object' && x.t === 'MetaString')
                        return [2, x.c];
                    result = [];
                    go = function (x) {
                        if (x.t === 'Str')
                            result.push(x.c);
                        else if (x.t === 'Code')
                            result.push(x.c[1]);
                        else if (x.t === 'Math')
                            result.push(x.c[1]);
                        else if (x.t === 'LineBreak')
                            result.push(' ');
                        else if (x.t === 'Space')
                            result.push(' ');
                    };
                    return [4, walk(x, go, '', {})];
                case 1:
                    _a.sent();
                    return [2, result.join('')];
            }
        });
    });
}
exports.stringify = stringify;
function attributes(attrs) {
    if (attrs === void 0) { attrs = {}; }
    var ident = attrs.id || '';
    var classes = attrs.classes || [];
    var keyvals = [];
    for (var _i = 0, _a = Object.entries(attrs); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], v = _b[1];
        if (k !== 'classes' && k !== 'id')
            keyvals.push([k, v]);
    }
    return [ident, classes, keyvals];
}
exports.attributes = attributes;
function elt(eltType, numargs) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        if (len !== numargs)
            throw new Error(eltType + ' expects ' + numargs + ' arguments, but given ' + len);
        return { t: eltType, c: len === 1 ? args[0] : args };
    };
}
exports.Plain = elt('Plain', 1);
exports.Para = elt('Para', 1);
exports.CodeBlock = elt('CodeBlock', 2);
exports.RawBlock = elt('RawBlock', 2);
exports.BlockQuote = elt('BlockQuote', 1);
exports.OrderedList = elt('OrderedList', 2);
exports.BulletList = elt('BulletList', 1);
exports.DefinitionList = elt('DefinitionList', 1);
exports.Header = elt('Header', 3);
exports.HorizontalRule = elt('HorizontalRule', 0);
exports.Table = elt('Table', 5);
exports.Div = elt('Div', 2);
exports.Null = elt('Null', 0);
exports.Str = elt('Str', 1);
exports.Emph = elt('Emph', 1);
exports.Strong = elt('Strong', 1);
exports.Strikeout = elt('Strikeout', 1);
exports.Superscript = elt('Superscript', 1);
exports.Subscript = elt('Subscript', 1);
exports.SmallCaps = elt('SmallCaps', 1);
exports.Quoted = elt('Quoted', 2);
exports.Cite = elt('Cite', 2);
exports.Code = elt('Code', 2);
exports.Space = elt('Space', 0);
exports.LineBreak = elt('LineBreak', 0);
exports.Formula = elt('Math', 2);
exports.RawInline = elt('RawInline', 2);
exports.Link = elt('Link', 3);
exports.Image = elt('Image', 3);
exports.Note = elt('Note', 1);
exports.Span = elt('Span', 2);
exports.stdio = toJSONFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0ZBQXdGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEt4RixzQkFBNkIsTUFBb0I7SUFDL0MsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVMsSUFBWTtRQUN4QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzNCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQzNELE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQzthQUN6QixJQUFJLENBQUMsVUFBUyxNQUFNO1lBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUM5QyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBUyxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQVpELG9DQVlDO0FBS0QsZ0JBQ0UsSUFBWSxFQUNaLE1BQW9CLEVBQ3BCLE1BQWM7OztZQUVkLFdBQU8sSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzs7Q0FDL0Q7QUFORCx3QkFNQztBQTRCRCxjQUNFLENBQXlCLEVBQ3pCLE1BQW9CLEVBQ3BCLE1BQWMsRUFDZCxJQUFXOzs7Ozs7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QUFDLENBQUE7QUFDdkIsUUFBQSxTQUFTLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUMvQixRQUFBLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3hCLFFBQUEsU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDL0IsUUFBQSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNyQixRQUFBLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3ZCLFFBQUEsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDckIsUUFBQSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUdyQixRQUFBLEtBQUssR0FBRyxZQUFZLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgcGFuZG9jLWZpbHRlci1ub2RlIHwgKEMpIDIwMTQgTWlrZSBIZW5kZXJzb24gPG12aGVuZGVyc29uQHRkcy5uZXQ+IHwgTGljZW5zZTogTUlUICovXG4vKipcbiAqIFR5cGVzY3JpcHQgcG9ydCBvZiBodHRwczovL2dpdGh1Yi5jb20vamdtL3BhbmRvY2ZpbHRlcnNcbiAqL1xuXG5leHBvcnQgdHlwZSBGaWx0ZXJBY3Rpb24gPSAoXG4gIGVsdDogV2Fsa2FibGUsXG4gIGZvcm1hdDogc3RyaW5nLFxuICBtZXRhPzogTWV0YSxcbikgPT4gdm9pZCB8IFdhbGthYmxlIHwgV2Fsa2FibGVbXSB8IFByb21pc2U8dm9pZCB8IFdhbGthYmxlIHwgV2Fsa2FibGVbXT5cblxuZXhwb3J0IGludGVyZmFjZSB0YWdnZWROb0NvbnRlbnQ8VD4ge1xuICB0OiBUXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YU1hcCB7XG4gIFtrOiBzdHJpbmddOiBNZXRhVmFsdWVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbHQ8VCBleHRlbmRzIG9iamVjdCwgSyBleHRlbmRzIGtleW9mIFQ+IHtcbiAgdDogS1xuICBjOiBUW0tdXG59XG5leHBvcnQgdHlwZSBUYWc8VCBleHRlbmRzIG9iamVjdD4gPSB7IFtLIGluIGtleW9mIFRdOiBFbHQ8VCwgSz4gfVtrZXlvZiBUXVxuXG5leHBvcnQgdHlwZSBNZXRhVmFsdWUgPSBUYWc8TWV0YVZhbHVlTWFwPlxuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFWYWx1ZU1hcCB7XG4gIE1ldGFNYXA6IE1ldGFNYXBcbiAgTWV0YUxpc3Q6IE1ldGFWYWx1ZVtdXG4gIE1ldGFCb29sOiBib29sZWFuXG4gIE1ldGFTdHJpbmc6IHN0cmluZ1xuICBNZXRhSW5saW5lczogSW5saW5lW11cbiAgTWV0YUJsb2NrczogQmxvY2tbXVxufVxuXG5leHBvcnQgdHlwZSBNZXRhID0gTWV0YU1hcFxuXG5leHBvcnQgdHlwZSBDaXRhdGlvbk1vZGUgPSB0YWdnZWROb0NvbnRlbnQ8XG4gICdBdXRob3JJblRleHQnIHwgJ1N1cHByZXNzQXV0aG9yJyB8ICdOb3JtYWxDaXRhdGlvbidcbiAgPlxuXG5leHBvcnQgdHlwZSBDaXRhdGlvbiA9IHtcbiAgY2l0YXRpb25JZDogc3RyaW5nXG4gIGNpdGF0aW9uUHJlZml4OiBJbmxpbmVbXVxuICBjaXRhdGlvblN1ZmZpeDogSW5saW5lW11cbiAgY2l0YXRpb25Nb2RlOiBDaXRhdGlvbk1vZGVcbiAgY2l0YXRpb25Ob3RlTnVtOiBudW1iZXJcbiAgY2l0YXRpb25IYXNoOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgUXVvdGVUeXBlID0gdGFnZ2VkTm9Db250ZW50PCdTaW5nbGVRdW90ZScgfCAnRG91YmxlUXVvdGUnPlxuXG5leHBvcnQgdHlwZSBNYXRoVHlwZSA9IHRhZ2dlZE5vQ29udGVudDwnRGlzcGxheU1hdGgnIHwgJ0lubGluZU1hdGgnPlxuXG5leHBvcnQgdHlwZSBMaXN0TnVtYmVyU3R5bGUgPSB0YWdnZWROb0NvbnRlbnQ8XG4gIHwgJ0RlZmF1bHRTdHlsZSdcbiAgfCAnRXhhbXBsZSdcbiAgfCAnRGVjaW1hbCdcbiAgfCAnTG93ZXJSb21hbidcbiAgfCAnVXBwZXJSb21hbidcbiAgfCAnTG93ZXJBbHBoYSdcbiAgfCAnVXBwZXJBbHBoYSdcbiAgPlxuXG5leHBvcnQgdHlwZSBMaXN0TnVtYmVyRGVsaW0gPSB0YWdnZWROb0NvbnRlbnQ8XG4gICdEZWZhdWx0RGVsaW0nIHwgJ1BlcmlvZCcgfCAnT25lUGFyZW4nIHwgJ1R3b1BhcmVucydcbiAgPlxuXG5leHBvcnQgdHlwZSBBbGlnbm1lbnQgPSB0YWdnZWROb0NvbnRlbnQ8XG4gICdBbGlnbkxlZnQnIHwgJ0FsaWduUmlnaHQnIHwgJ0FsaWduQ2VudGVyJyB8ICdBbGlnbkRlZmF1bHQnXG4gID5cblxuZXhwb3J0IHR5cGUgSW5saW5lID0gVGFnPElubGluZU1hcD5cblxuZXhwb3J0IGludGVyZmFjZSBJbmxpbmVNYXAge1xuICBTdHI6IHN0cmluZ1xuICBFbXBoOiBJbmxpbmVbXVxuICBTdHJvbmc6IElubGluZVtdXG4gIFN0cmlrZW91dDogSW5saW5lW11cbiAgU3VwZXJzY3JpcHQ6IElubGluZVtdXG4gIFN1YnNjcmlwdDogSW5saW5lW11cbiAgU21hbGxDYXBzOiBJbmxpbmVbXVxuICBRdW90ZWQ6IFtRdW90ZVR5cGUsIElubGluZVtdXVxuICBDaXRlOiBbQ2l0YXRpb24sIElubGluZVtdXVxuICBDb2RlOiBbQXR0ciwgc3RyaW5nXVxuICBNYXRoOiBbTWF0aFR5cGUsIHN0cmluZ11cbiAgUmF3SW5saW5lOiBbc3RyaW5nLCBzdHJpbmddXG4gIExpbms6IFtBdHRyLCBJbmxpbmVbXSwgVGFyZ2V0XVxuICBJbWFnZTogW0F0dHIsIElubGluZVtdLCBUYXJnZXRdXG4gIE5vdGU6IEJsb2NrW11cbiAgU3BhbjogW0F0dHIsIElubGluZVtdXVxuICBTcGFjZTogdW5kZWZpbmVkXG4gIFNvZnRCcmVhazogdW5kZWZpbmVkXG4gIExpbmVCcmVhazogdW5kZWZpbmVkXG59XG5cbmV4cG9ydCB0eXBlIEF0dHIgPSBbc3RyaW5nLCBzdHJpbmdbXSwgW3N0cmluZywgc3RyaW5nXVtdXVxuXG5leHBvcnQgdHlwZSBUYXJnZXQgPSBbc3RyaW5nLCBzdHJpbmddXG5cbmV4cG9ydCB0eXBlIEJsb2NrID0gVGFnPEJsb2NrTWFwPlxuXG5leHBvcnQgaW50ZXJmYWNlIEJsb2NrTWFwIHtcbiAgUGxhaW46IElubGluZVtdXG4gIFBhcmE6IElubGluZVtdXG4gIExpbmVCbG9jazogSW5saW5lW11bXVxuICBDb2RlQmxvY2s6IFtBdHRyLCBzdHJpbmddXG4gIFJhd0Jsb2NrOiBbc3RyaW5nLCBzdHJpbmddXG4gIEJsb2NrUXVvdGU6IEJsb2NrW11cbiAgT3JkZXJlZExpc3Q6IFtMaXN0QXR0cnMsIEJsb2NrW11bXV1cbiAgQnVsbGV0TGlzdDogQmxvY2tbXVtdXG4gIERlZmluaXRpb25MaXN0OiBBcnJheTxbSW5saW5lW10sIEJsb2NrW11bXV0+XG4gIEhlYWRlcjogW251bWJlciwgQXR0ciwgSW5saW5lW11dXG4gIFRhYmxlOiBbSW5saW5lW10sIEFsaWdubWVudFtdLCBudW1iZXJbXSwgQmxvY2tbXSwgQmxvY2tbXVtdXVxuICBEaXY6IFtBdHRyLCBCbG9ja1tdXVxuICBIb3Jpem9udGFsUnVsZTogdW5kZWZpbmVkXG4gIE51bGw6IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgdHlwZSBMaXN0QXR0cnMgPSBbbnVtYmVyLCBMaXN0TnVtYmVyU3R5bGUsIExpc3ROdW1iZXJEZWxpbV1cblxuZXhwb3J0IHR5cGUgUGFuZG9jID0ge1xuICAncGFuZG9jLWFwaS12ZXJzaW9uJzogc3RyaW5nXG4gIG1ldGE6IE1ldGFcbiAgYmxvY2tzOiBCbG9ja1tdXG59XG5cbmV4cG9ydCB0eXBlIEVsdEZ1bmN0aW9uPFQgZXh0ZW5kcyBrZXlvZiBFbHRNYXA+ID1cbiAgRWx0TWFwW1RdIGV4dGVuZHMgdW5kZWZpbmVkXG4gICAgPyAoKSA9PiBFbHQ8RWx0TWFwLCBUPlxuICA6IEVsdE1hcFtUXSBleHRlbmRzIFtpbmZlciBBMV1cbiAgICA/IChhMTogQTEpID0+IEVsdDxFbHRNYXAsIFQ+XG4gIDogRWx0TWFwW1RdIGV4dGVuZHMgW2luZmVyIEExLCBpbmZlciBBMl1cbiAgICA/IChhMTogQTEsIGEyOiBBMikgPT4gRWx0PEVsdE1hcCwgVD5cbiAgOiBFbHRNYXBbVF0gZXh0ZW5kcyBbaW5mZXIgQTEsIGluZmVyIEEyLCBpbmZlciBBM11cbiAgICA/IChhMTogQTEsIGEyOiBBMiwgYTM6IEEzKSA9PiBFbHQ8RWx0TWFwLCBUPlxuICA6IEVsdE1hcFtUXSBleHRlbmRzIFtpbmZlciBBMSwgaW5mZXIgQTIsIGluZmVyIEEzLCBpbmZlciBBNF1cbiAgICA/IChhMTogQTEsIGEyOiBBMiwgYTM6IEEzLCBhNDogQTQpID0+IEVsdDxFbHRNYXAsIFQ+XG4gIDogRWx0TWFwW1RdIGV4dGVuZHMgW2luZmVyIEExLCBpbmZlciBBMiwgaW5mZXIgQTMsIGluZmVyIEE0LCBpbmZlciBBNV1cbiAgICA/IChhMTogQTEsIGEyOiBBMiwgYTM6IEEzLCBhNDogQTQsIGE1OiBBNSkgPT4gRWx0PEVsdE1hcCwgVD5cbiAgOiAoYTE6IEVsdE1hcFtUXSkgPT4gRWx0PEVsdE1hcCwgVD5cblxudHlwZSBOdW1BcmdzPFQgZXh0ZW5kcyBrZXlvZiBFbHRNYXA+ID1cbiAgRWx0RnVuY3Rpb248VD4gZXh0ZW5kcyAoKSA9PiBhbnkgPyAwXG4gIDogRWx0RnVuY3Rpb248VD4gZXh0ZW5kcyAoYTE6IGFueSkgPT4gYW55ID8gMVxuICA6IEVsdEZ1bmN0aW9uPFQ+IGV4dGVuZHMgKGExOiBhbnksIGEyOiBhbnkpID0+IGFueSA/IDJcbiAgOiBFbHRGdW5jdGlvbjxUPiBleHRlbmRzIChhMTogYW55LCBhMjogYW55LCBhMzogYW55KSA9PiBhbnkgPyAzXG4gIDogRWx0RnVuY3Rpb248VD4gZXh0ZW5kcyAoYTE6IGFueSwgYTI6IGFueSwgYTM6IGFueSwgYTQ6IGFueSkgPT4gYW55ID8gNFxuICA6IEVsdEZ1bmN0aW9uPFQ+IGV4dGVuZHMgKGExOiBhbnksIGEyOiBhbnksIGEzOiBhbnksIGE0OiBhbnksIGE1OiBhbnkpID0+IGFueSA/IDVcbiAgOiBuZXZlclxuXG5leHBvcnQgdHlwZSBFbHRUeXBlTWFwID0geyBbSyBpbiBrZXlvZiBFbHRNYXBdOiBFbHQ8RWx0TWFwLCBLPiB9XG5cbmV4cG9ydCB0eXBlIEVsdE1hcCA9IElubGluZU1hcCAmIEJsb2NrTWFwICYgTWV0YVZhbHVlTWFwXG5leHBvcnQgdHlwZSBXYWxrYWJsZSA9IEJsb2NrIHwgSW5saW5lIHwgTWV0YVZhbHVlXG5leHBvcnQgdHlwZSBUcmVlID0gV2Fsa2FibGUgfCBzdHJpbmdcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhY3Rpb24gaW50byBhIGZpbHRlciB0aGF0IHJlYWRzIGEgSlNPTi1mb3JtYXR0ZWQgcGFuZG9jXG4gKiBkb2N1bWVudCBmcm9tIHN0ZGluLCB0cmFuc2Zvcm1zIGl0IGJ5IHdhbGtpbmcgdGhlIHRyZWUgd2l0aCB0aGUgYWN0aW9uLCBhbmRcbiAqIHJldHVybnMgYSBuZXcgSlNPTi1mb3JtYXR0ZWQgcGFuZG9jIGRvY3VtZW50IHRvIHN0ZG91dC4gVGhlIGFyZ3VtZW50IGlzIGFcbiAqIGZ1bmN0aW9uIGFjdGlvbihrZXksIHZhbHVlLCBmb3JtYXQsIG1ldGEpLCB3aGVyZSBrZXkgaXMgdGhlIHR5cGUgb2YgdGhlXG4gKiBwYW5kb2Mgb2JqZWN0IChlLmcuICdTdHInLCAnUGFyYScpLCB2YWx1ZSBpcyB0aGUgY29udGVudHMgb2YgdGhlIG9iamVjdFxuICogKGUuZy4gYSBzdHJpbmcgZm9yICdTdHInLCBhIGxpc3Qgb2YgaW5saW5lIGVsZW1lbnRzIGZvciAnUGFyYScpLCBmb3JtYXQgaXNcbiAqIHRoZSB0YXJnZXQgb3V0cHV0IGZvcm1hdCAod2hpY2ggd2lsbCBiZSB0YWtlbiBmb3IgdGhlIGZpcnN0IGNvbW1hbmRcbiAqIGxpbmUgYXJndW1lbnQgaWYgcHJlc2VudCksIGFuZCBtZXRhIGlzIHRoZSBkb2N1bWVudCdzIG1ldGFkYXRhLiBJZiB0aGVcbiAqIGZ1bmN0aW9uIHJldHVybnMgTm9uZSwgdGhlIG9iamVjdCB0byB3aGljaCBpdCBhcHBsaWVzIHdpbGwgcmVtYWluXG4gKiB1bmNoYW5nZWQuIElmIGl0IHJldHVybnMgYW4gb2JqZWN0LCB0aGUgb2JqZWN0IHdpbGwgYmUgcmVwbGFjZWQuIElmIGl0XG4gKiByZXR1cm5zIGEgbGlzdCwgdGhlIGxpc3Qgd2lsbCBiZSBzcGxpY2VkIGluIHRvIHRoZSBsaXN0IHRvIHdoaWNoIHRoZSB0YXJnZXRcbiAqIG9iamVjdCBiZWxvbmdzLiAoU28sIHJldHVybmluZyBhbiBlbXB0eSBsaXN0IGRlbGV0ZXMgdGhlIG9iamVjdC4pXG4gKlxuICogQHBhcmFtICB7RnVuY3Rpb259IGFjdGlvbiBDYWxsYmFjayB0byBhcHBseSB0byBldmVyeSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvSlNPTkZpbHRlcihhY3Rpb246IEZpbHRlckFjdGlvbik6IHZvaWQge1xuICByZXF1aXJlKCdnZXQtc3RkaW4nKShmdW5jdGlvbihqc29uOiBzdHJpbmcpIHtcbiAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoanNvbilcbiAgICB2YXIgZm9ybWF0ID0gcHJvY2Vzcy5hcmd2Lmxlbmd0aCA+IDIgPyBwcm9jZXNzLmFyZ3ZbMl0gOiAnJ1xuICAgIGZpbHRlcihkYXRhLCBhY3Rpb24sIGZvcm1hdClcbiAgICAgIC50aGVuKGZ1bmN0aW9uKG91dHB1dCkge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShKU09OLnN0cmluZ2lmeShvdXRwdXQpKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICogRmlsdGVyIHRoZSBnaXZlbiBvYmplY3RcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbHRlcihcbiAgZGF0YTogUGFuZG9jLFxuICBhY3Rpb246IEZpbHRlckFjdGlvbixcbiAgZm9ybWF0OiBzdHJpbmcsXG4pOiBQcm9taXNlPFBhbmRvYz4ge1xuICByZXR1cm4gd2FsayhkYXRhLCBhY3Rpb24sIGZvcm1hdCwgZGF0YS5tZXRhIHx8IGRhdGFbMF0udW5NZXRhKVxufVxuXG4vKipcbiAqIFdhbGsgYSB0cmVlLCBhcHBseWluZyBhbiBhY3Rpb24gdG8gZXZlcnkgb2JqZWN0LlxuICogQHBhcmFtICB7T2JqZWN0fSAgIHggICAgICBUaGUgb2JqZWN0IHRvIHRyYXZlcnNlXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYWN0aW9uIENhbGxiYWNrIHRvIGFwcGx5IHRvIGVhY2ggaXRlbVxuICogQHBhcmFtICB7U3RyaW5nfSAgIGZvcm1hdCBPdXRwdXQgZm9ybWF0XG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgbWV0YSAgIFBhbmRvYyBtZXRhZGF0YVxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICBUaGUgbW9kaWZpZWQgdHJlZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd2FsayhcbiAgeDogUGFuZG9jLFxuICBhY3Rpb246IEZpbHRlckFjdGlvbixcbiAgZm9ybWF0OiBzdHJpbmcsXG4gIG1ldGE/OiBNZXRhLFxuKTogUHJvbWlzZTxQYW5kb2M+XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd2FsayhcbiAgeDogVHJlZSxcbiAgYWN0aW9uOiBGaWx0ZXJBY3Rpb24sXG4gIGZvcm1hdDogc3RyaW5nLFxuICBtZXRhPzogTWV0YSxcbik6IFByb21pc2U8VHJlZT5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YWxrKFxuICB4OiBUcmVlW10sXG4gIGFjdGlvbjogRmlsdGVyQWN0aW9uLFxuICBmb3JtYXQ6IHN0cmluZyxcbiAgbWV0YT86IE1ldGEsXG4pOiBQcm9taXNlPFRyZWVbXT5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YWxrKFxuICB4OiBUcmVlIHwgVHJlZVtdIHwgUGFuZG9jLFxuICBhY3Rpb246IEZpbHRlckFjdGlvbixcbiAgZm9ybWF0OiBzdHJpbmcsXG4gIG1ldGE/OiBNZXRhLFxuKTogUHJvbWlzZTxUcmVlIHwgVHJlZVtdIHwgUGFuZG9jPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHgpKSB7XG4gICAgdmFyIGFycmF5OiBUcmVlW10gPSBbXVxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB4KSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCBhY3Rpb24oaXRlbSwgZm9ybWF0LCBtZXRhKVxuICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgIGFycmF5LnB1c2goYXdhaXQgd2FsayhpdGVtLCBhY3Rpb24sIGZvcm1hdCwgbWV0YSkpXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXMpKSB7XG4gICAgICAgICAgZm9yIChjb25zdCB6IG9mIHJlcykge1xuICAgICAgICAgICAgYXJyYXkucHVzaChhd2FpdCB3YWxrKHosIGFjdGlvbiwgZm9ybWF0LCBtZXRhKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJyYXkucHVzaChhd2FpdCB3YWxrKHJlcywgYWN0aW9uLCBmb3JtYXQsIG1ldGEpKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheS5wdXNoKGF3YWl0IHdhbGsoaXRlbSwgYWN0aW9uLCBmb3JtYXQsIG1ldGEpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlcbiAgfSBlbHNlIGlmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuYXNzaWduKHt9LCB4KVxuICAgIGZvcihjb25zdCBbayx2XSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XG4gICAgICBvYmpba10gPSBhd2FpdCB3YWxrKHYsIGFjdGlvbiwgZm9ybWF0LCBtZXRhKVxuICAgIH1cbiAgICByZXR1cm4gb2JqXG4gIH1cbiAgcmV0dXJuIHhcbn1cblxuLyoqXG4gKiBXYWxrcyB0aGUgdHJlZSB4IGFuZCByZXR1cm5zIGNvbmNhdGVuYXRlZCBzdHJpbmcgY29udGVudCwgbGVhdmluZyBvdXQgYWxsXG4gKiBmb3JtYXR0aW5nLlxuICogQHBhcmFtICB7T2JqZWN0fSB4IFRoZSBvYmplY3QgdG8gd2Fsa1xuICogQHJldHVybiB7U3RyaW5nfSAgIEpTT04gc3RyaW5nXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdHJpbmdpZnkoeDogVHJlZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh4KSAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeC50ID09PSAnTWV0YVN0cmluZycpXG4gICAgcmV0dXJuIHguY1xuXG4gIHZhciByZXN1bHQ6IHN0cmluZ1tdID0gW11cbiAgdmFyIGdvOiBGaWx0ZXJBY3Rpb24gPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHgudCA9PT0gJ1N0cicpIHJlc3VsdC5wdXNoKHguYylcbiAgICBlbHNlIGlmICh4LnQgPT09ICdDb2RlJykgcmVzdWx0LnB1c2goeC5jWzFdKVxuICAgIGVsc2UgaWYgKHgudCA9PT0gJ01hdGgnKSByZXN1bHQucHVzaCh4LmNbMV0pXG4gICAgZWxzZSBpZiAoeC50ID09PSAnTGluZUJyZWFrJykgcmVzdWx0LnB1c2goJyAnKVxuICAgIGVsc2UgaWYgKHgudCA9PT0gJ1NwYWNlJykgcmVzdWx0LnB1c2goJyAnKVxuICB9XG4gIGF3YWl0IHdhbGsoeCwgZ28sICcnLCB7fSlcbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKVxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXR0cmlidXRlIGxpc3QsIGNvbnN0cnVjdGVkIGZyb20gdGhlIGRpY3Rpb25hcnkgYXR0cnMuXG4gKiBAcGFyYW0gIHtPYmplY3R9IGF0dHJzIEF0dHJpYnV0ZSBkaWN0aW9uYXJ5XG4gKiBAcmV0dXJuIHtBcnJheX0gICAgICAgIEF0dHJpYnV0ZSBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdHRyaWJ1dGVzKFxuICBhdHRyczogeyBjbGFzc2VzPzogc3RyaW5nW10gfSAmIHsgW2s6IHN0cmluZ106IHN0cmluZyB9ID0ge30sXG4pOiBBdHRyIHtcbiAgdmFyIGlkZW50ID0gYXR0cnMuaWQgfHwgJydcbiAgdmFyIGNsYXNzZXMgPSBhdHRycy5jbGFzc2VzIHx8IFtdXG4gIHZhciBrZXl2YWxzID0gW10gYXMgQXJyYXk8W3N0cmluZywgc3RyaW5nXT5cbiAgZm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMoYXR0cnMpKSB7XG4gICAgaWYgKGsgIT09ICdjbGFzc2VzJyAmJiBrICE9PSAnaWQnKSBrZXl2YWxzLnB1c2goW2ssIHZdKVxuICB9XG4gIHJldHVybiBbaWRlbnQsIGNsYXNzZXMsIGtleXZhbHNdXG59XG5cbi8vIFV0aWxpdHkgZm9yIGNyZWF0aW5nIGNvbnN0cnVjdG9yIGZ1bmN0aW9uc1xuZnVuY3Rpb24gZWx0PFQgZXh0ZW5kcyBrZXlvZiBFbHRNYXA+KFxuICBlbHRUeXBlOiBULFxuICBudW1hcmdzOiBOdW1BcmdzPFQ+LFxuKTogRWx0RnVuY3Rpb248VD4ge1xuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJnczogYW55W10pIHtcbiAgICB2YXIgbGVuID0gYXJncy5sZW5ndGhcbiAgICBpZiAobGVuICE9PSBudW1hcmdzKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBlbHRUeXBlICsgJyBleHBlY3RzICcgKyBudW1hcmdzICsgJyBhcmd1bWVudHMsIGJ1dCBnaXZlbiAnICsgbGVuLFxuICAgICAgKVxuICAgIHJldHVybiB7IHQ6IGVsdFR5cGUsIGM6IGxlbiA9PT0gMSA/IGFyZ3NbMF0gOiBhcmdzIH1cbiAgfSBhcyBFbHRGdW5jdGlvbjxUPlxufVxuXG5leHBvcnQgY29uc3QgUGxhaW4gPSBlbHQoJ1BsYWluJywgMSlcbmV4cG9ydCBjb25zdCBQYXJhID0gZWx0KCdQYXJhJywgMSlcbmV4cG9ydCBjb25zdCBDb2RlQmxvY2sgPSBlbHQoJ0NvZGVCbG9jaycsIDIpXG5leHBvcnQgY29uc3QgUmF3QmxvY2sgPSBlbHQoJ1Jhd0Jsb2NrJywgMilcbmV4cG9ydCBjb25zdCBCbG9ja1F1b3RlID0gZWx0KCdCbG9ja1F1b3RlJywgMSlcbmV4cG9ydCBjb25zdCBPcmRlcmVkTGlzdCA9IGVsdCgnT3JkZXJlZExpc3QnLCAyKVxuZXhwb3J0IGNvbnN0IEJ1bGxldExpc3QgPSBlbHQoJ0J1bGxldExpc3QnLCAxKVxuZXhwb3J0IGNvbnN0IERlZmluaXRpb25MaXN0ID0gZWx0KCdEZWZpbml0aW9uTGlzdCcsIDEpXG5leHBvcnQgY29uc3QgSGVhZGVyID0gZWx0KCdIZWFkZXInLCAzKVxuZXhwb3J0IGNvbnN0IEhvcml6b250YWxSdWxlID0gZWx0KCdIb3Jpem9udGFsUnVsZScsIDApXG5leHBvcnQgY29uc3QgVGFibGUgPSBlbHQoJ1RhYmxlJywgNSlcbmV4cG9ydCBjb25zdCBEaXYgPSBlbHQoJ0RpdicsIDIpXG5leHBvcnQgY29uc3QgTnVsbCA9IGVsdCgnTnVsbCcsIDApXG5cbi8vIENvbnN0cnVjdG9ycyBmb3IgaW5saW5lIGVsZW1lbnRzXG5cbmV4cG9ydCBjb25zdCBTdHIgPSBlbHQoJ1N0cicsIDEpXG5leHBvcnQgY29uc3QgRW1waCA9IGVsdCgnRW1waCcsIDEpXG5leHBvcnQgY29uc3QgU3Ryb25nID0gZWx0KCdTdHJvbmcnLCAxKVxuZXhwb3J0IGNvbnN0IFN0cmlrZW91dCA9IGVsdCgnU3RyaWtlb3V0JywgMSlcbmV4cG9ydCBjb25zdCBTdXBlcnNjcmlwdCA9IGVsdCgnU3VwZXJzY3JpcHQnLCAxKVxuZXhwb3J0IGNvbnN0IFN1YnNjcmlwdCA9IGVsdCgnU3Vic2NyaXB0JywgMSlcbmV4cG9ydCBjb25zdCBTbWFsbENhcHMgPSBlbHQoJ1NtYWxsQ2FwcycsIDEpXG5leHBvcnQgY29uc3QgUXVvdGVkID0gZWx0KCdRdW90ZWQnLCAyKVxuZXhwb3J0IGNvbnN0IENpdGUgPSBlbHQoJ0NpdGUnLCAyKVxuZXhwb3J0IGNvbnN0IENvZGUgPSBlbHQoJ0NvZGUnLCAyKVxuZXhwb3J0IGNvbnN0IFNwYWNlID0gZWx0KCdTcGFjZScsIDApXG5leHBvcnQgY29uc3QgTGluZUJyZWFrID0gZWx0KCdMaW5lQnJlYWsnLCAwKVxuZXhwb3J0IGNvbnN0IEZvcm11bGEgPSBlbHQoJ01hdGgnLCAyKSAvLyBkb24ndCBjb25mbGljdCB3aXRoIGpzIGJ1aWx0aW4gTWF0aFxuZXhwb3J0IGNvbnN0IFJhd0lubGluZSA9IGVsdCgnUmF3SW5saW5lJywgMilcbmV4cG9ydCBjb25zdCBMaW5rID0gZWx0KCdMaW5rJywgMylcbmV4cG9ydCBjb25zdCBJbWFnZSA9IGVsdCgnSW1hZ2UnLCAzKVxuZXhwb3J0IGNvbnN0IE5vdGUgPSBlbHQoJ05vdGUnLCAxKVxuZXhwb3J0IGNvbnN0IFNwYW4gPSBlbHQoJ1NwYW4nLCAyKVxuXG4vLyBhIGZldyBhbGlhc2VzXG5leHBvcnQgY29uc3Qgc3RkaW8gPSB0b0pTT05GaWx0ZXJcbiJdfQ==