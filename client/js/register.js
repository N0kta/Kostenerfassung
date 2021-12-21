const form = document.getElementById('reg-form')
form.addEventListener('submit', registerUser);

async function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById('Rname').value
  const email = document.getElementById('Rmail').value
  const password = document.getElementById('Rpass').value
  const account = document.getElementById('Racc').value

  const result = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      password,
      account
    })
  }).then((res) => res.json())
}