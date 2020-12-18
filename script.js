// ref
let homePage, pertanyaanPage, hasilPage, allPage

// data
let nickName = ''

// global
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    runApp()
  }
};

function runApp() { // Pengambilan data di index.html
  allPage = document.getElementsByClassName('halaman')
  homePage = document.getElementById('home')
  pertanyaanPage = document.getElementById('pertanyaan')
  hasilPage = document.getElementById('hasil')
  showPage(homePage)
  setupHomePage()
}
// Untuk menampilkan page yang dipilih
function showPage(page) {
  for (const item of allPage) {
    item.style.display = 'none'
  }
  page.style.display = 'block'
}
// Untuk reset kalau sudah sampai ujung dan mau kembali lagi
function reset() {
  nickName = ''
  score = {
    int: {
      name: "int",
      score: 0,
      pos: 0,
    },
    str: {
      name: "str",
      score: 0,
      pos: 0,
    },
    agi: {
      name: "agi",
      score: 0,
      pos: 0,
    },
  };

  posCount = 1
  indexSoal = 0
}


// Home
function setupHomePage() { // Penampilan halaman awal
  const buttonStart = document.getElementById("button-start");
  buttonStart.onclick = () => {
    const nickInput = document.getElementById("nick");
    nickName = nickInput.value;
    if (nickName) {
      nickInput.value = ''
      showPage(pertanyaanPage);
      setupPertanyaanPage();
    }
  };
}

// Pertanyaan

let score = {
  int: {
    name: 'int',
    score: 0,
    pos: 0
  },
  str: {
    name: 'str',
    score: 0,
    pos: 0
  },
  agi: {
    name: 'agi',
    score: 0,
    pos: 0
  },
}

const kumpulanSoal = [
  {
    pertanyaan: "1. Posisi kesukaan kalian",
    jawaban: {
      A: {
        text: "Mid Lane",
        hasil: "int",
      },
      B: {
        text: "Safe Lane",
        hasil: "agi",
      },
      C: {
        text: "Off Lane",
        hasil: "int",
      },
    },
  },
  {
    pertanyaan: "2. Rune kesukaan kalian",
    jawaban: {
      A: {
        text: "Haste",
        hasil: "agi",
      },
      B: {
        text: "Regen",
        hasil: "str",
      },
      C: {
        text: "Arcane",
        hasil: "int",
      },
    },
  },
  {
    pertanyaan: "3. Cara main kalian",
    jawaban: {
      A: {
        text: "Ambush / Sembunyi",
        hasil: "agi",
      },
      B: {
        text: "Maju Pantang Mundur",
        hasil: "str",
      },
      C: {
        text: "Main Aman / Selow Aee",
        hasil: "int",
      },
    },
  },
  {
    pertanyaan: "4. Gaya hero kesukaan",
    jawaban: {
      A: {
        text: "Strong",
        hasil: "str",
      },
      B: {
        text: "Fast / Quickly",
        hasil: "agi",
      },
      C: {
        text: "Smart",
        hasil: "int",
      },
    },
  },
  {
    pertanyaan: "5. Cara main lainnya",
    jawaban: {
      A: {
        text: "Objektif Tower",
        hasil: "str",
      },
      B: {
        text: "Farming Terus",
        hasil: "agi",
      },
      C: {
        text: "Gaya Dulu Boss / Songong",
        hasil: "int",
      },
    },
  },
];

let buttonNext


function setupPertanyaanPage() {
  buttonNext = document.getElementById("button-next");
  susunPertanyaan(); // Untuk menampilkan soal-soal yang ada di kumpulan soal
  buttonNext.onclick = () => {
    const radios = divPilihan.getElementsByTagName("input");
    for (const radio of radios) {
      if (radio.checked) {
        tambahScore(radio.value); // Untuk menambahkan score
        if (indexSoal < kumpulanSoal.length) {
          susunPertanyaan(); // Untuk menampilkan soal-soal selanjutnya yang ada di kumpulan soal
        } else {
          showPage(hasilPage);
          setupHasilPage();
        }
      }
    }
  };
}

