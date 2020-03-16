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
  const results = JSON.parse(cursor);

  let i = 1;
  let j = 1;

  // Fill table body
  for (let object of results) {
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
      const skipCols = ['_id', 'user', 'currency', 'priceWeightSelect'];
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
      if (td.classList.contains('priceWeight') && td.innerText !== '') {
        th.innerText = 'Price/Weight';
        td.innerText = td.innerText.concat('/', object['priceWeightSelect']);
      } else if (td.classList.contains('priceWeight')) {
        th.innerText = 'Price/Weight';
        td.innerText = 'N/A';
      }
      j++;
    }
    i++;
  }

  // Remove item duplicates and highlight lowest price row
  const items = document.querySelectorAll('tbody .item');
  const prices = document.querySelectorAll('tbody .price');
  const priceWeights = document.querySelectorAll('tbody .priceWeight');

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

  document.querySelector('#cursor').remove();
});
