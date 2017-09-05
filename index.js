'use strict';

var React = require('react');
var reactRedux = require('react-redux');

const __assign = Object.assign || function (target) {
    for (var source, i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (var prop in source) {
            if (Object.prototype.hasOwnProperty.call(source, prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var reduxFilter = function (name) { return function (WrappedComponent) {
    var mapStateToProps = function (state) { };
    var mapDispatchToProps = {};
    var Filter = (function (_super) {
        __extends(Filter, _super);
        function Filter() {
            _super.apply(this, arguments);
        }
        Filter.prototype.render = function () {
            return React.createElement(WrappedComponent, __assign({}, this.props));
        };
        return Filter;
    }(React.PureComponent));
    return reactRedux.connect(mapStateToProps, mapDispatchToProps)(Filter);
}; };

var index = {
    reduxFilter
};

module.exports = index;
