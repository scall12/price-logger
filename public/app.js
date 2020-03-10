window.addEventListener('load', event => {
  // Table boilerplate
  const chartDiv = document.querySelector('#chart-div');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  chartDiv.appendChild(table);
  table.append(thead, tbody);

  // Retrieve JSON data from hidden <p>
  const cursor = document.querySelector('#cursor').innerText.trim();
  const data = JSON.parse(cursor);
  document.querySelector('#cursor').remove();

  let i = 1;
  let j = 1;

  // Fill table body
  for (let object of data) {
    // Create and append tr elements in thead and tbody
    let trHead = document.createElement('tr');
    if (i === 1) {
      thead.appendChild(trHead);
    }
    let tr = document.createElement('tr');
    tr.setAttribute('id', `tr${i}`);
    tbody.appendChild(tr);

    for (let atr in object) {
      // Skip creating and populating table for these key pairs
      const skipCols = ['_id', 'currency', 'priceWeightSelect'];
      if (skipCols.includes(atr)) {
        continue;
      }

      // Create and append th elements
      let th = document.createElement('th');
      th.innerText = atr;
      th.setAttribute('id', `th${j}`);
      trHead.appendChild(th);

      // Create and append td elements
      let td = document.createElement('td');
      td.innerText = object[atr];
      td.setAttribute('id', `td${j}`);
      td.classList.add(`${atr}`);
      tr.appendChild(td);

      // Add currency char
      if (parseFloat(td.innerText)) {
        if (object.currency === 'gbp') {
          td.innerText = '£'.concat(object[atr].toString());
        } else if (object.currency === 'usd') {
          td.innerText = '$'.concat(object[atr].toString());
        }
      }

      // If price/weight data exists, then combine the
      // price/weight number with the descriptor string
      if (td.classList.contains('priceWeight')) {
        th.innerText = 'Price/Weight';
        td.innerText = td.innerText.concat('/', object['priceWeightSelect']);
      }
      j++;
    }
    i++;
  }

  const tdList = document.querySelectorAll('tbody td');
  const trList = document.querySelectorAll('tbody tr');
  let divisor = tdList.length / trList.length;
  const items = [];
  const prices = [];

  // Extract td elements in the item and price columns
  for (let element of tdList) {
    let id = parseInt(element.getAttribute('id').replace(/\D/gi, ''));
    // Item column
    if (id % divisor === 1) {
      items.push({ id, value: element.innerText });
    }
    // Price column
    if (id % divisor === 3) {
      prices.push({ id, price: element.innerText });
    }
  }

  for (let i = 0; i < items.length; i++) {
    // Compare the items array and remove duplicates
    if (items[i].value === items[i + 1].value) {
      let element = document.querySelector(`#td${items[i].id}`);
      element.setAttribute('rowspan', 2);
      element.classList.add('no-highlight');
      let deletion = document.querySelector(`#td${items[i + 1].id}`);
      deletion.remove();
    }

    // Compare the price array and highlight row with lowest price
    if (prices[i].price < prices[i + 1].price) {
      //highlight row green
      let row = document.querySelector(`#td${prices[i].id}`).parentNode;
      row.classList.add('highlight-green');
    } else if (prices[i].price > prices[i + 1].price) {
      //highlight row green
      let row = document.querySelector(`#td${prices[i + 1].id}`).parentNode;
      row.classList.add('highlight-green');
    } else {
      // highlight both rows yellow
      let row1 = document.querySelector(`#td${prices[i].id}`).parentNode;
      let row2 = document.querySelector(`#td${prices[i + 1].id}`).parentNode;
      row1.classList.add('no-highlight');
      row2.classList.add('no-highlight');
    }
    i++;
  }
});
