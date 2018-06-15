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
        filter(data, action, format).then(function (output) {
            process.stdout.write(JSON.stringify(output));
        }).catch(function (e) {
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
        var array, _i, x_1, item, res, _a, _b, _c, res_1, z, _d, _e, _f, _g, _h, _j, obj, _k, _l, _m, k, s, _o, _p;
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
                    if (!(typeof item === 'object' && item.t)) return [3, 12];
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
                    obj = {};
                    _k = 0, _l = Object.entries(x);
                    _q.label = 17;
                case 17:
                    if (!(_k < _l.length)) return [3, 20];
                    _m = _l[_k], k = _m[0], s = _m[1];
                    _o = obj;
                    _p = k;
                    return [4, walk(s, action, format, meta)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0ZBQXdGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUt4RixzQkFBNkIsTUFBb0I7SUFDL0MsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVMsSUFBWTtRQUN4QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzNCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQzNELE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLE1BQU07WUFDL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQzlDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLENBQUM7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQVZELG9DQVVDO0FBS0QsZ0JBQ0UsSUFBMEIsRUFDMUIsTUFBb0IsRUFDcEIsTUFBYzs7O1lBRWQsV0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUE7OztDQUMvRDtBQU5ELHdCQU1DO0FBc0JELGNBQ0UsQ0FBZ0IsRUFDaEIsTUFBb0IsRUFDcEIsTUFBYyxFQUNkLElBQVM7Ozs7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Q3ZCLFFBQUEsU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDL0IsUUFBQSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUN4QixRQUFBLFNBQVMsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQy9CLFFBQUEsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDckIsUUFBQSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUN2QixRQUFBLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3JCLFFBQUEsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFHckIsUUFBQSxLQUFLLEdBQUcsWUFBWSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyohIHBhbmRvYy1maWx0ZXItbm9kZSB8IChDKSAyMDE0IE1pa2UgSGVuZGVyc29uIDxtdmhlbmRlcnNvbkB0ZHMubmV0PiB8IExpY2Vuc2U6IE1JVCAqL1xuLyoqXG4gKiBUeXBlc2NyaXB0IHBvcnQgb2YgaHR0cHM6Ly9naXRodWIuY29tL2pnbS9wYW5kb2NmaWx0ZXJzXG4gKi9cblxuZXhwb3J0IHR5cGUgRmlsdGVyQWN0aW9uID0gKFxuICBlbHQ6IEVsdFR5cGVNYXBbRWx0TmFtZXNdLFxuICBmb3JtYXQ6IHN0cmluZyxcbiAgbWV0YTogYW55LFxuKSA9PiB2b2lkIHwgVHJlZSB8IFByb21pc2U8dm9pZCB8IFRyZWU+XG5cbmV4cG9ydCB0eXBlIEF0dHJMaXN0ID0gQXJyYXk8W3N0cmluZywgc3RyaW5nXT5cblxuZXhwb3J0IHR5cGUgQXR0ciA9IFtzdHJpbmcsIEFycmF5PHN0cmluZz4sIEF0dHJMaXN0XVxuXG5leHBvcnQgdHlwZSBNYXRoVHlwZSA9ICdEaXNwbGF5TWF0aCcgfCAnSW5saW5lTWF0aCdcbmV4cG9ydCB0eXBlIFF1b3RlVHlwZSA9ICdTaW5nbGVRdW90ZScgfCAnRG91YmxlUXVvdGUnXG5leHBvcnQgdHlwZSBUYXJnZXQgPSBbc3RyaW5nLCBzdHJpbmddIC8vIFt1cmwsIHRpdGxlXVxuZXhwb3J0IHR5cGUgRm9ybWF0ID0gc3RyaW5nXG5cbmV4cG9ydCB0eXBlIENpdGF0aW9uTW9kZSA9ICdBdXRob3JJblRleHQnIHwgJ1N1cHByZXNzQXV0aG9yJyB8ICdOb3JtYWxDaXRhdGlvbidcblxuZXhwb3J0IHR5cGUgQ2l0YXRpb24gPSB7XG4gIGNpdGF0aW9uSWQ6IHN0cmluZ1xuICBjaXRhdGlvblByZWZpeDogQXJyYXk8SW5saW5lPlxuICBjaXRhdGlvblN1ZmZpeDogQXJyYXk8SW5saW5lPlxuICBjaXRhdGlvbk1vZGU6IENpdGF0aW9uTW9kZVxuICBjaXRhdGlvbk5vdGVOdW06IG51bWJlclxuICBjaXRhdGlvbkhhc2g6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBMaXN0TnVtYmVyU3R5bGUgPVxuICB8ICdEZWZhdWx0U3R5bGUnXG4gIHwgJ0V4YW1wbGUnXG4gIHwgJ0RlY2ltYWwnXG4gIHwgJ0xvd2VyUm9tYW4nXG4gIHwgJ1VwcGVyUm9tYW4nXG4gIHwgJ0xvd2VyQWxwaGEnXG4gIHwgJ1VwcGVyQWxwaGEnXG5cbmV4cG9ydCB0eXBlIExpc3ROdW1iZXJEZWxpbSA9XG4gIHwgJ0RlZmF1bHREZWxpbSdcbiAgfCAnUGVyaW9kJ1xuICB8ICdPbmVQYXJlbidcbiAgfCAnVHdvUGFyZW5zJ1xuXG5leHBvcnQgdHlwZSBMaXN0QXR0cmlidXRlcyA9IFtudW1iZXIsIExpc3ROdW1iZXJTdHlsZSwgTGlzdE51bWJlckRlbGltXVxuXG5leHBvcnQgdHlwZSBBbGlnbm1lbnQgPVxuICB8ICdBbGlnbkxlZnQnXG4gIHwgJ0FsaWduUmlnaHQnXG4gIHwgJ0FsaWduQ2VudGVyJ1xuICB8ICdBbGlnbkRlZmF1bHQnXG5cbmV4cG9ydCB0eXBlIFRhYmxlQ2VsbCA9IEFycmF5PEJsb2NrPlxuXG5leHBvcnQgaW50ZXJmYWNlIElubGluZUVsdE1hcCB7XG4gIC8vIElubGluZVxuICBTdHI6IHN0cmluZ1xuICBFbXBoOiBBcnJheTxJbmxpbmU+XG4gIFN0cm9uZzogQXJyYXk8SW5saW5lPlxuICBTdHJpa2VvdXQ6IEFycmF5PElubGluZT5cbiAgU3VwZXJzY3JpcHQ6IEFycmF5PElubGluZT5cbiAgU3Vic2NyaXB0OiBBcnJheTxJbmxpbmU+XG4gIFNtYWxsQ2FwczogQXJyYXk8SW5saW5lPlxuICBRdW90ZWQ6IFtRdW90ZVR5cGUsIEFycmF5PElubGluZT5dXG4gIENpdGU6IFtBcnJheTxDaXRhdGlvbj4sIEFycmF5PElubGluZT5dXG4gIENvZGU6IFtBdHRyLCBzdHJpbmddXG4gIFNwYWNlOiB1bmRlZmluZWRcbiAgU29mdEJyZWFrOiB1bmRlZmluZWRcbiAgTGluZUJyZWFrOiB1bmRlZmluZWRcbiAgTWF0aDogW01hdGhUeXBlLCBzdHJpbmddXG4gIFJhd0lubGluZTogW0Zvcm1hdCwgc3RyaW5nXVxuICBMaW5rOiBbQXR0ciwgQXJyYXk8SW5saW5lPiwgVGFyZ2V0XVxuICBJbWFnZTogW0F0dHIsIEFycmF5PElubGluZT4sIFRhcmdldF1cbiAgTm90ZTogQXJyYXk8QmxvY2s+XG4gIFNwYW46IFtBdHRyLCBBcnJheTxJbmxpbmU+XVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJsb2NrRWx0TWFwIHtcbiAgLy8gQmxvY2tcbiAgUGxhaW46IEFycmF5PElubGluZT5cbiAgUGFyYTogQXJyYXk8SW5saW5lPlxuICBMaW5lQmxvY2s6IEFycmF5PEFycmF5PElubGluZT4+XG4gIENvZGVCbG9jazogW0F0dHIsIHN0cmluZ11cbiAgUmF3QmxvY2s6IFtGb3JtYXQsIHN0cmluZ11cbiAgQmxvY2tRdW90ZTogQXJyYXk8QmxvY2s+XG4gIE9yZGVyZWRMaXN0OiBbTGlzdEF0dHJpYnV0ZXMsIEFycmF5PEFycmF5PEJsb2NrPj5dXG4gIEJ1bGxldExpc3Q6IEFycmF5PEFycmF5PEJsb2NrPj5cbiAgRGVmaW5pdGlvbkxpc3Q6IEFycmF5PFtBcnJheTxJbmxpbmU+LCBBcnJheTxBcnJheTxCbG9jaz4+XT5cbiAgSGVhZGVyOiBbbnVtYmVyLCBBdHRyLCBBcnJheTxJbmxpbmU+XVxuICBIb3Jpem9udGFsUnVsZTogdW5kZWZpbmVkXG4gIFRhYmxlOiBbXG4gICAgQXJyYXk8SW5saW5lPixcbiAgICBBcnJheTxBbGlnbm1lbnQ+LFxuICAgIEFycmF5PG51bWJlcj4sXG4gICAgQXJyYXk8VGFibGVDZWxsPixcbiAgICBBcnJheTxBcnJheTxUYWJsZUNlbGw+PlxuICBdXG4gIERpdjogW0F0dHIsIEFycmF5PEJsb2NrPl1cbiAgTnVsbDogdW5kZWZpbmVkXG59XG5cbmV4cG9ydCB0eXBlIEVsdEZ1bmN0aW9uPFQgZXh0ZW5kcyBrZXlvZiBFbHRNYXA+ID0gRWx0TWFwW1RdIGV4dGVuZHMgdW5kZWZpbmVkXG4gID8gKCkgPT4gRWx0PFQ+XG4gIDogRWx0TWFwW1RdIGV4dGVuZHMgW2luZmVyIEExXVxuICA/IChhMTogQTEpID0+IEVsdDxUPlxuICA6IEVsdE1hcFtUXSBleHRlbmRzIFtpbmZlciBBMSwgaW5mZXIgQTJdXG4gID8gKGExOiBBMSwgYTI6IEEyKSA9PiBFbHQ8VD5cbiAgOiBFbHRNYXBbVF0gZXh0ZW5kcyBbaW5mZXIgQTEsIGluZmVyIEEyLCBpbmZlciBBM11cbiAgPyAoYTE6IEExLCBhMjogQTIsIGEzOiBBMykgPT4gRWx0PFQ+XG4gIDogRWx0TWFwW1RdIGV4dGVuZHMgW2luZmVyIEExLCBpbmZlciBBMiwgaW5mZXIgQTMsIGluZmVyIEE0XVxuICA/IChhMTogQTEsIGEyOiBBMiwgYTM6IEEzLCBhNDogQTQpID0+IEVsdDxUPlxuICA6IEVsdE1hcFtUXSBleHRlbmRzIFtpbmZlciBBMSwgaW5mZXIgQTIsIGluZmVyIEEzLCBpbmZlciBBNCwgaW5mZXIgQTVdXG4gID8gKGExOiBBMSwgYTI6IEEyLCBhMzogQTMsIGE0OiBBNCwgYTU6IEE1KSA9PiBFbHQ8VD5cbiAgOiAoYTE6IEVsdE1hcFtUXSkgPT4gRWx0PFQ+XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YUVsdE1hcCB7XG4gIC8vIE1ldGFcbiAgTWV0YVN0cmluZzogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIEVsdE1hcCA9IElubGluZUVsdE1hcCAmIEJsb2NrRWx0TWFwICYgTWV0YUVsdE1hcFxuXG5leHBvcnQgaW50ZXJmYWNlIEVsdDxBIGV4dGVuZHMgRWx0TmFtZXM+IHtcbiAgdDogQVxuICBjOiBFbHRNYXBbQV1cbn1cbmV4cG9ydCB0eXBlIEVsdFR5cGVNYXAgPSB7IFtLIGluIEVsdE5hbWVzXTogRWx0PEs+IH1cblxuZXhwb3J0IHR5cGUgSW5saW5lRWx0TmFtZXMgPSBrZXlvZiBJbmxpbmVFbHRNYXBcbmV4cG9ydCB0eXBlIElubGluZSA9IEVsdFR5cGVNYXBbSW5saW5lRWx0TmFtZXNdXG5leHBvcnQgdHlwZSBCbG9ja0VsdE5hbWVzID0ga2V5b2YgQmxvY2tFbHRNYXBcbmV4cG9ydCB0eXBlIEJsb2NrID0gRWx0VHlwZU1hcFtCbG9ja0VsdE5hbWVzXVxuZXhwb3J0IHR5cGUgRWx0TmFtZXMgPSBrZXlvZiBFbHRNYXBcbmV4cG9ydCB0eXBlIE1ldGFFbHROYW1lcyA9IGtleW9mIE1ldGFFbHRNYXBcbmV4cG9ydCB0eXBlIE1ldGEgPSBFbHRUeXBlTWFwW01ldGFFbHROYW1lc11cbmV4cG9ydCB0eXBlIFRyZWUgPSBCbG9jayB8IElubGluZSB8IE1ldGEgfCBzdHJpbmdcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgT2JqZWN0Q29uc3RydWN0b3Ige1xuICAgIGVudHJpZXM8SyBleHRlbmRzIHN0cmluZywgVD4obzogeyBbS2V5IGluIEtdOiBUIH0pOiBbSywgVF1bXTtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIGFjdGlvbiBpbnRvIGEgZmlsdGVyIHRoYXQgcmVhZHMgYSBKU09OLWZvcm1hdHRlZCBwYW5kb2NcbiAqIGRvY3VtZW50IGZyb20gc3RkaW4sIHRyYW5zZm9ybXMgaXQgYnkgd2Fsa2luZyB0aGUgdHJlZSB3aXRoIHRoZSBhY3Rpb24sIGFuZFxuICogcmV0dXJucyBhIG5ldyBKU09OLWZvcm1hdHRlZCBwYW5kb2MgZG9jdW1lbnQgdG8gc3Rkb3V0LiBUaGUgYXJndW1lbnQgaXMgYVxuICogZnVuY3Rpb24gYWN0aW9uKGtleSwgdmFsdWUsIGZvcm1hdCwgbWV0YSksIHdoZXJlIGtleSBpcyB0aGUgdHlwZSBvZiB0aGVcbiAqIHBhbmRvYyBvYmplY3QgKGUuZy4gJ1N0cicsICdQYXJhJyksIHZhbHVlIGlzIHRoZSBjb250ZW50cyBvZiB0aGUgb2JqZWN0XG4gKiAoZS5nLiBhIHN0cmluZyBmb3IgJ1N0cicsIGEgbGlzdCBvZiBpbmxpbmUgZWxlbWVudHMgZm9yICdQYXJhJyksIGZvcm1hdCBpc1xuICogdGhlIHRhcmdldCBvdXRwdXQgZm9ybWF0ICh3aGljaCB3aWxsIGJlIHRha2VuIGZvciB0aGUgZmlyc3QgY29tbWFuZFxuICogbGluZSBhcmd1bWVudCBpZiBwcmVzZW50KSwgYW5kIG1ldGEgaXMgdGhlIGRvY3VtZW50J3MgbWV0YWRhdGEuIElmIHRoZVxuICogZnVuY3Rpb24gcmV0dXJucyBOb25lLCB0aGUgb2JqZWN0IHRvIHdoaWNoIGl0IGFwcGxpZXMgd2lsbCByZW1haW5cbiAqIHVuY2hhbmdlZC4gSWYgaXQgcmV0dXJucyBhbiBvYmplY3QsIHRoZSBvYmplY3Qgd2lsbCBiZSByZXBsYWNlZC4gSWYgaXRcbiAqIHJldHVybnMgYSBsaXN0LCB0aGUgbGlzdCB3aWxsIGJlIHNwbGljZWQgaW4gdG8gdGhlIGxpc3QgdG8gd2hpY2ggdGhlIHRhcmdldFxuICogb2JqZWN0IGJlbG9uZ3MuIChTbywgcmV0dXJuaW5nIGFuIGVtcHR5IGxpc3QgZGVsZXRlcyB0aGUgb2JqZWN0LilcbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYWN0aW9uIENhbGxiYWNrIHRvIGFwcGx5IHRvIGV2ZXJ5IG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9KU09ORmlsdGVyKGFjdGlvbjogRmlsdGVyQWN0aW9uKTogdm9pZCB7XG4gIHJlcXVpcmUoJ2dldC1zdGRpbicpKGZ1bmN0aW9uKGpzb246IHN0cmluZykge1xuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShqc29uKVxuICAgIHZhciBmb3JtYXQgPSBwcm9jZXNzLmFyZ3YubGVuZ3RoID4gMiA/IHByb2Nlc3MuYXJndlsyXSA6ICcnXG4gICAgZmlsdGVyKGRhdGEsIGFjdGlvbiwgZm9ybWF0KS50aGVuKGZ1bmN0aW9uKG91dHB1dCkge1xuICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoSlNPTi5zdHJpbmdpZnkob3V0cHV0KSlcbiAgICB9KS5jYXRjaChmdW5jdGlvbihlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgfSlcbiAgfSlcbn1cblxuLyoqXG4gKiBGaWx0ZXIgdGhlIGdpdmVuIG9iamVjdFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsdGVyKFxuICBkYXRhOiBUcmVlICYgeyBtZXRhOiBhbnkgfSxcbiAgYWN0aW9uOiBGaWx0ZXJBY3Rpb24sXG4gIGZvcm1hdDogRm9ybWF0LFxuKTogUHJvbWlzZTxUcmVlPiB7XG4gIHJldHVybiB3YWxrKGRhdGEsIGFjdGlvbiwgZm9ybWF0LCBkYXRhLm1ldGEgfHwgZGF0YVswXS51bk1ldGEpXG59XG5cbi8qKlxuICogV2FsayBhIHRyZWUsIGFwcGx5aW5nIGFuIGFjdGlvbiB0byBldmVyeSBvYmplY3QuXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgeCAgICAgIFRoZSBvYmplY3QgdG8gdHJhdmVyc2VcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhY3Rpb24gQ2FsbGJhY2sgdG8gYXBwbHkgdG8gZWFjaCBpdGVtXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgZm9ybWF0IE91dHB1dCBmb3JtYXRcbiAqIEBwYXJhbSAge09iamVjdH0gICBtZXRhICAgUGFuZG9jIG1ldGFkYXRhXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgIFRoZSBtb2RpZmllZCB0cmVlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YWxrKFxuICB4OiBUcmVlLFxuICBhY3Rpb246IEZpbHRlckFjdGlvbixcbiAgZm9ybWF0OiBGb3JtYXQsXG4gIG1ldGE6IGFueSxcbik6IFByb21pc2U8VHJlZT5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YWxrKFxuICB4OiBUcmVlW10sXG4gIGFjdGlvbjogRmlsdGVyQWN0aW9uLFxuICBmb3JtYXQ6IEZvcm1hdCxcbiAgbWV0YTogYW55LFxuKTogUHJvbWlzZTxUcmVlW10+XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd2FsayhcbiAgeDogVHJlZSB8IFRyZWVbXSxcbiAgYWN0aW9uOiBGaWx0ZXJBY3Rpb24sXG4gIGZvcm1hdDogRm9ybWF0LFxuICBtZXRhOiBhbnksXG4pOiBQcm9taXNlPFRyZWUgfCBUcmVlW10+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcbiAgICB2YXIgYXJyYXk6IFRyZWVbXSA9IFtdXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHgpIHtcbiAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbS50KSB7XG4gICAgICAgIHZhciByZXMgPSBhd2FpdCBhY3Rpb24oaXRlbSwgZm9ybWF0LCBtZXRhKVxuICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgIGFycmF5LnB1c2goYXdhaXQgd2FsayhpdGVtLCBhY3Rpb24sIGZvcm1hdCwgbWV0YSkpXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXMpKSB7XG4gICAgICAgICAgZm9yIChjb25zdCB6IG9mIHJlcykge1xuICAgICAgICAgICAgYXJyYXkucHVzaChhd2FpdCB3YWxrKHosIGFjdGlvbiwgZm9ybWF0LCBtZXRhKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJyYXkucHVzaChhd2FpdCB3YWxrKHJlcywgYWN0aW9uLCBmb3JtYXQsIG1ldGEpKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheS5wdXNoKGF3YWl0IHdhbGsoaXRlbSwgYWN0aW9uLCBmb3JtYXQsIG1ldGEpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlcbiAgfSBlbHNlIGlmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgb2JqID0ge30gYXMgdHlwZW9mIHhcbiAgICBmb3IgKGNvbnN0IFtrLCBzXSBvZiBPYmplY3QuZW50cmllcyh4KSkge1xuICAgICAgb2JqW2tdID0gYXdhaXQgd2FsayhzLCBhY3Rpb24sIGZvcm1hdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIG9ialxuICB9XG4gIHJldHVybiB4XG59XG5cbi8qKlxuICogV2Fsa3MgdGhlIHRyZWUgeCBhbmQgcmV0dXJucyBjb25jYXRlbmF0ZWQgc3RyaW5nIGNvbnRlbnQsIGxlYXZpbmcgb3V0IGFsbFxuICogZm9ybWF0dGluZy5cbiAqIEBwYXJhbSAge09iamVjdH0geCBUaGUgb2JqZWN0IHRvIHdhbGtcbiAqIEByZXR1cm4ge1N0cmluZ30gICBKU09OIHN0cmluZ1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RyaW5naWZ5KHg6IFRyZWUpOiBQcm9taXNlPHN0cmluZz4ge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoeCkgJiYgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHgudCA9PT0gJ01ldGFTdHJpbmcnKVxuICAgIHJldHVybiB4LmNcblxuICB2YXIgcmVzdWx0OiBzdHJpbmdbXSA9IFtdXG4gIHZhciBnbzogRmlsdGVyQWN0aW9uID0gZnVuY3Rpb24gKHg6IEVsdFR5cGVNYXBbRWx0TmFtZXNdKSB7XG4gICAgaWYgKHgudCA9PT0gJ1N0cicpIHJlc3VsdC5wdXNoKHguYylcbiAgICBlbHNlIGlmICh4LnQgPT09ICdDb2RlJykgcmVzdWx0LnB1c2goeC5jWzFdKVxuICAgIGVsc2UgaWYgKHgudCA9PT0gJ01hdGgnKSByZXN1bHQucHVzaCh4LmNbMV0pXG4gICAgZWxzZSBpZiAoeC50ID09PSAnTGluZUJyZWFrJykgcmVzdWx0LnB1c2goJyAnKVxuICAgIGVsc2UgaWYgKHgudCA9PT0gJ1NwYWNlJykgcmVzdWx0LnB1c2goJyAnKVxuICB9XG4gIGF3YWl0IHdhbGsoeCwgZ28sICcnLCB7fSlcbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKVxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXR0cmlidXRlIGxpc3QsIGNvbnN0cnVjdGVkIGZyb20gdGhlIGRpY3Rpb25hcnkgYXR0cnMuXG4gKiBAcGFyYW0gIHtPYmplY3R9IGF0dHJzIEF0dHJpYnV0ZSBkaWN0aW9uYXJ5XG4gKiBAcmV0dXJuIHtBcnJheX0gICAgICAgIEF0dHJpYnV0ZSBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdHRyaWJ1dGVzKFxuICBhdHRyczogeyBjbGFzc2VzPzogc3RyaW5nW10gfSAmIHsgW2s6IHN0cmluZ106IHN0cmluZyB9ID0ge30sXG4pOiBBdHRyIHtcbiAgdmFyIGlkZW50ID0gYXR0cnMuaWQgfHwgJydcbiAgdmFyIGNsYXNzZXMgPSBhdHRycy5jbGFzc2VzIHx8IFtdXG4gIHZhciBrZXl2YWxzID0gW10gYXMgQXJyYXk8W3N0cmluZywgc3RyaW5nXT5cbiAgZm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXM8c3RyaW5nLCBzdHJpbmc+KGF0dHJzKSkge1xuICAgIGlmIChrICE9PSAnY2xhc3NlcycgJiYgayAhPT0gJ2lkJykga2V5dmFscy5wdXNoKFtrLCB2XSlcbiAgfVxuICByZXR1cm4gW2lkZW50LCBjbGFzc2VzLCBrZXl2YWxzXVxufVxuXG4vLyBVdGlsaXR5IGZvciBjcmVhdGluZyBjb25zdHJ1Y3RvciBmdW5jdGlvbnNcbmZ1bmN0aW9uIGVsdDxUIGV4dGVuZHMgRWx0TmFtZXM+KGVsdFR5cGU6IFQsIG51bWFyZ3M6IG51bWJlcik6IEVsdEZ1bmN0aW9uPFQ+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoXG4gICAgaWYgKGxlbiAhPT0gbnVtYXJncylcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgZWx0VHlwZSArICcgZXhwZWN0cyAnICsgbnVtYXJncyArICcgYXJndW1lbnRzLCBidXQgZ2l2ZW4gJyArIGxlbixcbiAgICAgIClcbiAgICByZXR1cm4geyB0OiBlbHRUeXBlLCBjOiBsZW4gPT09IDEgPyBhcmdzWzBdIDogYXJncyB9XG4gIH0gYXMgRWx0RnVuY3Rpb248VD5cbn1cblxuZXhwb3J0IGNvbnN0IFBsYWluID0gZWx0KCdQbGFpbicsIDEpXG5leHBvcnQgY29uc3QgUGFyYSA9IGVsdCgnUGFyYScsIDEpXG5leHBvcnQgY29uc3QgQ29kZUJsb2NrID0gZWx0KCdDb2RlQmxvY2snLCAyKVxuZXhwb3J0IGNvbnN0IFJhd0Jsb2NrID0gZWx0KCdSYXdCbG9jaycsIDIpXG5leHBvcnQgY29uc3QgQmxvY2tRdW90ZSA9IGVsdCgnQmxvY2tRdW90ZScsIDEpXG5leHBvcnQgY29uc3QgT3JkZXJlZExpc3QgPSBlbHQoJ09yZGVyZWRMaXN0JywgMilcbmV4cG9ydCBjb25zdCBCdWxsZXRMaXN0ID0gZWx0KCdCdWxsZXRMaXN0JywgMSlcbmV4cG9ydCBjb25zdCBEZWZpbml0aW9uTGlzdCA9IGVsdCgnRGVmaW5pdGlvbkxpc3QnLCAxKVxuZXhwb3J0IGNvbnN0IEhlYWRlciA9IGVsdCgnSGVhZGVyJywgMylcbmV4cG9ydCBjb25zdCBIb3Jpem9udGFsUnVsZSA9IGVsdCgnSG9yaXpvbnRhbFJ1bGUnLCAwKVxuZXhwb3J0IGNvbnN0IFRhYmxlID0gZWx0KCdUYWJsZScsIDUpXG5leHBvcnQgY29uc3QgRGl2ID0gZWx0KCdEaXYnLCAyKVxuZXhwb3J0IGNvbnN0IE51bGwgPSBlbHQoJ051bGwnLCAwKVxuXG4vLyBDb25zdHJ1Y3RvcnMgZm9yIGlubGluZSBlbGVtZW50c1xuXG5leHBvcnQgY29uc3QgU3RyID0gZWx0KCdTdHInLCAxKVxuZXhwb3J0IGNvbnN0IEVtcGggPSBlbHQoJ0VtcGgnLCAxKVxuZXhwb3J0IGNvbnN0IFN0cm9uZyA9IGVsdCgnU3Ryb25nJywgMSlcbmV4cG9ydCBjb25zdCBTdHJpa2VvdXQgPSBlbHQoJ1N0cmlrZW91dCcsIDEpXG5leHBvcnQgY29uc3QgU3VwZXJzY3JpcHQgPSBlbHQoJ1N1cGVyc2NyaXB0JywgMSlcbmV4cG9ydCBjb25zdCBTdWJzY3JpcHQgPSBlbHQoJ1N1YnNjcmlwdCcsIDEpXG5leHBvcnQgY29uc3QgU21hbGxDYXBzID0gZWx0KCdTbWFsbENhcHMnLCAxKVxuZXhwb3J0IGNvbnN0IFF1b3RlZCA9IGVsdCgnUXVvdGVkJywgMilcbmV4cG9ydCBjb25zdCBDaXRlID0gZWx0KCdDaXRlJywgMilcbmV4cG9ydCBjb25zdCBDb2RlID0gZWx0KCdDb2RlJywgMilcbmV4cG9ydCBjb25zdCBTcGFjZSA9IGVsdCgnU3BhY2UnLCAwKVxuZXhwb3J0IGNvbnN0IExpbmVCcmVhayA9IGVsdCgnTGluZUJyZWFrJywgMClcbmV4cG9ydCBjb25zdCBGb3JtdWxhID0gZWx0KCdNYXRoJywgMikgLy8gZG9uJ3QgY29uZmxpY3Qgd2l0aCBqcyBidWlsdGluIE1hdGhcbmV4cG9ydCBjb25zdCBSYXdJbmxpbmUgPSBlbHQoJ1Jhd0lubGluZScsIDIpXG5leHBvcnQgY29uc3QgTGluayA9IGVsdCgnTGluaycsIDMpXG5leHBvcnQgY29uc3QgSW1hZ2UgPSBlbHQoJ0ltYWdlJywgMylcbmV4cG9ydCBjb25zdCBOb3RlID0gZWx0KCdOb3RlJywgMSlcbmV4cG9ydCBjb25zdCBTcGFuID0gZWx0KCdTcGFuJywgMilcblxuLy8gYSBmZXcgYWxpYXNlc1xuZXhwb3J0IGNvbnN0IHN0ZGlvID0gdG9KU09ORmlsdGVyXG4iXX0=