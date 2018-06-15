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
                    return [4, action(item.t, item.c || [], format, meta)];
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
    if (!Array.isArray(x) && typeof x === 'object' && x.t === 'MetaString')
        return x.c;
    var result = [];
    var go = function (key, val) {
        if (key === 'Str')
            result.push(val);
        else if (key === 'Code')
            result.push(val[1]);
        else if (key === 'Math')
            result.push(val[1]);
        else if (key === 'LineBreak')
            result.push(' ');
        else if (key === 'Space')
            result.push(' ');
    };
    walk(x, go, '', {});
    return result.join('');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0ZBQXdGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0t4RixzQkFBNkIsTUFBb0I7SUFDL0MsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVMsSUFBWTtRQUN4QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzNCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQzNELE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLE1BQU07WUFDL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQzlDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLENBQUM7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQVZELG9DQVVDO0FBS0QsZ0JBQ0UsSUFBMEIsRUFDMUIsTUFBb0IsRUFDcEIsTUFBYzs7O1lBRWQsV0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUE7OztDQUMvRDtBQU5ELHdCQU1DO0FBc0JELGNBQ0UsQ0FBZ0IsRUFDaEIsTUFBb0IsRUFDcEIsTUFBYyxFQUNkLElBQVM7Ozs7Ozt5QkFFTCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFoQixlQUFnQjtvQkFDZCxLQUFLLEdBQVcsRUFBRSxDQUFBOzBCQUNGLEVBQUQsT0FBQzs7O3lCQUFELENBQUEsZUFBQyxDQUFBO29CQUFULElBQUk7eUJBQ1QsQ0FBQSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQSxFQUFsQyxlQUFrQztvQkFDMUIsV0FBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUE7O29CQUF0RCxHQUFHLEdBQUcsU0FBZ0Q7eUJBQ3RELENBQUMsR0FBRyxFQUFKLGNBQUk7b0JBQ04sS0FBQSxDQUFBLEtBQUEsS0FBSyxDQUFBLENBQUMsSUFBSSxDQUFBO29CQUFDLFdBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFBOztvQkFBakQsY0FBVyxTQUFzQyxFQUFDLENBQUE7Ozt5QkFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBbEIsY0FBa0I7MEJBQ1IsRUFBSCxXQUFHOzs7eUJBQUgsQ0FBQSxpQkFBRyxDQUFBO29CQUFSLENBQUM7b0JBQ1YsS0FBQSxDQUFBLEtBQUEsS0FBSyxDQUFBLENBQUMsSUFBSSxDQUFBO29CQUFDLFdBQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFBOztvQkFBOUMsY0FBVyxTQUFtQyxFQUFDLENBQUE7OztvQkFEakMsSUFBRyxDQUFBOzs7O29CQUluQixLQUFBLENBQUEsS0FBQSxLQUFLLENBQUEsQ0FBQyxJQUFJLENBQUE7b0JBQUMsV0FBTSxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUE7O29CQUFoRCxjQUFXLFNBQXFDLEVBQUMsQ0FBQTs7OztvQkFHbkQsS0FBQSxDQUFBLEtBQUEsS0FBSyxDQUFBLENBQUMsSUFBSSxDQUFBO29CQUFDLFdBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFBOztvQkFBakQsY0FBVyxTQUFzQyxFQUFDLENBQUE7OztvQkFibkMsSUFBQyxDQUFBOzt5QkFnQnBCLFdBQU8sS0FBSyxFQUFBOzt5QkFDSCxDQUFBLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQSxFQUFyQixlQUFxQjtvQkFDMUIsR0FBRyxHQUFHLEVBQWMsQ0FBQTswQkFDYyxFQUFqQixLQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7eUJBQWpCLENBQUEsY0FBaUIsQ0FBQTtvQkFBM0IsV0FBTSxFQUFMLENBQUMsUUFBQSxFQUFFLENBQUMsUUFBQTtvQkFDZCxLQUFBLEdBQUcsQ0FBQTtvQkFBQyxLQUFBLENBQUMsQ0FBQTtvQkFBSSxXQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBQTs7b0JBQTVDLE1BQU0sR0FBRyxTQUFtQyxDQUFBOzs7b0JBRHpCLElBQWlCLENBQUE7O3lCQUd0QyxXQUFPLEdBQUcsRUFBQTt5QkFFWixXQUFPLENBQUMsRUFBQTs7OztDQUNUO0FBakNELG9CQWlDQztBQVFELG1CQUEwQixDQUFPO0lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVk7UUFDcEUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRVosSUFBSSxNQUFNLEdBQWEsRUFBRSxDQUFBO0lBQ3pCLElBQUksRUFBRSxHQUFHLFVBQThCLEdBQU0sRUFBRSxHQUFjO1FBQzNELElBQUksR0FBRyxLQUFLLEtBQUs7WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQW9CLENBQUMsQ0FBQTthQUMvQyxJQUFJLEdBQUcsS0FBSyxNQUFNO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBRSxHQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDM0QsSUFBSSxHQUFHLEtBQUssTUFBTTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUUsR0FBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQzNELElBQUksR0FBRyxLQUFLLFdBQVc7WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ3pDLElBQUksR0FBRyxLQUFLLE9BQU87WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzVDLENBQUMsQ0FBQTtJQUNELElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNuQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDeEIsQ0FBQztBQWRELDhCQWNDO0FBT0Qsb0JBQ0UsS0FBNEQ7SUFBNUQsc0JBQUEsRUFBQSxVQUE0RDtJQUU1RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQTtJQUMxQixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtJQUNqQyxJQUFJLE9BQU8sR0FBRyxFQUE2QixDQUFBO0lBQzNDLEtBQXFCLFVBQXFDLEVBQXJDLEtBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBaUIsS0FBSyxDQUFDLEVBQXJDLGNBQXFDLEVBQXJDLElBQXFDO1FBQS9DLElBQUEsV0FBTSxFQUFMLFNBQUMsRUFBRSxTQUFDO1FBQ2QsSUFBSSxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsS0FBSyxJQUFJO1lBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3hEO0lBQ0QsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDbEMsQ0FBQztBQVZELGdDQVVDO0FBR0QsYUFBaUMsT0FBVSxFQUFFLE9BQWU7SUFDMUQsT0FBTztRQUFTLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQzVCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDckIsSUFBSSxHQUFHLEtBQUssT0FBTztZQUNqQixNQUFNLElBQUksS0FBSyxDQUNiLE9BQU8sR0FBRyxXQUFXLEdBQUcsT0FBTyxHQUFHLHdCQUF3QixHQUFHLEdBQUcsQ0FDakUsQ0FBQTtRQUNILE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3RELENBQW1CLENBQUE7QUFDckIsQ0FBQztBQUVZLFFBQUEsS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDdkIsUUFBQSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNyQixRQUFBLFNBQVMsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQy9CLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDN0IsUUFBQSxVQUFVLEdBQUcsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNqQyxRQUFBLFdBQVcsR0FBRyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ25DLFFBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDakMsUUFBQSxjQUFjLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3pDLFFBQUEsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDekIsUUFBQSxjQUFjLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3pDLFFBQUEsS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDdkIsUUFBQSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNuQixRQUFBLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBSXJCLFFBQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDbkIsUUFBQSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNyQixRQUFBLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3pCLFFBQUEsU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDL0IsUUFBQSxXQUFXLEdBQUcsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNuQyxRQUFBLFNBQVMsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQy9CLFFBQUEsU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDL0IsUUFBQSxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUN6QixRQUFBLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3JCLFFBQUEsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDckIsUUFBQSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUN2QixRQUFBLFNBQVMsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQy9CLFFBQUEsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDeEIsUUFBQSxTQUFTLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUMvQixRQUFBLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3JCLFFBQUEsS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDdkIsUUFBQSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNyQixRQUFBLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBR3JCLFFBQUEsS0FBSyxHQUFHLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qISBwYW5kb2MtZmlsdGVyLW5vZGUgfCAoQykgMjAxNCBNaWtlIEhlbmRlcnNvbiA8bXZoZW5kZXJzb25AdGRzLm5ldD4gfCBMaWNlbnNlOiBNSVQgKi9cbi8qKlxuICogVHlwZXNjcmlwdCBwb3J0IG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9qZ20vcGFuZG9jZmlsdGVyc1xuICovXG5cbmV4cG9ydCB0eXBlIEZpbHRlckFjdGlvbiA9IDxBIGV4dGVuZHMgRWx0TmFtZXM+KFxuICBrZXk6IEEsXG4gIHZhbHVlOiBFbHRNYXBbQV0sXG4gIGZvcm1hdDogc3RyaW5nLFxuICBtZXRhOiBhbnksXG4pID0+IHZvaWQgfCBUcmVlIHwgUHJvbWlzZTx2b2lkIHwgVHJlZT5cblxuZXhwb3J0IHR5cGUgQXR0ckxpc3QgPSBBcnJheTxbc3RyaW5nLCBzdHJpbmddPlxuXG5leHBvcnQgdHlwZSBBdHRyID0gW3N0cmluZywgQXJyYXk8c3RyaW5nPiwgQXR0ckxpc3RdXG5cbmV4cG9ydCB0eXBlIE1hdGhUeXBlID0gJ0Rpc3BsYXlNYXRoJyB8ICdJbmxpbmVNYXRoJ1xuZXhwb3J0IHR5cGUgUXVvdGVUeXBlID0gJ1NpbmdsZVF1b3RlJyB8ICdEb3VibGVRdW90ZSdcbmV4cG9ydCB0eXBlIFRhcmdldCA9IFtzdHJpbmcsIHN0cmluZ10gLy8gW3VybCwgdGl0bGVdXG5leHBvcnQgdHlwZSBGb3JtYXQgPSBzdHJpbmdcblxuZXhwb3J0IHR5cGUgQ2l0YXRpb25Nb2RlID0gJ0F1dGhvckluVGV4dCcgfCAnU3VwcHJlc3NBdXRob3InIHwgJ05vcm1hbENpdGF0aW9uJ1xuXG5leHBvcnQgdHlwZSBDaXRhdGlvbiA9IHtcbiAgY2l0YXRpb25JZDogc3RyaW5nXG4gIGNpdGF0aW9uUHJlZml4OiBBcnJheTxJbmxpbmU+XG4gIGNpdGF0aW9uU3VmZml4OiBBcnJheTxJbmxpbmU+XG4gIGNpdGF0aW9uTW9kZTogQ2l0YXRpb25Nb2RlXG4gIGNpdGF0aW9uTm90ZU51bTogbnVtYmVyXG4gIGNpdGF0aW9uSGFzaDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIExpc3ROdW1iZXJTdHlsZSA9XG4gIHwgJ0RlZmF1bHRTdHlsZSdcbiAgfCAnRXhhbXBsZSdcbiAgfCAnRGVjaW1hbCdcbiAgfCAnTG93ZXJSb21hbidcbiAgfCAnVXBwZXJSb21hbidcbiAgfCAnTG93ZXJBbHBoYSdcbiAgfCAnVXBwZXJBbHBoYSdcblxuZXhwb3J0IHR5cGUgTGlzdE51bWJlckRlbGltID1cbiAgfCAnRGVmYXVsdERlbGltJ1xuICB8ICdQZXJpb2QnXG4gIHwgJ09uZVBhcmVuJ1xuICB8ICdUd29QYXJlbnMnXG5cbmV4cG9ydCB0eXBlIExpc3RBdHRyaWJ1dGVzID0gW251bWJlciwgTGlzdE51bWJlclN0eWxlLCBMaXN0TnVtYmVyRGVsaW1dXG5cbmV4cG9ydCB0eXBlIEFsaWdubWVudCA9XG4gIHwgJ0FsaWduTGVmdCdcbiAgfCAnQWxpZ25SaWdodCdcbiAgfCAnQWxpZ25DZW50ZXInXG4gIHwgJ0FsaWduRGVmYXVsdCdcblxuZXhwb3J0IHR5cGUgVGFibGVDZWxsID0gQXJyYXk8QmxvY2s+XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5saW5lRWx0TWFwIHtcbiAgLy8gSW5saW5lXG4gIFN0cjogc3RyaW5nXG4gIEVtcGg6IEFycmF5PElubGluZT5cbiAgU3Ryb25nOiBBcnJheTxJbmxpbmU+XG4gIFN0cmlrZW91dDogQXJyYXk8SW5saW5lPlxuICBTdXBlcnNjcmlwdDogQXJyYXk8SW5saW5lPlxuICBTdWJzY3JpcHQ6IEFycmF5PElubGluZT5cbiAgU21hbGxDYXBzOiBBcnJheTxJbmxpbmU+XG4gIFF1b3RlZDogW1F1b3RlVHlwZSwgQXJyYXk8SW5saW5lPl1cbiAgQ2l0ZTogW0FycmF5PENpdGF0aW9uPiwgQXJyYXk8SW5saW5lPl1cbiAgQ29kZTogW0F0dHIsIHN0cmluZ11cbiAgU3BhY2U6IHVuZGVmaW5lZFxuICBTb2Z0QnJlYWs6IHVuZGVmaW5lZFxuICBMaW5lQnJlYWs6IHVuZGVmaW5lZFxuICBNYXRoOiBbTWF0aFR5cGUsIHN0cmluZ11cbiAgUmF3SW5saW5lOiBbRm9ybWF0LCBzdHJpbmddXG4gIExpbms6IFtBdHRyLCBBcnJheTxJbmxpbmU+LCBUYXJnZXRdXG4gIEltYWdlOiBbQXR0ciwgQXJyYXk8SW5saW5lPiwgVGFyZ2V0XVxuICBOb3RlOiBBcnJheTxCbG9jaz5cbiAgU3BhbjogW0F0dHIsIEFycmF5PElubGluZT5dXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmxvY2tFbHRNYXAge1xuICAvLyBCbG9ja1xuICBQbGFpbjogQXJyYXk8SW5saW5lPlxuICBQYXJhOiBBcnJheTxJbmxpbmU+XG4gIExpbmVCbG9jazogQXJyYXk8QXJyYXk8SW5saW5lPj5cbiAgQ29kZUJsb2NrOiBbQXR0ciwgc3RyaW5nXVxuICBSYXdCbG9jazogW0Zvcm1hdCwgc3RyaW5nXVxuICBCbG9ja1F1b3RlOiBBcnJheTxCbG9jaz5cbiAgT3JkZXJlZExpc3Q6IFtMaXN0QXR0cmlidXRlcywgQXJyYXk8QXJyYXk8QmxvY2s+Pl1cbiAgQnVsbGV0TGlzdDogQXJyYXk8QXJyYXk8QmxvY2s+PlxuICBEZWZpbml0aW9uTGlzdDogQXJyYXk8W0FycmF5PElubGluZT4sIEFycmF5PEFycmF5PEJsb2NrPj5dPlxuICBIZWFkZXI6IFtudW1iZXIsIEF0dHIsIEFycmF5PElubGluZT5dXG4gIEhvcml6b250YWxSdWxlOiB1bmRlZmluZWRcbiAgVGFibGU6IFtcbiAgICBBcnJheTxJbmxpbmU+LFxuICAgIEFycmF5PEFsaWdubWVudD4sXG4gICAgQXJyYXk8bnVtYmVyPixcbiAgICBBcnJheTxUYWJsZUNlbGw+LFxuICAgIEFycmF5PEFycmF5PFRhYmxlQ2VsbD4+XG4gIF1cbiAgRGl2OiBbQXR0ciwgQXJyYXk8QmxvY2s+XVxuICBOdWxsOiB1bmRlZmluZWRcbn1cblxuZXhwb3J0IHR5cGUgRWx0RnVuY3Rpb248VCBleHRlbmRzIGtleW9mIEVsdE1hcD4gPSBFbHRNYXBbVF0gZXh0ZW5kcyB1bmRlZmluZWRcbiAgPyAoKSA9PiBFbHQ8VD5cbiAgOiBFbHRNYXBbVF0gZXh0ZW5kcyBbaW5mZXIgQTFdXG4gID8gKGExOiBBMSkgPT4gRWx0PFQ+XG4gIDogRWx0TWFwW1RdIGV4dGVuZHMgW2luZmVyIEExLCBpbmZlciBBMl1cbiAgPyAoYTE6IEExLCBhMjogQTIpID0+IEVsdDxUPlxuICA6IEVsdE1hcFtUXSBleHRlbmRzIFtpbmZlciBBMSwgaW5mZXIgQTIsIGluZmVyIEEzXVxuICA/IChhMTogQTEsIGEyOiBBMiwgYTM6IEEzKSA9PiBFbHQ8VD5cbiAgOiBFbHRNYXBbVF0gZXh0ZW5kcyBbaW5mZXIgQTEsIGluZmVyIEEyLCBpbmZlciBBMywgaW5mZXIgQTRdXG4gID8gKGExOiBBMSwgYTI6IEEyLCBhMzogQTMsIGE0OiBBNCkgPT4gRWx0PFQ+XG4gIDogRWx0TWFwW1RdIGV4dGVuZHMgW2luZmVyIEExLCBpbmZlciBBMiwgaW5mZXIgQTMsIGluZmVyIEE0LCBpbmZlciBBNV1cbiAgPyAoYTE6IEExLCBhMjogQTIsIGEzOiBBMywgYTQ6IEE0LCBhNTogQTUpID0+IEVsdDxUPlxuICA6IChhMTogRWx0TWFwW1RdKSA9PiBFbHQ8VD5cblxuZXhwb3J0IGludGVyZmFjZSBNZXRhRWx0TWFwIHtcbiAgLy8gTWV0YVxuICBNZXRhU3RyaW5nOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgRWx0TWFwID0gSW5saW5lRWx0TWFwICYgQmxvY2tFbHRNYXAgJiBNZXRhRWx0TWFwXG5cbmV4cG9ydCBpbnRlcmZhY2UgRWx0PEEgZXh0ZW5kcyBFbHROYW1lcz4ge1xuICB0OiBBXG4gIGM6IEVsdE1hcFtBXVxufVxuZXhwb3J0IHR5cGUgRWx0VHlwZU1hcCA9IHsgW0sgaW4gRWx0TmFtZXNdOiBFbHQ8Sz4gfVxuXG5leHBvcnQgdHlwZSBJbmxpbmVFbHROYW1lcyA9IGtleW9mIElubGluZUVsdE1hcFxuZXhwb3J0IHR5cGUgSW5saW5lID0gRWx0VHlwZU1hcFtJbmxpbmVFbHROYW1lc11cbmV4cG9ydCB0eXBlIEJsb2NrRWx0TmFtZXMgPSBrZXlvZiBCbG9ja0VsdE1hcFxuZXhwb3J0IHR5cGUgQmxvY2sgPSBFbHRUeXBlTWFwW0Jsb2NrRWx0TmFtZXNdXG5leHBvcnQgdHlwZSBFbHROYW1lcyA9IGtleW9mIEVsdE1hcFxuZXhwb3J0IHR5cGUgTWV0YUVsdE5hbWVzID0ga2V5b2YgTWV0YUVsdE1hcFxuZXhwb3J0IHR5cGUgTWV0YSA9IEVsdFR5cGVNYXBbTWV0YUVsdE5hbWVzXVxuZXhwb3J0IHR5cGUgVHJlZSA9IEJsb2NrIHwgSW5saW5lIHwgTWV0YSB8IHN0cmluZ1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBPYmplY3RDb25zdHJ1Y3RvciB7XG4gICAgZW50cmllczxLIGV4dGVuZHMgc3RyaW5nLCBUPihvOiB7IFtLZXkgaW4gS106IFQgfSk6IFtLLCBUXVtdO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydHMgYW4gYWN0aW9uIGludG8gYSBmaWx0ZXIgdGhhdCByZWFkcyBhIEpTT04tZm9ybWF0dGVkIHBhbmRvY1xuICogZG9jdW1lbnQgZnJvbSBzdGRpbiwgdHJhbnNmb3JtcyBpdCBieSB3YWxraW5nIHRoZSB0cmVlIHdpdGggdGhlIGFjdGlvbiwgYW5kXG4gKiByZXR1cm5zIGEgbmV3IEpTT04tZm9ybWF0dGVkIHBhbmRvYyBkb2N1bWVudCB0byBzdGRvdXQuIFRoZSBhcmd1bWVudCBpcyBhXG4gKiBmdW5jdGlvbiBhY3Rpb24oa2V5LCB2YWx1ZSwgZm9ybWF0LCBtZXRhKSwgd2hlcmUga2V5IGlzIHRoZSB0eXBlIG9mIHRoZVxuICogcGFuZG9jIG9iamVjdCAoZS5nLiAnU3RyJywgJ1BhcmEnKSwgdmFsdWUgaXMgdGhlIGNvbnRlbnRzIG9mIHRoZSBvYmplY3RcbiAqIChlLmcuIGEgc3RyaW5nIGZvciAnU3RyJywgYSBsaXN0IG9mIGlubGluZSBlbGVtZW50cyBmb3IgJ1BhcmEnKSwgZm9ybWF0IGlzXG4gKiB0aGUgdGFyZ2V0IG91dHB1dCBmb3JtYXQgKHdoaWNoIHdpbGwgYmUgdGFrZW4gZm9yIHRoZSBmaXJzdCBjb21tYW5kXG4gKiBsaW5lIGFyZ3VtZW50IGlmIHByZXNlbnQpLCBhbmQgbWV0YSBpcyB0aGUgZG9jdW1lbnQncyBtZXRhZGF0YS4gSWYgdGhlXG4gKiBmdW5jdGlvbiByZXR1cm5zIE5vbmUsIHRoZSBvYmplY3QgdG8gd2hpY2ggaXQgYXBwbGllcyB3aWxsIHJlbWFpblxuICogdW5jaGFuZ2VkLiBJZiBpdCByZXR1cm5zIGFuIG9iamVjdCwgdGhlIG9iamVjdCB3aWxsIGJlIHJlcGxhY2VkLiBJZiBpdFxuICogcmV0dXJucyBhIGxpc3QsIHRoZSBsaXN0IHdpbGwgYmUgc3BsaWNlZCBpbiB0byB0aGUgbGlzdCB0byB3aGljaCB0aGUgdGFyZ2V0XG4gKiBvYmplY3QgYmVsb25ncy4gKFNvLCByZXR1cm5pbmcgYW4gZW1wdHkgbGlzdCBkZWxldGVzIHRoZSBvYmplY3QuKVxuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBhY3Rpb24gQ2FsbGJhY2sgdG8gYXBwbHkgdG8gZXZlcnkgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0pTT05GaWx0ZXIoYWN0aW9uOiBGaWx0ZXJBY3Rpb24pOiB2b2lkIHtcbiAgcmVxdWlyZSgnZ2V0LXN0ZGluJykoZnVuY3Rpb24oanNvbjogc3RyaW5nKSB7XG4gICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGpzb24pXG4gICAgdmFyIGZvcm1hdCA9IHByb2Nlc3MuYXJndi5sZW5ndGggPiAyID8gcHJvY2Vzcy5hcmd2WzJdIDogJydcbiAgICBmaWx0ZXIoZGF0YSwgYWN0aW9uLCBmb3JtYXQpLnRoZW4oZnVuY3Rpb24ob3V0cHV0KSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShKU09OLnN0cmluZ2lmeShvdXRwdXQpKVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIEZpbHRlciB0aGUgZ2l2ZW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWx0ZXIoXG4gIGRhdGE6IFRyZWUgJiB7IG1ldGE6IGFueSB9LFxuICBhY3Rpb246IEZpbHRlckFjdGlvbixcbiAgZm9ybWF0OiBGb3JtYXQsXG4pOiBQcm9taXNlPFRyZWU+IHtcbiAgcmV0dXJuIHdhbGsoZGF0YSwgYWN0aW9uLCBmb3JtYXQsIGRhdGEubWV0YSB8fCBkYXRhWzBdLnVuTWV0YSlcbn1cblxuLyoqXG4gKiBXYWxrIGEgdHJlZSwgYXBwbHlpbmcgYW4gYWN0aW9uIHRvIGV2ZXJ5IG9iamVjdC5cbiAqIEBwYXJhbSAge09iamVjdH0gICB4ICAgICAgVGhlIG9iamVjdCB0byB0cmF2ZXJzZVxuICogQHBhcmFtICB7RnVuY3Rpb259IGFjdGlvbiBDYWxsYmFjayB0byBhcHBseSB0byBlYWNoIGl0ZW1cbiAqIEBwYXJhbSAge1N0cmluZ30gICBmb3JtYXQgT3V0cHV0IGZvcm1hdFxuICogQHBhcmFtICB7T2JqZWN0fSAgIG1ldGEgICBQYW5kb2MgbWV0YWRhdGFcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgVGhlIG1vZGlmaWVkIHRyZWVcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdhbGsoXG4gIHg6IFRyZWUsXG4gIGFjdGlvbjogRmlsdGVyQWN0aW9uLFxuICBmb3JtYXQ6IEZvcm1hdCxcbiAgbWV0YTogYW55LFxuKTogUHJvbWlzZTxUcmVlPlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdhbGsoXG4gIHg6IFRyZWVbXSxcbiAgYWN0aW9uOiBGaWx0ZXJBY3Rpb24sXG4gIGZvcm1hdDogRm9ybWF0LFxuICBtZXRhOiBhbnksXG4pOiBQcm9taXNlPFRyZWVbXT5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YWxrKFxuICB4OiBUcmVlIHwgVHJlZVtdLFxuICBhY3Rpb246IEZpbHRlckFjdGlvbixcbiAgZm9ybWF0OiBGb3JtYXQsXG4gIG1ldGE6IGFueSxcbik6IFByb21pc2U8VHJlZSB8IFRyZWVbXT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgIHZhciBhcnJheTogVHJlZVtdID0gW11cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgeCkge1xuICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtLnQpIHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IGFjdGlvbihpdGVtLnQsIGl0ZW0uYyB8fCBbXSwgZm9ybWF0LCBtZXRhKVxuICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgIGFycmF5LnB1c2goYXdhaXQgd2FsayhpdGVtLCBhY3Rpb24sIGZvcm1hdCwgbWV0YSkpXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXMpKSB7XG4gICAgICAgICAgZm9yIChjb25zdCB6IG9mIHJlcykge1xuICAgICAgICAgICAgYXJyYXkucHVzaChhd2FpdCB3YWxrKHosIGFjdGlvbiwgZm9ybWF0LCBtZXRhKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJyYXkucHVzaChhd2FpdCB3YWxrKHJlcywgYWN0aW9uLCBmb3JtYXQsIG1ldGEpKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheS5wdXNoKGF3YWl0IHdhbGsoaXRlbSwgYWN0aW9uLCBmb3JtYXQsIG1ldGEpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlcbiAgfSBlbHNlIGlmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgb2JqID0ge30gYXMgdHlwZW9mIHhcbiAgICBmb3IgKGNvbnN0IFtrLCBzXSBvZiBPYmplY3QuZW50cmllcyh4KSkge1xuICAgICAgb2JqW2tdID0gYXdhaXQgd2FsayhzLCBhY3Rpb24sIGZvcm1hdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIG9ialxuICB9XG4gIHJldHVybiB4XG59XG5cbi8qKlxuICogV2Fsa3MgdGhlIHRyZWUgeCBhbmQgcmV0dXJucyBjb25jYXRlbmF0ZWQgc3RyaW5nIGNvbnRlbnQsIGxlYXZpbmcgb3V0IGFsbFxuICogZm9ybWF0dGluZy5cbiAqIEBwYXJhbSAge09iamVjdH0geCBUaGUgb2JqZWN0IHRvIHdhbGtcbiAqIEByZXR1cm4ge1N0cmluZ30gICBKU09OIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KHg6IFRyZWUpOiBzdHJpbmcge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoeCkgJiYgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHgudCA9PT0gJ01ldGFTdHJpbmcnKVxuICAgIHJldHVybiB4LmNcblxuICB2YXIgcmVzdWx0OiBzdHJpbmdbXSA9IFtdXG4gIHZhciBnbyA9IGZ1bmN0aW9uIDxUIGV4dGVuZHMgRWx0TmFtZXM+KGtleTogVCwgdmFsOiBFbHRNYXBbVF0pIHtcbiAgICBpZiAoa2V5ID09PSAnU3RyJykgcmVzdWx0LnB1c2godmFsIGFzIEVsdE1hcFsnU3RyJ10pXG4gICAgZWxzZSBpZiAoa2V5ID09PSAnQ29kZScpIHJlc3VsdC5wdXNoKCh2YWwgYXMgRWx0TWFwWydDb2RlJ10pWzFdKVxuICAgIGVsc2UgaWYgKGtleSA9PT0gJ01hdGgnKSByZXN1bHQucHVzaCgodmFsIGFzIEVsdE1hcFsnTWF0aCddKVsxXSlcbiAgICBlbHNlIGlmIChrZXkgPT09ICdMaW5lQnJlYWsnKSByZXN1bHQucHVzaCgnICcpXG4gICAgZWxzZSBpZiAoa2V5ID09PSAnU3BhY2UnKSByZXN1bHQucHVzaCgnICcpXG4gIH1cbiAgd2Fsayh4LCBnbywgJycsIHt9KVxuICByZXR1cm4gcmVzdWx0LmpvaW4oJycpXG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhdHRyaWJ1dGUgbGlzdCwgY29uc3RydWN0ZWQgZnJvbSB0aGUgZGljdGlvbmFyeSBhdHRycy5cbiAqIEBwYXJhbSAge09iamVjdH0gYXR0cnMgQXR0cmlidXRlIGRpY3Rpb25hcnlcbiAqIEByZXR1cm4ge0FycmF5fSAgICAgICAgQXR0cmlidXRlIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF0dHJpYnV0ZXMoXG4gIGF0dHJzOiB7IGNsYXNzZXM/OiBzdHJpbmdbXSB9ICYgeyBbazogc3RyaW5nXTogc3RyaW5nIH0gPSB7fSxcbik6IEF0dHIge1xuICB2YXIgaWRlbnQgPSBhdHRycy5pZCB8fCAnJ1xuICB2YXIgY2xhc3NlcyA9IGF0dHJzLmNsYXNzZXMgfHwgW11cbiAgdmFyIGtleXZhbHMgPSBbXSBhcyBBcnJheTxbc3RyaW5nLCBzdHJpbmddPlxuICBmb3IgKGNvbnN0IFtrLCB2XSBvZiBPYmplY3QuZW50cmllczxzdHJpbmcsIHN0cmluZz4oYXR0cnMpKSB7XG4gICAgaWYgKGsgIT09ICdjbGFzc2VzJyAmJiBrICE9PSAnaWQnKSBrZXl2YWxzLnB1c2goW2ssIHZdKVxuICB9XG4gIHJldHVybiBbaWRlbnQsIGNsYXNzZXMsIGtleXZhbHNdXG59XG5cbi8vIFV0aWxpdHkgZm9yIGNyZWF0aW5nIGNvbnN0cnVjdG9yIGZ1bmN0aW9uc1xuZnVuY3Rpb24gZWx0PFQgZXh0ZW5kcyBFbHROYW1lcz4oZWx0VHlwZTogVCwgbnVtYXJnczogbnVtYmVyKTogRWx0RnVuY3Rpb248VD4ge1xuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJnczogYW55W10pIHtcbiAgICB2YXIgbGVuID0gYXJncy5sZW5ndGhcbiAgICBpZiAobGVuICE9PSBudW1hcmdzKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBlbHRUeXBlICsgJyBleHBlY3RzICcgKyBudW1hcmdzICsgJyBhcmd1bWVudHMsIGJ1dCBnaXZlbiAnICsgbGVuLFxuICAgICAgKVxuICAgIHJldHVybiB7IHQ6IGVsdFR5cGUsIGM6IGxlbiA9PT0gMSA/IGFyZ3NbMF0gOiBhcmdzIH1cbiAgfSBhcyBFbHRGdW5jdGlvbjxUPlxufVxuXG5leHBvcnQgY29uc3QgUGxhaW4gPSBlbHQoJ1BsYWluJywgMSlcbmV4cG9ydCBjb25zdCBQYXJhID0gZWx0KCdQYXJhJywgMSlcbmV4cG9ydCBjb25zdCBDb2RlQmxvY2sgPSBlbHQoJ0NvZGVCbG9jaycsIDIpXG5leHBvcnQgY29uc3QgUmF3QmxvY2sgPSBlbHQoJ1Jhd0Jsb2NrJywgMilcbmV4cG9ydCBjb25zdCBCbG9ja1F1b3RlID0gZWx0KCdCbG9ja1F1b3RlJywgMSlcbmV4cG9ydCBjb25zdCBPcmRlcmVkTGlzdCA9IGVsdCgnT3JkZXJlZExpc3QnLCAyKVxuZXhwb3J0IGNvbnN0IEJ1bGxldExpc3QgPSBlbHQoJ0J1bGxldExpc3QnLCAxKVxuZXhwb3J0IGNvbnN0IERlZmluaXRpb25MaXN0ID0gZWx0KCdEZWZpbml0aW9uTGlzdCcsIDEpXG5leHBvcnQgY29uc3QgSGVhZGVyID0gZWx0KCdIZWFkZXInLCAzKVxuZXhwb3J0IGNvbnN0IEhvcml6b250YWxSdWxlID0gZWx0KCdIb3Jpem9udGFsUnVsZScsIDApXG5leHBvcnQgY29uc3QgVGFibGUgPSBlbHQoJ1RhYmxlJywgNSlcbmV4cG9ydCBjb25zdCBEaXYgPSBlbHQoJ0RpdicsIDIpXG5leHBvcnQgY29uc3QgTnVsbCA9IGVsdCgnTnVsbCcsIDApXG5cbi8vIENvbnN0cnVjdG9ycyBmb3IgaW5saW5lIGVsZW1lbnRzXG5cbmV4cG9ydCBjb25zdCBTdHIgPSBlbHQoJ1N0cicsIDEpXG5leHBvcnQgY29uc3QgRW1waCA9IGVsdCgnRW1waCcsIDEpXG5leHBvcnQgY29uc3QgU3Ryb25nID0gZWx0KCdTdHJvbmcnLCAxKVxuZXhwb3J0IGNvbnN0IFN0cmlrZW91dCA9IGVsdCgnU3RyaWtlb3V0JywgMSlcbmV4cG9ydCBjb25zdCBTdXBlcnNjcmlwdCA9IGVsdCgnU3VwZXJzY3JpcHQnLCAxKVxuZXhwb3J0IGNvbnN0IFN1YnNjcmlwdCA9IGVsdCgnU3Vic2NyaXB0JywgMSlcbmV4cG9ydCBjb25zdCBTbWFsbENhcHMgPSBlbHQoJ1NtYWxsQ2FwcycsIDEpXG5leHBvcnQgY29uc3QgUXVvdGVkID0gZWx0KCdRdW90ZWQnLCAyKVxuZXhwb3J0IGNvbnN0IENpdGUgPSBlbHQoJ0NpdGUnLCAyKVxuZXhwb3J0IGNvbnN0IENvZGUgPSBlbHQoJ0NvZGUnLCAyKVxuZXhwb3J0IGNvbnN0IFNwYWNlID0gZWx0KCdTcGFjZScsIDApXG5leHBvcnQgY29uc3QgTGluZUJyZWFrID0gZWx0KCdMaW5lQnJlYWsnLCAwKVxuZXhwb3J0IGNvbnN0IEZvcm11bGEgPSBlbHQoJ01hdGgnLCAyKSAvLyBkb24ndCBjb25mbGljdCB3aXRoIGpzIGJ1aWx0aW4gTWF0aFxuZXhwb3J0IGNvbnN0IFJhd0lubGluZSA9IGVsdCgnUmF3SW5saW5lJywgMilcbmV4cG9ydCBjb25zdCBMaW5rID0gZWx0KCdMaW5rJywgMylcbmV4cG9ydCBjb25zdCBJbWFnZSA9IGVsdCgnSW1hZ2UnLCAzKVxuZXhwb3J0IGNvbnN0IE5vdGUgPSBlbHQoJ05vdGUnLCAxKVxuZXhwb3J0IGNvbnN0IFNwYW4gPSBlbHQoJ1NwYW4nLCAyKVxuXG4vLyBhIGZldyBhbGlhc2VzXG5leHBvcnQgY29uc3Qgc3RkaW8gPSB0b0pTT05GaWx0ZXJcbiJdfQ==