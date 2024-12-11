function nmPDC(arr, done) {
  const fileSync = require('tmp').fileSync;
  const writeFileSync = require('fs').writeFileSync;
  const fork = require('child_process').fork;

  function createWorker(fn) {
    const tmpobj = fileSync({ tmpdir: "." });
    writeFileSync(tmpobj.name,
    `process.on('message', function(m) {` +
    `${fn.toString()}` +
    `nmPDC(m[0], m[1]);});`);

    return fork(tmpobj.name);
  }
  function mergeSort(array) {
    let len = array.length;
    for(let k = i; k <= mid; k++) {
      for(let j = hi; j >= mid; j--) {
        if(array[k] > array[j]) {
          let tmp = array[k];
          array[k] = array[j];
          array[j] = tmp;
        }
      }

    return array;
  }
  ////////////////////
  const thresh = 2;
  console.log("test");
  if(arr.length <= thresh) {
    console.log("here!!");
    if(done === undefined) process.send(mergeSort(arr));
    else done(mergeSort(arr));
    return;
  }
  console.log("Test2");
  let left = arr.slice(0, arr.length/2),
  right = arr.slice(arr.length/2, arr.length);
  let res = undefined,
  t = createWorker(nmPDC);
  t.on("message", function(n) {
    console.log("Left worker: " + n);
    if(res === undefined) res = n;
    else {
      if(done === undefined) process.send(res + n);
      else done(res + n);
    }
    t.kill();
  }).send([left]);
  nmPDC(right, function(n) {
    console.log("Right worker: " + n);
    if(res === undefined) res = n;
    else {
      if(done === undefined) process.send(res + n);
      else done(res + n);
    }
  });
}
}
 // Sample array and key to search for
 const arr = [2, 3, 1, 4, 5];
 //const arr = [1];
 console.log("Hi!");
 // Define the callback function to handle the result
 function handleResult(count) {
   console.log(arr);
 }
 
 // Call nmPDC with the array, key, and callback
 nmPDC(arr, handleResult);

// function mergesort(array) {


//     let hi = array.length;
//     let mid = 0;
//     let alen = array.length;
  
//     for(let counter = 1; counter < alen; counter *=2) {
//       for(i = 0; i < alen; i += 2 * counter) {
//         mid = i + counter;
//         hi = 2 * counter;
//         for(let k = i; k <= mid; k++) {
//           for(let j = hi; j >= mid; j--) {
//             if(array[k] > array[j]) {
//               let tmp = array[k];
//               array[k] = array[j];
//               array[j] = tmp;
//             }
//           }
//         }
//       }
//     }
    
//     return array;
//   }
