(function() {
  const container = document.getElementById('productos-container');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  let productos = [];

  // Cargar productos desde JSON
  async function cargarProductos() {
    try {
      const response = await fetch('products.json');
      productos = await response.json();
      renderizarCatalogo();
    } catch (error) {
      console.error('Error al cargar productos:', error);
      container.innerHTML = '<p style="text-align:center;color:#64748b;">Error al cargar el catálogo. Intenta recargar la página.</p>';
    }
  }

  // Renderizar tarjetas de producto en la página principal
  function renderizarCatalogo() {
    container.innerHTML = '';

    const activos = productos.filter(p => p.estado === 'activo');

    if (activos.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:#64748b;">Próximamente nuevas herramientas.</p>';
      return;
    }

    activos.forEach(p => {
      const card = document.createElement('article');
      card.className = 'producto-card';
      card.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="this.src='logo.png'">
        <div class="producto-info">
          <span class="categoria">${p.categoria}</span>
          <h2>${p.icono} ${p.nombre}</h2>
          <p class="tagline">${p.tagline}</p>
          <p class="descripcion">${p.descripcion}</p>
          <div class="producto-footer">
            <span class="precio">${p.precio} <small>${p.tipoPrecio}</small></span>
            <button class="btn" data-id="${p.id}">Ver más</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Asignar eventos a los botones "Ver más"
    document.querySelectorAll('.btn[data-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        abrirProducto(id);
      });
    });
  }

  // Abrir modal con la página de detalle del producto
  function abrirProducto(id) {
    const p = productos.find(prod => prod.id === id);
    if (!p) return;

    const dl = p.descripcionLarga;

    let html = `
      <div class="producto-detalle">
        <section class="hero-producto">
          <img src="${p.imagen}" alt="${p.nombre} en acción" loading="lazy" onerror="this.src='logo.png'">
          <div class="cta-box">
            <span class="precio-grande">${p.precio}</span>
            <span class="tipo-precio">${p.tipoPrecio}. Sin suscripciones.</span>
            <a href="${p.enlaceCompra}" class="btn-comprar" target="_blank" rel="noopener">Comprar ahora</a>
          </div>
        </section>
        <section class="descripcion-larga">
          <h2>${p.id === 'contratoseguro' ? 'No firmes a ciegas' : 'No pagues una multa sin luchar'}</h2>
          <p>${dl.introduccion}</p>
          <p>${dl.introduccion2}</p>

          <h2>Lo que hace por ti</h2>
          <ul>
            ${dl.funcionalidades.map(f => `<li>${f}</li>`).join('')}
          </ul>
    `;

    // Tonos (si existen)
    if (dl.tonos) {
      html += `
          <h2>Tres tonos para tres momentos</h2>
          <p>No todas las alegaciones se presentan igual. Elige el tono que mejor se adapte a tu situación:</p>
          <ul>
            ${dl.tonos.map(t => `<li><strong>${t.split(':')[0]}:</strong> ${t.split(':').slice(1).join(':')}</li>`).join('')}
          </ul>
      `;
    }

    // Tipos de contrato o procedimiento
    if (dl.tiposContrato) {
      html += `
          <h2>Tipos de contrato que analiza</h2>
          <ul>
            ${dl.tiposContrato.map(t => `<li><strong>${t.nombre}:</strong> ${t.descripcion}</li>`).join('')}
          </ul>
      `;
    } else if (dl.tiposProcedimiento) {
      html += `
          <h2>Tipos de procedimiento que cubre</h2>
          <ul>
            ${dl.tiposProcedimiento.map(t => `<li>${t}</li>`).join('')}
          </ul>
      `;
    }

    // Privacidad y contenido del ZIP
    html += `
          <h2>100% privado · 100% local</h2>
          <p>${dl.privacidad}</p>

          <h2>Lo que recibes</h2>
          <p>${dl.recibes}</p>
          <p>Pago único de ${p.precio}. Sin suscripciones. La licencia es vitalicia.</p>

          <h2>Aviso importante</h2>
          <p>Esta herramienta ofrece una orientación preliminar generada por IA. No sustituye a un abogado ni a un gestor administrativo colegiado. Ante cualquier duda fundada, consulta con un profesional del derecho.</p>
    `;

    // Testimonios
    if (dl.testimonios && dl.testimonios.length > 0) {
      html += '<h2>Lo que dicen los usuarios</h2>';
      dl.testimonios.forEach(t => {
        html += `<blockquote>«${t.texto}»<br>— ${t.autor}</blockquote>`;
      });
    }

    html += `
          <h2>Empieza ahora</h2>
          <p>${p.id === 'contratoseguro' ? 'Analiza tu contrato en minutos. Negocia con argumentos. Firma sin miedo.' : 'No dejes pasar el plazo. Redacta tu alegación, adjunta tus pruebas y defiende tus derechos.'}</p>
        </section>
      </div>
    `;

    modalBody.innerHTML = html;
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Scroll al inicio del modal
    modalBody.scrollTop = 0;
  }

  // Cerrar modal
  function cerrarModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', cerrarModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) cerrarModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Iniciar
  cargarProductos();
})();
