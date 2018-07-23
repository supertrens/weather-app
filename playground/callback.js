console.log('start program');
let getUser = (id, callback) => {
  let user = {
    id: id,
    name: 'Peter'
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(31, user => {
  console.log(user);
});
console.log('end program');