let posCount = 1 
// function untuk penilaian akhir
function tambahScore(hasil) {
  switch (hasil) {
    case 'str':
      score.str.score++
      if (score.str.pos === 0) {
        score.str.pos = posCount
        posCount++
      }
      break;
    case 'int':
      score.int.score++
      if (score.int.pos === 0) {
        score.int.pos = posCount
        posCount++
      }
      break;
    case 'agi':
      score.agi.score++
      if (score.agi.pos === 0) {
        score.agi.pos = posCount
        posCount++
      }
      break;
  
    default:
      break;
  }
}

let textPertanyaan, divPilihan
let indexSoal = 0

//Untuk menyusun soal di halaman page
function susunPertanyaan() {
  textPertanyaan = document.getElementById('text-pertanyaan')
  divPilihan = document.getElementById('div-pilihan')


  const soal = kumpulanSoal[indexSoal]
  textPertanyaan.innerText = soal.pertanyaan

  const jawaban = soal.jawaban

  let htmlString = ''
  for (const key in jawaban) {
    htmlString += `
<div class="pilihan">
  <input type="radio" id="${key}" name="jawaban" value="${jawaban[key].hasil}">
  <label for="${key}">${key}. ${jawaban[key].text}</label> <br>
</div>
` // default contoh pilihan jawaban
  }

  let htmlNode = new DOMParser().parseFromString(htmlString, "text/html").body // Untuk mengubah String ke DOM Node
    .childNodes;

  divPilihan.replaceChildren(...htmlNode) 
  indexSoal++
}


// Hasil

const kumpulanHasil = { //Data gambar dan nama hero
  int: [
    {
      name: "Invoker",
      link: "./asset/img/int/invoker.png",
    },
    {
      name: "Crystal Mainden",
      link: "./asset/img/int/CM.png",
    },
    {
      name: "Zeus",
      link: "./asset/img/int/zeus.png",
    },
  ],
  str: [
    {
      name: "Axe",
      link: "./asset/img/str/axe.png",
    },
    {
      name: "Dragon Knight",
      link: "./asset/img/str/DK.png",
    },
    {
      name: "Pudge",
      link: "./asset/img/str/pudge.png",
    },
  ],
  agi: [
    {
      name: "Faceless Void",
      link: "./asset/img/agi/faceless.png",
    },
    {
      name: "Juggernaut",
      link: "./asset/img/agi/jugger.png",
    },
    {
      name: "Sniper",
      link: "./asset/img/agi/sniper.png",
    },
  ],
};

let img, textHasil, buttonBackToHome
function setupHasilPage() { // Untuk menyusun konten hasil di halaman page
  img = document.getElementById("image-hasil");
  textHasil = document.getElementById('text-hasil')

  const attributes = Object.values(score).sort((a, b) => b.score - a.score) // Untuk menghandle jika ada score atribut yang sama banyak
  
  if (attributes[0].score === attributes[1].score) {
    // Untuk menghandle jika ada score atribut yang sama banyak
    if (attributes[0].pos < attributes[1].pos) {
      setResult(kumpulanHasil[attributes[0].name]);
    } else {
      setResult(kumpulanHasil[attributes[1].name]);
    }
  } else {
      setResult(kumpulanHasil[attributes[0].name]);
  }
  
  buttonBackToHome = document.getElementById("button-back-to-home");
  buttonBackToHome.onclick = () => {
    reset()
    showPage(homePage)
    setupHomePage()
  }
}

function setResult(pilihanHero) { // Untuk mencarikan konten yang akan di tampilkan di hasil
  const hero = pilihanHero[Math.floor(Math.random() * pilihanHero.length)];

  img.src = hero.link;
  textHasil.innerText = `Selamat ${nickName}! Kamu telah menemukan ${hero.name}`;
}