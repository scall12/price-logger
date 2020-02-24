// let requireModule = ( () => {
//     return {
//         requires = () => {
//         const heic2any = require('heic2any');
//         return heic2any;
//         }
//     }
// })();

// const image = 'https://tesseract.projectnaptha.com/img/eng_bw.png';
// const image = '../images/test-receipt-img';
const image = '../images/IMG_1008.jpg';

const worker = new Tesseract.createWorker({
  langPath: 'eng.traineddata.gz'
});

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  //   await worker.setParameters({
  //     tessedit_char_whitelist: 'abcde'
  //   });
  const {
    data: { text }
  } = await worker.recognize(image);
  console.log(text);
  await worker.terminate();
})();
