// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = 'F8_PLAYER';

const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,

  // (1/2) Uncomment the line below to use localStorage
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: 'Sài Gòn yếu đuối biết dựa vào ai',
      singer: 'Tăng Phúc',
      path: './assets/music/y2mate.com - SÀI GÒN YẾU ĐUỐI BIẾT DỰA VÀO AI SGYDBDVA  Tăng Phúc ft Charles Huỳnh  Lyric Video.mp3',
      image: './assets/img/channels4_profile.jpg',
    },
    {
      name: 'Ai rồi cũng sẽ khác',
      singer: 'Hà nhi',
      path: './assets/music/y2mate.com - AI RỒI CŨNG SẼ KHÁC  HÀ NHI  LIVE VERSION AT GIAO LỘ THỜI GIAN.mp3',
      image: './assets/img/c5dbc8fad12e47094496041efa689f21.webp',
    },
    {
      name: 'Lâu lâu nhắc lại',
      singer: 'Hà nhi',
      path: './assets/music/y2mate.com - Hà Nhi Lâu Lâu Nhắc Lại .mp3',
      image: './assets/img/lâu lâu nhắc lại.jfif',
    },
    {
      name: 'Q.L.C',
      singer: 'MC ILL',
      path: './assets/music/y2mate.com - HƯNG CAO  QLC Prod by Jay Bach OFFICIAL MV.mp3',
      image: './assets/img/1550244125069_640.jpg',
    },
    {
      name: 'Chân ái',
      singer: 'Orange ft Khói',
      path: './assets/music/y2mate.com - CHÂN ÁI  ORANGE x KHÓI x CHÂU ĐĂNG KHOA  Official Music Video.mp3',
      image: './assets/img/chân ái.jpg',
    },
    {
      name: 'Sau này nếu có yêu ai',
      singer: 'Tăng Phúc ft Ngô Kiến Huy',
      path: './assets/music/y2mate.com - TĂNG PHÚC ft NGÔ KIẾN HUY  SAU NÀY NẾU CÓ YÊU AI Huỳnh Quốc Huy  OFFICIAL MUSIC VIDEO.mp3',
      image: './assets/img/sau này nếu có yêu ai.jpg',
    },
    {
      name: 'Dạ Vũ',
      singer: 'Tăng Duy Tân',
      path: './assets/music/y2mate.com - BAE TĂNG DUY TÂN  DẠ VŨ  Official Music Video.mp3',
      image: './assets/img/tăng duy tân.jpg',
    },
    {
      name: 'Đế Vương',
      singer: 'Đình Dũng',
      path: './assets/music/y2mate.com - ĐẾ VƯƠNG  ĐÌNH DŨNG  OFFICIAL MUSIC VIDEO.mp3',
      image: './assets/img/Đế Vương.jpg',
    },
    {
      name: 'Pháo Hồng',
      singer: 'Đạt Long Vinh',
      path: './assets/music/y2mate.com - PHÁO HỒNG  ĐẠT LONG VINH  MUSIC VIDEO LYRIC  Nụ cười ai nát lòng ngày mai em lấy chồng.mp3',
      image: './assets/img/Đạt Long Vinh.jpg',
    },
    {
      name: 'Ngày khác lạ',
      singer: 'Đen ft Giang Phạm, Triple D',
      path: './assets/music/y2mate.com - Đen  Ngay Khac La ft Giang Pham Triple D MV.mp3',
      image: './assets/img/ngày khác lạ.jpg',
    },
    {
      name: 'Mười năm',
      singer: 'Đen ft Ngọc Linh',
      path: './assets/music/y2mate.com - Đen  Mười Năm ft Ngọc Linh MV Lộn Xộn 3.mp3',
      image: './assets/img/10nam.jfif',
    },
    {
      name: 'Khác biệt to lớn',
      singer: 'Trịnh Thăng Bình ft Liz Kim Cương',
      path: './assets/music/y2mate.com - giữa chúng ta có KHÁC BIỆT TO LỚN  TRỊNH THĂNG BÌNH x LIZ KIM CƯƠNG  OFFICIAL MUSIC VIDEO.mp3',
      image: './assets/img/khacbiettolon.jpg',
    },
    {
      name: 'Âu lo',
      singer: 'JGKiD ft Đen',
      path: './assets/music/y2mate.com - Âu lo   JGKiD  Đen  lyrics.mp3',
      image: './assets/img/âu lo.jpg',
    },
    {
      name: 'Nhìn',
      singer: 'JGKiD ft Đen',
      path: './assets/music/y2mate.com - Nhìn  Đa Sắc ft Đen Mixtape Sắc Đời Lyric Video.mp3',
      image: './assets/img/nhìn.jpg',
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? 'active' : ''
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join('');
  },
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.oninput = (e) => {
      if (audio.currentTime) {
        const seekTime = ((audio.duration * e.target.value) / 100).toFixed(0);
        audio.currentTime = seekTime;
      }
    };
    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig('isRandom', _this.isRandom);
      randomBtn.classList.toggle('active', _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig('isRepeat', _this.isRepeat);
      repeatBtn.classList.toggle('active', _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest('.song:not(.active)');

      if (songNode || e.target.closest('.option')) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest('.option')) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'start',
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle('active', this.isRandom);
    repeatBtn.classList.toggle('active', this.isRepeat);
  },
};

app.start();
