// data basenya di array
  const questions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Home Tool Markup Language",
        "HyperText Markup Language",
        "Hyperlink Text Management Language",
        "High Tech Modern Language"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Which HTML element represents the main content of a page?",
      options: ["<footer>", "<aside>", "<main>", "<meta>"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "Which attribute specifies the destination of an HTML link?",
      options: ["href", "src", "alt", "class"],
      correctAnswer: 0
    },
    {
      id: 4,
      question: "What is the main purpose of the alt attribute on an image?",
      options: [
        "Set the image width",
        "Change the image color",
        "Add an animation",
        "Provide a text alternative"
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      question: "Which CSS property changes the color of text?",
      options: ["background", "color", "font-style", "border-color"],
      correctAnswer: 1
    },
    {
      id: 6,
      question: "Which CSS declaration enables a flex container?",
      options: [
        "display: flex;",
        "position: flex;",
        "layout: flex;",
        "flex: display;"
      ],
      correctAnswer: 0
    },
    {
      id: 7,
      question: "Which CSS selector targets every element with class='card'?",
      options: ["#card", "card", ".card", "*card"],
      correctAnswer: 2
    },
    {
      id: 8,
      question: "What does the JavaScript const keyword prevent?",
      options: [
        "Reading a variable",
        "Reassigning the binding",
        "Creating arrays",
        "Calling a function"
      ],
      correctAnswer: 1
    },
    {
      id: 9,
      question: "Which JavaScript method registers a click event handler?",
      options: [
        "querySelector()",
        "getAttribute()",
        "setInterval()",
        "addEventListener()"
      ],
      correctAnswer: 3
    },
    {
      id: 10,
      question: "What does array.push(value) do in JavaScript?",
      options: [
        "Adds an item to the end",
        "Removes the first item",
        "Sorts the array",
        "Creates a copy"
      ],
      correctAnswer: 0
    }
  ];

  // ambil elemen dri html
  // ID ada di html
  const halamanAwal = document.getElementById("welcome-screen");
  const halamanKuis = document.getElementById("quiz-screen");
  const halamanHasil = document.getElementById("result-screen");

  const judulAwal = document.getElementById("welcome-title");
  const teksSoal = document.getElementById("question-text");
  const nomorSoal = document.getElementById("question-counter");
  const teksProgres = document.getElementById("progress-text");
  const barProgres = document.getElementById("progress-bar");
  const isiProgres = document.getElementById("progress-fill");
  const tempatPilihan = document.getElementById("options-container");
  const tombolLanjut = document.getElementById("next-button");
  const judulHasil = document.getElementById("result-title");
  const pesanHasil = document.getElementById("result-message");
  const persenHasil = document.getElementById("score-percentage");
  const jumlahHasil = document.getElementById("score-count");

  // variable nyimpen isi quis
  let halamanAktif = "welcome";
  let indeksSoal = 0;
  let jawabanDipilih = null;
  let jumlahBenar = 0;

  const hurufPilihan = ["A", "B", "C", "D"];

  // nampilin halaman tertentu
  function tampilkanHalaman(namaHalaman) {
    // di hidden semua dulu
    halamanAwal.hidden = true;
    halamanKuis.hidden = true;
    halamanHasil.hidden = true;

    // tampilin ke layar yang di minta
    if (namaHalaman === "welcome") {
      halamanAwal.hidden = false;
    } else if (namaHalaman === "quiz") {
      halamanKuis.hidden = false;
    } else if (namaHalaman === "result") {
      halamanHasil.hidden = false;
    }

    halamanAktif = namaHalaman;
  }

  // mulai quis
  function mulaiKuis() {
    indeksSoal = 0;
    jawabanDipilih = null;
    jumlahBenar = 0;

    tampilkanHalaman("quiz");
    tampilkanSoal();
  }

  // nampilin soal dan jawan
  function tampilkanSoal() {
    const soal = questions[indeksSoal];
    const urutan = indeksSoal + 1;
    const progres = Math.round((urutan / questions.length) * 100);

    // Setiap soal baru dimulai tanpa jawaban yang dipilih.
    jawabanDipilih = null;
    tombolLanjut.disabled = true;

    // Ubah teks pertanyaan dan progress bar.
    teksSoal.textContent = soal.question;
    nomorSoal.textContent = "Question " + urutan + " of " + questions.length;
    teksProgres.textContent = progres + "%";
    isiProgres.style.width = progres + "%";
    barProgres.setAttribute("aria-valuenow", progres);
    barProgres.setAttribute("aria-valuetext", "Question " + urutan + " of " + questions.length);

    // Hapus pilihan dari soal sebelumnya.
    tempatPilihan.replaceChildren();

    // Buat tombol A, B, C, dan D satu per satu.
    for (let i = 0; i < soal.options.length; i++) {
      const tombol = document.createElement("button");
      tombol.type = "button";
      tombol.className = "option";
      tombol.setAttribute("aria-pressed", "false");

      // Kotak huruf A/B/C/D, sesuai CSS sebelumnya.
      const huruf = document.createElement("span");
      huruf.className = "option-letter";
      huruf.textContent = hurufPilihan[i];
      huruf.setAttribute("aria-hidden", "true");

      // Teks pilihan jawaban.
      const isiJawaban = document.createElement("span");
      isiJawaban.className = "option-text";
      isiJawaban.textContent = soal.options[i];

      // Lingkaran kecil untuk penanda jawaban terpilih.
      const tanda = document.createElement("span");
      tanda.className = "option-mark";
      tanda.setAttribute("aria-hidden", "true");

      tombol.appendChild(huruf);
      tombol.appendChild(isiJawaban);
      tombol.appendChild(tanda);

      // Jika tombol ini diklik, simpan indeks pilihannya.
      tombol.addEventListener("click", function () {
        pilihJawaban(i);
      });

      tempatPilihan.appendChild(tombol);
    }

    // Pada soal terakhir, ubah tulisan tombol Next.
    if (urutan === questions.length) {
      tombolLanjut.textContent = "See Results →";
    } else {
      tombolLanjut.textContent = "Next Question →";
    }

    teksSoal.focus();
  }

  // 7. MEMILIH JAWABAN
  function pilihJawaban(indeksPilihan) {
    if (halamanAktif !== "quiz") {
      return;
    }

    jawabanDipilih = indeksPilihan;

    // Ambil semua tombol jawaban yang sedang tampil.
    const semuaTombol = tempatPilihan.querySelectorAll(".option");

    for (let i = 0; i < semuaTombol.length; i++) {
      // Hapus tanda pilihan lama dari semua tombol.
      semuaTombol[i].classList.remove("is-selected");
      semuaTombol[i].setAttribute("aria-pressed", "false");
    }

    // Berikan warna pilihan pada tombol yang dipilih.
    semuaTombol[indeksPilihan].classList.add("is-selected");
    semuaTombol[indeksPilihan].setAttribute("aria-pressed", "true");

    // Pengguna sudah memilih jawaban, jadi Next boleh diklik.
    tombolLanjut.disabled = false;
  }

  // pindah soal
  function lanjutSoal() {
    // Jangan lanjut kalau pengguna belum memilih jawaban.
    if (halamanAktif !== "quiz" || jawabanDipilih === null) {
      return;
    }

    // Bandingkan pilihan pengguna dengan jawaban benar.
    if (jawabanDipilih === questions[indeksSoal].correctAnswer) {
      jumlahBenar++;
    }

    // Kalau sudah soal terakhir, langsung tampilkan hasil.
    if (indeksSoal === questions.length - 1) {
      tampilkanHasil();
    } else {
      // Kalau masih ada soal, pindah ke soal berikutnya.
      indeksSoal++;
      tampilkanSoal();
    }
  }

  // ngitung dan nampilin hasil
  function tampilkanHasil() {
    const nilai = Math.round((jumlahBenar / questions.length) * 100);
    let pesan = "";

    if (nilai >= 80) {
      pesan = "Excellent!";
    } else if (nilai >= 60) {
      pesan = "Good Job!";
    } else {
      pesan = "Keep Learning!";
    }

    persenHasil.textContent = nilai + "%";
    jumlahHasil.textContent = jumlahBenar + " / " + questions.length + " correct answers";
    pesanHasil.textContent = pesan;

    tampilkanHalaman("result");
    judulHasil.focus();
  }

  // mengulang dari awa
  function ulangKuis() {
    indeksSoal = 0;
    jawabanDipilih = null;
    jumlahBenar = 0;

    tampilkanHalaman("welcome");
    judulAwal.focus();
  }

  // MENGHUBUNGKAN TOMBOL HTML DENGAN FUNGSI JAVASCRIPT
  // Event listener ini cukup dibuat sekali saat halaman dibuka.
  document.getElementById("start-button").addEventListener("click", mulaiKuis);
  tombolLanjut.addEventListener("click", lanjutSoal);
  document.getElementById("restart-button").addEventListener("click", ulangKuis);
