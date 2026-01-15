(() => {
  const mount = document.getElementById('site-nav');
  if (!mount) return;

  // ページの階層に合わせて相対パスを受け取る（例: ./ または ../）
  const base = document.currentScript.getAttribute('data-base') || './';

  // 共通ナビのHTMLを取得して差し込む
  fetch(base + 'partials/nav.html', { cache: 'no-store' })
    .then(r => r.text())
    .then(html => {
      mount.innerHTML = html;

      // 現在ページのリンクに .active を付ける
      const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      mount.querySelectorAll('.nav-links a').forEach(a => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
      });

      // 「蔵書」ボタン：Homeにあるモーダルを開く（なければHomeへ誘導）
      const booksBtn = mount.querySelector('#openBooks');
      if (booksBtn) {
        booksBtn.addEventListener('click', e => {
          e.preventDefault();
          if (typeof window.__openBooksModal === 'function') {
            window.__openBooksModal();
          } else {
            location.href = 'index.html#books';
          }
        });
      }
    })
    .catch(err => {
      console.error('[nav.js] failed to load nav:', err);
    });
})();
