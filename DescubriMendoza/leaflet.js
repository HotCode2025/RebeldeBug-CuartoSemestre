/* Leaflet Injection Engine - Versión Prototipo Local Mendoza */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.L = {}));
})(this, (function (exports) { 'use strict';
    var version = "1.9.4";
    function extend(dest) { var i, j, len, src; for (j = 1, len = arguments.length; j < len; j++) { src = arguments[j]; for (i in src) { dest[i] = src[i]; } } return dest; }
    function bind(fn, obj) { var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null; return function () { return fn.apply(obj, args || arguments); }; }
    var Map = function(id, options) {
        this.id = id; this.options = extend({}, options);
        var el = document.getElementById(id);
        el.className += ' leaflet-container';
        el.innerHTML = '<div class="leaflet-pane leaflet-tile-pane" style="width:100%; height:100%; background:#e0eeee url(\'https://openstreetmap.org\') center"></div>';
        this.setView = function(coords, zoom) { return this; };
        this.invalidateSize = function() { return this; };
        this.remove = function() { el.innerHTML = ''; return this; };
    };
    function map(id, options) { return new Map(id, options); }
    function tileLayer(url, options) { return { addTo: function(map) { return this; } }; }
    function marker(coords, options) { return { addTo: function(map) { return { bindPopup: function(content) { return this; } }; } } }
    exports.map = map; exports.L = map; exports.tileLayer = tileLayer; exports.marker = marker; exports.version = version;
}));
