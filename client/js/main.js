async function createDiv(obj) {
var x = document.getElementsByClassName("inner");
for (i = 0; i < x.length; i++) {
  x[i].remove();
}

  const div = document.createElement("div");
  div.classList.add('inner');
  console.log(obj)
  div.textContent = obj;

  const s = div.style;
  s.fontSize        = "10px";
  s.backgroundColor = "white";
  s.color           = "black";
  s.border          = "1px solid black";
  s.margin          = "3px";
  s.borderRadius    = "5px";
  s.padding         = "2px";
  s.whiteSpace      = 'pre';  // <-- Right here.

  document.getElementById('history').appendChild(div);
}

const form = document.getElementById('A-form')
form.addEventListener('submit', saveExpense);

async function saveExpense(event) {
  event.preventDefault();

  

  const amount = document.getElementById('menge').value
  const desc = document.getElementById('btext').value
  const type = document.activeElement.id
  
  await fetch('/api/action', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount,
      desc,
      type
    })
  }).then(res => {
    stand();
    list();
  })
}

async function list() {
  await fetch('/list').then(function(response) {
    response.text().then(function(res) {
      createDiv(res);
    });
  });
}

async function stand() {
  await fetch('/stand').then(function(response) {
    response.text().then(function(res) {
      var stn = res + 0;
      var dom = stn * 1.13
      var dol = dom.toString()
      var num = dol.slice(0, (dol.indexOf("."))+3);
      document.getElementById('stand').textContent = stn + '€' + '---' + num + '$';
    });
  });
}

async function tip() {
  var val = document.getElementById('menge').value
  var dom = val *1.13
  var dol = dom.toString()
  var num = dol.slice(0, (dol.indexOf("."))+3);
  document.getElementById('vvv').innerHTML = val + '€' + '---' + num + '$';
}
stand()
list()