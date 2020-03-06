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

  data.forEach(obj => {
    delete obj._id;
  });

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
      // Create and append th elements
      let th = document.createElement('th');
      th.innerText = atr;
      th.setAttribute('id', `th${j}`);
      trHead.appendChild(th);

      // Create and append td elements
      let td = document.createElement('td');
      td.innerText = object[atr];
      td.setAttribute('id', `td${j}`);
      tr.appendChild(td);
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

  console.log(items, prices);
  for (let i = 0; i < items.length; i++) {
    // Compare the items array and remove duplicates
    if (items[i].value === items[i + 1].value) {
      let element = document.querySelector(`#td${items[i].id}`);
      element.setAttribute('rowspan', 2);
      let deletion = document.querySelector(`#td${items[i + 1].id}`);
      deletion.remove();
    }

    // Compare the price array and highlight row with lowest price
    if (prices[i].price < prices[i + 1].price) {
      //highlight row green
      let element;
    } else if (prices[i].price > prices[i + 1].price) {
      //highlight row green
    } else {
      // highlight both rows yellow
    }
    i++;
  }
});

// const searchBar = document.querySelector('#search-bar');
//

// searchBar.addEventListener('keydown', async event => {
//   // Enter key press
//   if (event.keyCode && event.keyCode === 13) {
//     fetch('/search/results.json')
//       .then(response => response.json())
//       .then(data => {
//         // Check if table exists
//         if (!document.querySelector('table')) {
//           // Create elements
//           let table = document.createElement('table');
//           let thead = document.createElement('thead');
//           let tr = document.createElement('tr');
//           let tbody = document.createElement('tbody');
//           let th = document.createElement('th');

//           // Append to HTML
//           chartDiv.appendChild(table);
//           table.append(thead, tbody);
//           thead.append(tr);
//           tr.append(th);

//           let j = 0;
//           for (let i = 0; i <= data.length; i++) {
//             let tr = document.createElement('tr');
//             tbody.append(tr);
//             tr.setAttribute('id', `tr${i + 1}`);
//             for (let atr in data[0]) {
//               let td = document.createElement('td');
//               tr.append(td);
//               td.setAttribute('id', `td${(j += 1)}`);
//             }
//           }
//         }
//         let table = document.querySelector('table');
//         let thead = document.querySelector('thead');
//         let tbody = document.querySelector('tbody');
//         let th = document.querySelector('th');

//         // Fill data
//         th.innerText = 'Price Comparison';
//         let td1 = document.querySelector(`#td1`);
//         let td2 = document.querySelector(`#td2`);
//         let td3 = document.querySelector(`#td3`);
//         let td4 = document.querySelector(`#td4`);
//         let td5 = document.querySelector(`#td5`);
//         let td6 = document.querySelector(`#td6`);
//         let td7 = document.querySelector(`#td7`);
//         let td8 = document.querySelector(`#td8`);
//         let td9 = document.querySelector(`#td9`);
//         let td10 = document.querySelector(`#td10`);
//         let td11 = document.querySelector(`#td11`);
//         let row1 = document.querySelector('#tr1');
//         let row2 = document.querySelector('#tr2');
//         let row3 = document.querySelector('#tr3');
//         let numTd = row1.children.length;

//         td1.innerText = 'Item';
//         td2.innerText = 'Store';
//         td3.innerText = 'Price';
//         td4.innerText = 'Info';
//         td6.setAttribute('rowspan', '2');
//         td6.innerText = `${data[0].item}`;
//         td7.innerText = `${data[0].collection}`;
//         td8.innerText = `${data[0].price}`;
//         td9.innerText = `${data[0].options}`;
//         td11.innerText = `${data[0].collection}`;
//         td12.innerText = `${data[0].price}`;
//         td13.innerText = `${data[0].options}`;
//         row3.lastChild.remove();
//         // let i = 1;
//         // for (let obj of data) {
//         //   if (td6.getAttribute('rowspan')) {
//         //     document.querySelector(
//         //       `#td${1 * numTd + 1}`
//         //     ).innerText = `${obj.item}`;
//         //   } else {
//         //     document.querySelector(
//         //       `#td${i * numTd + 1}`
//         //     ).innerText = `${obj.item}`;
//         //   }

//         //   document.querySelector(
//         //     `#td${i * numTd + 2}`
//         //   ).innerText = `${obj.collection}`;
//         //   document.querySelector(
//         //     `#td${i * numTd + 3}`
//         //   ).innerText = `${obj.price}`;
//         //   document.querySelector(
//         //     `#td${i * numTd + 4}`
//         //   ).innerText = `${obj.options}`;
//         //   i++;
//         // }

//         // let tdMiddle = document.querySelector(`#td${j / 2 + 1}`);
//         // tdMiddle.innerText = 'Item';

//         // Table Styling

//         let style = document.createElement('style');
//         style.innerHTML = `
//             table, td, tr{
//                 border-style: solid;
//                 border-color: black;
//                 border-width: 0.1px;
//                 text-transform: capitalize;
//             }
//         `;
//         let script = document.querySelector('body script');
//         script.parentNode.insertBefore(style, script);
//         // let p = document.createElement('p');
//         // chartDiv.appendChild(p);
//         // p.innerHTML = JSON.stringify(data[0].item);
//       });
//   }
// });
