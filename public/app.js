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
      th.classList.add(`${atr}`);
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

  // Remove item duplicates and highlight lowest price row
  const tdList = document.querySelectorAll('tbody td');
  const trList = document.querySelectorAll('tbody tr');
  let divisor = tdList.length / trList.length;
  const items = [];
  const prices = [];
  const priceWeights = [];

  // Extract td elements in the item and price columns
  for (let element of tdList) {
    let id = parseInt(element.getAttribute('id').replace(/\D/gi, ''));
    // Item column
    if (id % divisor === 1) {
      items.push({ id, value: element.innerText });
    }
    // Price column
    if (id % divisor === 3) {
      prices.push({ id, value: element.innerText });
    }
    // Price/Weight column
    if (id % divisor === 0) {
      priceWeights.push({ id, value: element.innerText });
    }
  }

  removeItemDuplicates(items);
  rankBy(prices);

  // Highlight row by either price or price/weight
  const thPrice = document.querySelector('thead .price');
  const thPriceWeight = document.querySelector('thead .priceWeight');

  thPrice.classList.add('rankBy');
  thPrice.addEventListener('click', () => {
    thPriceWeight.classList.remove('rankBy');
    thPrice.classList.add('rankBy');
    rankBy(prices);
  });
  thPriceWeight.addEventListener('click', () => {
    thPrice.classList.remove('rankBy');
    thPriceWeight.classList.add('rankBy');
    rankBy(priceWeights);
  });
});

function rankBy(arr) {
  for (let i = 0; i < arr.length; i++) {
    // Compare the price array and highlight row with lowest price
    let row1 = document.querySelector(`#td${arr[i].id}`).parentNode;
    let row2 = document.querySelector(`#td${arr[i + 1].id}`).parentNode;
    if (arr[i].value < arr[i + 1].value) {
      //highlight row green
      row1.classList.add('highlight-green');
      row2.classList.remove('highlight-green');
    } else if (arr[i].value > arr[i + 1].value) {
      //highlight row green
      row2.classList.add('highlight-green');
      row1.classList.remove('highlight-green');
    } else {
      row1.classList.remove('highlight-green');
      row2.classList.remove('highlight-green');
    }
    i++;
  }
}

function removeItemDuplicates(arr) {
  // Compare the items array and remove duplicates
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === arr[i + 1].value) {
      let element = document.querySelector(`#td${arr[i].id}`);
      element.setAttribute('rowspan', 2);
      element.classList.add('no-highlight');
      let deletion = document.querySelector(`#td${arr[i + 1].id}`);
      deletion.remove();
    }
    i++;
  }
}
