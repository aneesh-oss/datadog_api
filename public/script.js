const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const fetchProductsButton = document.getElementById('fetch-products');
const productList = document.getElementById('product-list');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.text();
    alert(data);
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Login successful!');
    } else {
        alert('Login failed!');
    }
});

fetchProductsButton.addEventListener('click', async () => {
    const token = localStorage.getItem('token');

    const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const products = await response.json();
    productList.innerHTML = products.map(product => `
        <div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
        </div>
    `).join('');
});
