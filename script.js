(() => {
  const modal = document.getElementById('certModal');
  const modalImage = document.getElementById('modalImage');
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (modalImage) modalImage.src = '';
  };

  document.querySelectorAll('.cert-preview img').forEach(img => {
    img.addEventListener('error', () => {
      const holder = img.parentElement;
      if (!holder) return;
      holder.innerHTML = '<div style="height:100%;display:grid;place-items:center;text-align:center;padding:16px;font:11px DM Mono,monospace;color:#777">Certificate image not included</div>';
    });
    img.addEventListener('click', e => {
      e.stopPropagation();
      if (!modal || !modalImage || !img.complete || !img.naturalWidth) return;
      modalImage.src = img.src;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  document.querySelectorAll('.cert-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.cert;
      if (!modal || !modalImage || !src) return;
      modalImage.src = src;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  document.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();
