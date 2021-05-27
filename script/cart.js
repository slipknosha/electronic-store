var list = document.getElementById('cartList');
let cartProducts = JSON.parse(localStorage.getItem('cartArray')) || [];
const buttonSum = document.getElementById('sumCart');
let totalSum = 0;
const array = {};
let setArr = [];

cartProducts.forEach((item, index) => {
	if (item.name in array) {
		array[item.name] += 1;
	} else {
		array[item.name] = 1;
		setArr.push(item)
	}
	totalSum += item.price
});

buttonSum.innerText = `${Math.round(totalSum)}`;

list.innerHTML = setArr.map((product, index) =>
	`<div class="product">
		<img src=${product.image} class="shablon">
		<div class="content">
		<div class="desc">
		<p>Name: ${product.name}</p>
		<p>Price: ${product.price} грн</p>
		</div>
		<div class="actions">
		<button class="add">+</button>   
		<span class="span">${array[product.name]}</span>
		<button class="minus">-</button>
		<button class="delete">Видалити</button>
		</div>
		</div>
	</div>`
).join('')
const products = document.querySelectorAll('.product');

products.forEach((product, index) => (
	product.querySelector('.add').addEventListener('click', (e) => {
		const localArr = JSON.parse(localStorage.getItem('cartArray'));
		array[setArr[index].name] += 1;
		totalSum += setArr[index].price;
		buttonSum.innerText = `${Math.round(totalSum)}`;
		product.querySelector('.span').innerText = array[setArr[index].name];
		localStorage.setItem(
			"cartArray",
			JSON.stringify([...localArr, setArr[index]])
		);
	}),
	product.querySelector('.delete').addEventListener('click', (e) => {
		console.log(e.target)
		setArr = setArr.filter((item, ind) => ind !== index);
		localStorage.setItem('cartArray', JSON.stringify(setArr));
		window.location.reload();
	}),
	product.querySelector('.minus').addEventListener('click', (e) => {
		const localArr = JSON.parse(localStorage.getItem('cartArray'));

		if (array[setArr[index].name] > 1) {
			array[setArr[index].name] -= 1;
			product.querySelector('.span').innerText = array[setArr[index].name];
			const updatedArr = [];
			let count = 0;
			localArr.forEach(item => {
				if (item.name === setArr[index].name && count === 0) {
					count++;
				} else {
					updatedArr.push(item)
				}
			})
			totalSum -= setArr[index].price;
			buttonSum.innerText = `${Math.ceil(totalSum)}`;
			localStorage.setItem('cartArray', JSON.stringify(updatedArr))
		}
	})
)
)

function buyAll() {
	localStorage.clear();
	window.location.reload();
}