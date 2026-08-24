(() => {

    const $ = selector => document.querySelector(selector);

    const page = $('#page');

    const themeButton = $('#theme-toggle');


    // =========================
    // Theme
    // =========================

    if (themeButton) {

        themeButton.addEventListener('click', () => {

            const nextTheme =
                document.documentElement.dataset.theme === 'day'
                    ? 'night'
                    : 'day';

            document.documentElement.dataset.theme = nextTheme;

            try {
                localStorage.setItem('neonTheme', nextTheme);
            } catch (_) {}

        });

    }


    // =========================
    // Search
    // =========================

    const search = $('#header-search');

    if (search) {

        search.addEventListener('keydown', event => {

            if (event.key === 'Enter') {

                location.href =
                    'search.html?q=' +
                    encodeURIComponent(search.value.trim());

            }

        });

    }


    // =========================
    // Telegram
    // =========================

    const telegram = $('#telegram');

    if (
        telegram &&
        typeof SITE !== 'undefined' &&
        SITE.telegram
    ) {

        const id = SITE.telegram.trim();

        telegram.textContent = id;

        telegram.href =
            'https://t.me/' +
            id.replace(/^@/, '');

    }


    if (!page) return;


    const file =
        location.pathname.split('/').pop() ||
        'index.html';


    // =========================
    // Static pages
    // =========================

    const staticPages = [
        'about.html',
        'contact.html',
        'privacy.html',
        'terms.html'
    ];

    if (staticPages.includes(file)) return;


    // =========================
    // HOME
    // =========================

    if (file === 'index.html') {

        page.innerHTML = `

            <section class="hero glass">

                <p class="muted">
                    NEON MUSIC
                </p>

                <h1>
                    موسیقی رو با
                    <span class="neon">نئون</span>
                    گوش کن.
                </h1>

                <p>
                    آهنگ‌های مورد علاقه‌ات را سریع پیدا کن
                    و با یک تجربه مدرن و نئونی گوش بده.
                </p>

                <p>

                    <button
                        onclick="location.href='songs.html'"
                    >
                        مشاهده آهنگ‌ها
                    </button>

                    <button
                        onclick="location.href='playlists.html'"
                    >
                        مشاهده پلی‌لیست‌ها
                    </button>

                </p>

            </section>

        `;

        return;
    }


    // =========================
    // SONGS PAGE
    // =========================

    if (file === 'songs.html') {

        const songs =
            typeof DATA !== 'undefined' &&
            Array.isArray(DATA.songs)
                ? DATA.songs
                : [];


        if (!songs.length) {

            page.innerHTML = `

                <section class="empty glass">

                    <h1>
                        هنوز آهنگی اضافه نشده
                    </h1>

                    <p class="muted">
                        هیچ آهنگی در data.js پیدا نشد.
                    </p>

                </section>

            `;

            return;
        }


        page.innerHTML = `

            <section class="hero glass">

                <p class="muted">
                    NEON MUSIC
                </p>

                <h1>
                    آهنگ‌ها
                </h1>

                <p>
                    مجموعه آهنگ‌های NEON MUSIC
                </p>

            </section>


            <section class="songs-grid">

                ${songs.map(song => `

                    <article
                        class="song-card glass"
                        data-song-id="${song.id}"
                    >

                        <div class="song-cover">

                            ${
                                song.cover
                                    ? `
                                        <img
                                            src="${song.cover}"
                                            alt="${song.title}"
                                        >
                                      `
                                    : `
                                        <div class="song-cover-placeholder">
                                            ♫
                                        </div>
                                      `
                            }

                        </div>


                        <div class="song-info">

                            <h2>
                                ${song.title || 'بدون نام'}
                            </h2>

                            <p class="muted">
                                ${song.artist || 'ناشناس'}
                            </p>

                        </div>


                        <button
                            class="song-play"
                            type="button"
                            data-song-id="${song.id}"
                        >
                            ▶
                        </button>

                    </article>

                `).join('')}

            </section>

        `;


        // =========================
        // Play buttons
        // =========================

        document
            .querySelectorAll('.song-play')
            .forEach(button => {

                button.addEventListener('click', () => {

                    const id =
                        button.dataset.songId;

                    const song =
                        songs.find(item =>
                            item.id === id
                        );

                    if (!song) return;


                    // عنوان پلیر

                    const title =
                        $('#player-title');

                    const artist =
                        $('#player-artist');

                    if (title) {
                        title.textContent =
                            song.title || 'بدون نام';
                    }

                    if (artist) {
                        artist.textContent =
                            song.artist || 'ناشناس';
                    }


                    // پخش با سیستم فعلی

                    if (
                        window.NEON_AUDIO &&
                        typeof window.NEON_AUDIO.play === 'function'
                    ) {

                        window.NEON_AUDIO.play(song);

                    }

                });

            });

        return;

    }


    // =========================
    // Other pages
    // =========================

    page.innerHTML = `

        <section class="empty glass">

            <h1>
                محتوا هنوز اضافه نشده
            </h1>

            <p class="muted">
                این بخش بعد از اضافه کردن محتوای واقعی نمایش داده می‌شود.
            </p>

        </section>

    `;

})();
