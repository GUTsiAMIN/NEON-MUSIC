(()=>{const a=document.getElementById('audio-el');if(!a)return;window.NEON_AUDIO={play:s=>{if(!s?.audio)return; a.src=s.audio;a.play().catch(()=>{})},audio:a};})();
