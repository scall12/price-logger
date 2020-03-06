window.addEventListener('load', event => {
  console.log('loaded');
  const chartDiv = document.querySelector('#chart-div');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  chartDiv.appendChild(table);
  table.append(thead, tbody);

  const cursor = document.querySelector('#cursor').innerText.trim();
  const data = JSON.parse(cursor);

  let i = 1;
  let j = 1;

  // Fill table body
  for (let object of data) {
    if (i === 1) {
      let trHead = document.createElement('tr');
      thead.appendChild(trHead);
    }
    let tr = document.createElement('tr');
    tr.setAttribute('id', `tr${i}`);
    tbody.appendChild(tr);
    for (let atr in object) {
      let th = document.createElement('th');
      th.innerText = atr;
      trHead.appendChild(th);
      let td = document.createElement('td');
      td.innerText = atr;
      tr.appendChild(td);
      j++;
    }
    i++;
  }

  console.log(data);
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
