(()=>{
  const $ = selector => document.querySelector(selector);
  const page = $('#page');
  const themeButton = $('#theme-toggle');

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'day' ? 'night' : 'day';
      document.documentElement.dataset.theme = nextTheme;
      try { localStorage.setItem('neonTheme', nextTheme); } catch (_) {}
    });
  }

  const search = $('#header-search');
  if (search) {
    search.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        location.href = 'search.html?q=' + encodeURIComponent(search.value.trim());
      }
    });
  }

  const telegram = $('#telegram');
  if (telegram && typeof SITE !== 'undefined' && SITE.telegram) {
    const id = SITE.telegram.trim();
    telegram.textContent = id;
    telegram.href = 'https://t.me/' + id.replace(/^@/, '');
  }

  if (!page) return;
  const file = location.pathname.split('/').pop() || 'index.html';

  // صفحات دارای متن ثابت نباید توسط جاوااسکریپت پاک یا بازنویسی شوند.
  const staticPages = ['about.html', 'contact.html', 'privacy.html', 'terms.html'];
  if (staticPages.includes(file)) return;

  if (file === 'index.html') {
    page.innerHTML = `
      <section class="hero glass">
        <p class="muted">NEON MUSIC</p>
        <h1>موسیقی رو با <span class="neon">نئون</span> گوش کن.</h1>
        <p>آهنگ‌های مورد علاقه‌ات را سریع پیدا کن و با یک تجربه مدرن و نئونی گوش بده.</p>
        <p>
          <button onclick="location.href='songs.html'">مشاهده آهنگ‌ها</button>
          <button onclick="location.href='playlists.html'">مشاهده پلی‌لیست‌ها</button>
        </p>
      </section>
      <section class="empty glass">
        <h2>هنوز آهنگی اضافه نشده</h2>
        <p class="muted">بعداً با اضافه کردن فایل‌ها به data.js و پوشه assets، آهنگ‌ها و پلی‌لیست‌ها اینجا نمایش داده می‌شوند.</p>
      </section>`;
    return;
  }

  page.innerHTML = `
    <section class="empty glass">
      <h1>محتوا هنوز اضافه نشده</h1>
      <p class="muted">این بخش بعد از اضافه کردن محتوای واقعی توسط شما نمایش داده می‌شود.</p>
    </section>`;
})();
