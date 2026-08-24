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

                const query = search.value.trim();

                location.href =
                    'search.html?q=' +
                    encodeURIComponent(query);

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


    // =========================
    // Page check
    // =========================

    if (!page) return;


    const path =
        window.location.pathname.toLowerCase();


    const file =
        path.split('/').pop() || 'index.html';


    // =========================
    // DEBUG
    // =========================

    console.log(
        'NEON MUSIC:',
        'Current page =',
        file
    );

    console.log(
        'NEON MUSIC:',
        'DATA =',
        typeof DATA !== 'undefined'
            ? DATA
            : 'DATA NOT FOUND'
    );


    // =========================
    // Static pages
    // =========================

    const staticPages = [
        'about.html',
        'contact.html',
        'privacy.html',
        'terms.html'
    ];

    if (staticPages.includes(file)) {
        return;
    }


    // =========================
    // HOME
    // =========================

    if (
        file === 'index.html' ||
        file === ''
    ) {

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
    // SONGS
    // =========================

    if (file === 'songs.html') {

        let songs = [];


        // دریافت اطلاعات آهنگ‌ها

        if (
            typeof DATA !== 'undefined' &&
            DATA &&
            Array.isArray(DATA.songs)
        ) {

            songs = DATA.songs;

        }


        console.log(
            'NEON MUSIC:',
            'Songs found =',
            songs.length
        );


        // اگر آهنگی وجود ندارد

        if (songs.length === 0) {

            page.innerHTML = `

                <section
                    class="empty glass"
                    style="
                        margin:40px auto;
                        max-width:900px;
                        text-align:center;
                    "
                >

                    <h1>
                        هنوز آهنگی اضافه نشده
                    </h1>

                    <p class="muted">
                        DATA.songs خالی است.
                    </p>

                </section>

            `;

            return;
        }


        // =========================
        // SONGS HEADER
        // =========================

        let html = `

            <section
                class="hero glass"
                style="margin-bottom:25px;"
            >

                <p class="muted">
                    NEON MUSIC
                </p>

                <h1>
                    آهنگ‌ها
                </h1>

                <p>
                    ${songs.length} آهنگ در نئون موزیک
                </p>

            </section>

            <section
                class="songs-grid"
                style="
                    display:grid;
                    grid-template-columns:
                    repeat(auto-fill,minmax(220px,1fr));
                    gap:20px;
                "
            >

        `;


        // =========================
        // CREATE SONG CARDS
        // =========================

        songs.forEach(song => {

            const title =
                song.title || 'بدون نام';

            const artist =
                song.artist || 'ناشناس';

            const id =
                song.id || title;


            html += `

                <article
                    class="song-card glass"
                    data-song-id="${id}"
                    style="
                        position:relative;
                        overflow:hidden;
                        padding:15px;
                        border-radius:20px;
                    "
                >

                    <div
                        class="song-cover"
                        style="
                            width:100%;
                            aspect-ratio:1/1;
                            overflow:hidden;
                            border-radius:15px;
                            margin-bottom:15px;
                        "
                    >

                        ${
                            song.cover
                            ?

                            `
                            <img
                                src="${song.cover}"
                                alt="${title}"
                                style="
                                    width:100%;
                                    height:100%;
                                    object-fit:cover;
                                    display:block;
                                "
                            >
                            `

                            :

                            `
                            <div
                                class="song-cover-placeholder"
                                style="
                                    width:100%;
                                    height:100%;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    font-size:70px;
                                "
                            >
                                ♫
                            </div>
                            `
                        }

                    </div>


                    <div class="song-info">

                        <h2>
                            ${title}
                        </h2>

                        <p class="muted">
                            ${artist}
                        </p>

                    </div>


                    <button
                        class="song-play"
                        type="button"
                        data-song-id="${id}"
                        style="
                            cursor:pointer;
                        "
                    >
                        ▶ پخش
                    </button>

                </article>

            `;

        });


        html += `

            </section>

        `;


        // نمایش

        page.innerHTML = html;


        // =========================
        // PLAY BUTTONS
        // =========================

        document
            .querySelectorAll('.song-play')
            .forEach(button => {

                button.addEventListener(
                    'click',
                    () => {

                        const id =
                            button.dataset.songId;


                        const song =
                            songs.find(
                                item =>
                                    String(item.id) ===
                                    String(id)
                            );


                        if (!song) {

                            console.error(
                                'NEON MUSIC: Song not found',
                                id
                            );

                            return;

                        }


                        console.log(
                            'NEON MUSIC: Playing',
                            song
                        );


                        // عنوان پلیر

                        const playerTitle =
                            $('#player-title');

                        const playerArtist =
                            $('#player-artist');


                        if (playerTitle) {

                            playerTitle.textContent =
                                song.title ||
                                'بدون نام';

                        }


                        if (playerArtist) {

                            playerArtist.textContent =
                                song.artist ||
                                'ناشناس';

                        }


                        // =========================
                        // استفاده از پلیر فعلی
                        // =========================

                        if (
                            window.NEON_AUDIO &&
                            typeof window.NEON_AUDIO.play ===
                            'function'
                        ) {

                            window.NEON_AUDIO.play(song);

                        }

                        else {

                            // پشتیبان برای جلوگیری
                            // از خراب شدن پخش

                            const audio =
                                $('#audio-el');

                            if (audio && song.audio) {

                                audio.src =
                                    song.audio;

                                audio.play().catch(
                                    error => {
                                        console.warn(
                                            'NEON MUSIC: Audio play failed',
                                            error
                                        );
                                    }
                                );

                            }

                        }

                    }
                );

            });


        return;

    }


    // =========================
    // OTHER PAGES
    // =========================

    page.innerHTML = `

        <section
            class="empty glass"
            style="
                margin:40px auto;
                max-width:900px;
                text-align:center;
            "
        >

            <h1>
                محتوا هنوز اضافه نشده
            </h1>

            <p class="muted">
                این بخش بعداً تکمیل می‌شود.
            </p>

        </section>

    `;

})();
