const form = document.getElementById('log-form')
form.addEventListener('submit', loginUser);

async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById('Lmail').value
  const password = document.getElementById('Lpass').value

  const result = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then((res) => res.json())
}