async function loadMenu() {
  const grid = document.getElementById('menu-grid');
  try {
    const res = await fetch('./static-data/menu.json');
    const items = await res.json();
    grid.innerHTML = items.map((item) => `
      <article class="menu-item">
        <h4>${item.name}</h4>
        <a class="menu-link" href="${item.url}" target="_blank" rel="noreferrer">Order on Toast</a>
      </article>
    `).join('');
  } catch {
    grid.innerHTML = '<p>Unable to load menu right now.</p>';
  }
}

async function setupForm() {
  const form = document.getElementById('vip-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('request_failed');
      status.textContent = 'Thanks! You are on the VIP list.';
      form.reset();
    } catch {
      status.textContent = 'Saved locally unavailable on static hosting. Run `node server.mjs` for API support.';
    }
  });
}

loadMenu();
setupForm();
