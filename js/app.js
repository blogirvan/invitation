document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading Screen
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 1000);

    // 2. Mengambil Nama Tamu dari URL Parameter (?to=NamaTamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || 'Tamu Undangan';
    document.getElementById('guest-name').innerText = guestName;

    // 3. Inisialisasi AOS Animation
    AOS.init({
        once: true, 
        offset: 50,
    });

    // 4. Buka Undangan & Play Music
    const openBtn = document.getElementById('open-invitation');
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = false;

    openBtn.addEventListener('click', () => {
        // Angkat Cover ke atas
        cover.classList.add('cover-up');
        
        // Hapus limitasi scroll
        mainContent.classList.remove('hidden-content');
        mainContent.style.height = 'auto';

        // Play BGM
        bgMusic.play().then(() => {
            isPlaying = true;
        }).catch((err) => console.log("Audio play blocked by browser", err));
    });

    // 5. Floating Music Button Control
    const musicBtn = document.getElementById('music-btn');
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.classList.remove('fa-spin');
            musicIcon.classList.replace('fa-compact-disc', 'fa-volume-xmark');
        } else {
            bgMusic.play();
            musicIcon.classList.add('fa-spin');
            musicIcon.classList.replace('fa-volume-xmark', 'fa-compact-disc');
        }
        isPlaying = !isPlaying;
    });

    // 6. Countdown Timer
    const targetDate = new Date("Dec 31, 2026 09:00:00").getTime(); // Ganti dengan tanggal pernikahan

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = `
            <div class="col-3">
                <h3 class="fw-bold mb-0">${days}</h3>
                <small>Hari</small>
            </div>
            <div class="col-3">
                <h3 class="fw-bold mb-0">${hours}</h3>
                <small>Jam</small>
            </div>
            <div class="col-3">
                <h3 class="fw-bold mb-0">${minutes}</h3>
                <small>Menit</small>
            </div>
            <div class="col-3">
                <h3 class="fw-bold mb-0">${seconds}</h3>
                <small>Detik</small>
            </div>
        `;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<h3>Acara Sedang Berlangsung</h3>";
        }
    }, 1000);
});