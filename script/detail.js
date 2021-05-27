const detail = document.getElementById("details");
const product = JSON.parse(localStorage.getItem('block'));

detail.innerHTML = `
<img src=${product.image}>
<div id="info">
<p>${product.name}</p>
<p>${product.description}</p>
<p>${product.price} UAH</p>
</div>`;