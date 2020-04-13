const cursor = document.querySelector('#cursor').innerText.trim();
const results = JSON.parse(cursor);

function Headers(props) {
  return /*#__PURE__*/ React.createElement('thead', null, { results });
}

function Body(props) {
  return React.createElement('tbody', null);
}

function Chart(props) {
  return /*#__PURE__*/ React.createElement(
    'table',
    null,
    /*#__PURE__*/ React.createElement(Headers, null)
  );
}

ReactDOM.render(
  /*#__PURE__*/ React.createElement(Chart, null),
  document.getElementById('test-chart')
);
