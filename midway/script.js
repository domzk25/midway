<script>
  function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  }

  function showSection(id) {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('dropdownMenu').style.display = 'none';
  }

  let productCount = 0;

  function saveProducts() {
    const products = [];
    document.querySelectorAll('.product-entry').forEach(entry => {
      const img = entry.querySelector('img').src;
      const name = entry.querySelectorAll('input[type="text"]')[0].value;
      const price = entry.querySelectorAll('input[type="text"]')[1].value;
      products.push({ img, name, price });
    });
    localStorage.setItem('products', JSON.stringify(products));
  }

  function addProduct(imgSrc = '', name = '', price = '') {
    productCount++;
    const container = document.createElement('div');
    container.className = 'product-entry';
    container.innerHTML = `
      <input type="file" accept="image/*" onchange="handleImageUpload(event, 'preview${productCount}')">
      <img id="preview${productCount}" src="${imgSrc}" alt="Product Image">
      <input type="text" placeholder="Item Name" value="${name}">
      <input type="text" placeholder="Item Price" value="${price}">
      <button class="add-btn" onclick="saveProducts()">Save</button>
      <button class="delete-btn" onclick="deleteProduct(this)">Delete</button>
    `;
    document.getElementById('productList').appendChild(container);
  }

  function handleImageUpload(event, imgId) {
    const reader = new FileReader();
    reader.onload = function () {
      document.getElementById(imgId).src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  function deleteProduct(button) {
    button.parentElement.remove();
    saveProducts();
  }

  function loadProducts() {
    const saved = localStorage.getItem('products');
    if (saved) {
      JSON.parse(saved).forEach(p => addProduct(p.img, p.name, p.price));
    }
  }

  window.onload = loadProducts;
</script>
