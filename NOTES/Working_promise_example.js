//https://javascript.info/promise-chaining

var p = function()
{
   return new Promise(function(resolve, reject) {
      setTimeout(() => resolve(1), 1000);
    })
};

var p2 = function(result) 
{
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  })
};

var p3 = function (result)
{
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
};

/* ************************************** */

p().then(function(result) {

  alert(result); // 1
  return p2(result);  // MUST return the function not just execute it!!!!

}).then(function(result) {

  alert(result); // 2
  return p3(result);

}).then(function(result) {

  alert(result); // 4

});