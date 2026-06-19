fetch('products.json')
    .then(res => res.json())
    .then(products => {
        const container = document.getElementById('products-container');
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            const iconDiv = document.createElement('div');
            iconDiv.className = 'product-icon';
            iconDiv.textContent = product.icono;
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'product-info';
            
            const name = document.createElement('h3');
            name.textContent = product.nombre;
            
            const tagline = document.createElement('p');
            tagline.className = 'product-tagline';
            tagline.textContent = product.tagline;
            
            const desc = document.createElement('p');
            desc.className = 'product-desc';
            desc.textContent = product.descripcion;
            
            const featuresList = document.createElement('ul');
            featuresList.className = 'product-features';
            const funcionalidades = product.descripcionLarga?.funcionalidades || [];
            funcionalidades.slice(0, 4).forEach(f => {
                const li = document.createElement('li');
                li.textContent = f;
                featuresList.appendChild(li);
            });
            
            let testimonialHTML = '';
            if (product.descripcionLarga?.testimonios?.length > 0) {
                const t = product.descripcionLarga.testimonios[0];
                testimonialHTML = `<div class="product-testimonial">"${t.texto}"<span class="autor">— ${t.autor}</span></div>`;
            }
            
            const price = document.createElement('div');
            price.className = 'price';
            price.textContent = product.precio;
            
            const priceType = document.createElement('div');
            priceType.className = 'price-type';
            priceType.textContent = product.tipoPrecio;
            
            const buyBtn = document.createElement('a');
            buyBtn.className = 'buy-btn';
            buyBtn.href = product.enlaceCompra;
            buyBtn.target = '_blank';
            buyBtn.rel = 'noopener';
            buyBtn.textContent = 'Comprar ahora';
            
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'etiquetas';
            (product.etiquetas || []).forEach(tag => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tag;
                tagsDiv.appendChild(span);
            });
            
            infoDiv.appendChild(name);
            infoDiv.appendChild(tagline);
            infoDiv.appendChild(desc);
            infoDiv.appendChild(featuresList);
            if (testimonialHTML) infoDiv.innerHTML += testimonialHTML;
            infoDiv.appendChild(price);
            infoDiv.appendChild(priceType);
            infoDiv.appendChild(buyBtn);
            infoDiv.appendChild(tagsDiv);
            
            card.appendChild(iconDiv);
            card.appendChild(infoDiv);
            container.appendChild(card);
        });
    })
    .catch(err => {
        document.getElementById('products-container').innerHTML = '<p style="text-align:center;">Error al cargar los productos. Intenta recargar la página.</p>';
        console.error('Error cargando products.json:', err);
    });
