fetch('products.json')
    .then(res => res.json())
    .then(products => {
        const container = document.getElementById('products-container');
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price">${product.price}</div>
                    <a href="${product.buyLink}" class="buy-btn" target="_blank">Comprar ahora</a>
                </div>
            `;
            container.appendChild(card);
        });
    });

// Testimonios rotativos (estáticos, puedes ampliarlos)
const testimonials = [
    '"Con ResumeForge pasé de 0 a 3 entrevistas en una semana. Y sin miedo por mis datos." – María G.',
    '"El pago único es un soplo de aire fresco frente a las suscripciones mensuales." – Carlos R.',
    '"Funciona sin internet. Perfecto para trabajar con privacidad real." – Laura M.'
];
let idx = 0;
const testimonialDiv = document.getElementById('testimonial-container');
testimonialDiv.textContent = testimonials[0];
setInterval(() => {
    idx = (idx + 1) % testimonials.length;
    testimonialDiv.textContent = testimonials[idx];
}, 5000);
