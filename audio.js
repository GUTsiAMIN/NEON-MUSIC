(() => {
    const a = document.getElementById('audio-el');

    if (!a) return;

    const cover = document.getElementById('player-cover');

    function loadEmbeddedCover(audioUrl) {

        if (!cover || !audioUrl) return;

        if (typeof jsmediatags === 'undefined') {
            console.warn('NEON MUSIC: jsmediatags loaded نشده.');
            return;
        }

        jsmediatags.read(audioUrl, {

            tags: ['picture'],

            onSuccess: function(tag) {

                const picture = tag.tags.picture;

                if (!picture || !picture.data) {
                    console.log(
                        'NEON MUSIC: این آهنگ کاور Embedded ندارد.'
                    );
                    return;
                }

                let binary = '';

                for (let i = 0; i < picture.data.length; i++) {
                    binary += String.fromCharCode(picture.data[i]);
                }

                const base64 = window.btoa(binary);

                cover.src =
                    'data:' +
                    picture.format +
                    ';base64,' +
                    base64;

                console.log(
                    'NEON MUSIC: Embedded Cover با موفقیت خوانده شد.'
                );
            },

            onError: function(error) {

                console.warn(
                    'NEON MUSIC: خواندن Embedded Cover ناموفق بود.',
                    error
                );

            }

        });
    }

    window.NEON_AUDIO = {

        play: function(s) {

            if (!s || !s.audio) return;

            // سیستم پخش فعلی سایت
            a.src = s.audio;

            // خواندن کاور داخل MP3
            loadEmbeddedCover(s.audio);

            // پخش آهنگ
            a.play().catch(() => {});

        },

        audio: a

    };

})();
