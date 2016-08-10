'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.registerLanguages = registerLanguages;
exports.default = SyntaxHighlighter;

var _core = require('lowlight/lib/core');

var _core2 = _interopRequireDefault(_core);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultStyle = require('./styles/default-style');

var _defaultStyle2 = _interopRequireDefault(_defaultStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(_ref) {
	var children = _ref.children;
	return _react2.default.createElement(
		'span',
		null,
		children
	);
};

var createStyleObject = function createStyleObject(classNames, style) {
	return classNames.reduce(function (styleObject, className) {
		return _extends({}, styleObject, style[className]);
	}, {});
};

function createChildren(style) {
	var childrenCount = 0;
	return function (children) {
		childrenCount += 1;
		return children.map(function (child, i) {
			return createElement(child, style, 'code-segment-' + childrenCount + '-' + i);
		});
	};
}

function createElement(node, style, key) {
	var properties = node.properties;
	var type = node.type;
	var tagName = node.tagName;
	var value = node.value;

	if (type === "text") {
		return _react2.default.createElement(
			Text,
			{ key: key },
			value
		);
	} else if (tagName) {
		var TagName = tagName;
		var childrenCreator = createChildren(style);
		var nodeStyle = createStyleObject(properties.className, style);
		var children = childrenCreator(node.children);
		return _react2.default.createElement(
			TagName,
			{ key: key, style: nodeStyle },
			children
		);
	}
}

function registerLanguages() {
	var languages = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = Object.keys(languages)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var key = _step.value;

			_core2.default.registerLanguage(key, languages[key]);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
}

function SyntaxHighlighter(props) {
	var language = props.language;
	var children = props.children;
	var _props$style = props.style;
	var style = _props$style === undefined ? _defaultStyle2.default : _props$style;

	var codeTree = _core2.default.highlight(language, children);
	var defaultPreStyle = style.hljs || { backgroundColor: '#fff' };
	return _react2.default.createElement(
		'pre',
		_extends({}, props, { style: defaultPreStyle }),
		_react2.default.createElement(
			'code',
			null,
			codeTree.value.map(function (node, i) {
				return createElement(node, style, 'code-segement' + i);
			})
		)
	);
}