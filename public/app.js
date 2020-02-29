const searchBar = document.querySelector('#search-bar');
const chartDiv = document.querySelector('#chart');

searchBar.addEventListener('keydown', event => {
  // Enter key press
  if (event.keyCode && event.keyCode === 13) {
    fetch('/search/results.json')
      .then(response => response.json())
      .then(data => {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        let tbody = document.createElement('tbody');
        let th = document.createElement('th');

        chartDiv.appendChild(table);
        table.append(thead, tbody);
        thead.append(tr);
        tr.append(th);

        for (let obj of data) {
          let tr = document.createElement('tr');
          tbody.append(tr);
          for (let atr in obj) {
            let td = document.createElement('td');
            tr.append(td);
          }
        }

        let p = document.createElement('p');
        chartDiv.appendChild(p);
        p.innerHTML = JSON.stringify(data[0].item);
      });
  }
});
