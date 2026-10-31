export type GallerySpan = "hero" | "wide" | "tall" | "standard";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  date: string;
  span: GallerySpan;
  chapter: number;
  chapterTitle: string;
};

const moments = [
  "Malam pertama di kota tua",
  "Lorong yang tidak kita rencanakan",
  "Kopi kedua",
  "Tepi laut, jam enam",
  "Arah yang selalu kita perdebatkan",
  "Satu lagu yang tidak selesai",
  "Pagi yang terlalu tenang",
  "Rumah, akhirnya",
  "Hujan di jendela kereta",
  "Foto yang blur tapi kita simpan",
  "Pasar pagi dan dua roti",
  "Sepatu yang basah",
  "Menunggu senja di bangku kayu",
  "Jalan yang salah, pemandangan yang tepat",
  "Teh hangat di malam dingin",
  "Tangan yang tidak pernah lepas",
  "Kota yang tidak tidur",
  "Kita dan peta yang terlipat",
  "Angin laut di rambutmu",
  "Sarapan jam sebelas",
  "Lampu jalan dan tawa kecil",
  "Menghitung bintang dari atap",
  "Foto sebelum hujan",
  "Perjalanan tanpa tujuan",
  "Kamar dengan jendela besar",
  "Kita, di antara orang asing",
  "Senja yang kita kejar",
  "Buku yang dibaca setengah",
  "Langkah di jalan berbatu",
  "Pelukan sebelum pulang",
  "Kopi tumpah dan cerita panjang",
  "Pemandangan dari kursi belakang",
  "Malam dengan lampu kuning",
  "Kita di depan cermin",
  "Hari yang tidak direncanakan",
  "Suara ombak jam tiga pagi",
  "Jalan pulang yang memutar",
  "Satu payung untuk berdua",
  "Pasar malam dan lampu warna",
  "Duduk diam, tetap nyaman",
  "Pagi di kota yang masih tidur",
  "Kita dan langit yang berubah",
  "Perjalanan kereta terakhir",
  "Sepotong kue dan dua garpu",
  "Sudut kota yang kami temukan",
  "Momen sebelum kamera mati",
  "Pelukan di tengah keramaian",
  "Kita, lagi, dan selalu",
  "Akhir pekan yang panjang",
  "Cerita yang belum selesai",
] as const;

const places = ["Bekasi"] as const;

// 8-item block fills a 4x4 desktop grid exactly. Last 2 wide items close row 25.
const spanPattern: GallerySpan[] = [
  "hero",
  "tall",
  "standard",
  "standard",
  "tall",
  "tall",
  "wide",
  "wide",
];

const chapterTitles = [
  "Orang asing",
  "Jadi kebiasaan",
  "Jalan yang salah",
  "Hari biasa",
  "Rumah sementara",
  "Belum selesai",
] as const;

export const galleryItems: GalleryItem[] = moments.map((caption, index) => {
  const year = 2026;
  const number = String(index + 1).padStart(2, "0");
  const chapterIndex = Math.min(
    chapterTitles.length - 1,
    Math.floor(index / 8)
  );

  return {
    src: `/photos/gallery-${number}.jpg`,
    alt: `Momen pasangan: ${caption}`,
    caption,
    date: `${places[index % places.length]} · ${year}`,
    span: index < 48 ? spanPattern[index % spanPattern.length] : "wide",
    chapter: chapterIndex + 1,
    chapterTitle: chapterTitles[chapterIndex],
  };
});

const chapterIntros = [
  "Semua dimulai dari obrolan yang tidak direncanakan. Dua orang asing, satu ruang yang sama, dan rasa penasaran yang tidak buru-buru.",
  "Pelan-pelan, hadirmu berubah dari kejutan menjadi kebiasaan. Kopi, chat malam, dan hal-hal kecil yang mulai kami tunggu.",
  "Kita sering salah jalan. Tapi justru di situ kami menemukan tempat, cerita, dan tawa yang tidak ada di rencana.",
  "Tidak semua momen perlu istimewa. Kadang hanya duduk berdua, makan, atau diam sambil melihat layar.",
  "Rumah ternyata bisa berubah bentuk: kamar, mobil, pantai, atau sekadar bahu tempat bersandar.",
  "Tidak ada garis akhir. Hanya halaman-halaman baru yang masih ingin kami tulis bersama.",
] as const;

export type Chapter = {
  number: number;
  title: string;
  intro: string;
  items: GalleryItem[];
};

export const chapters: Chapter[] = chapterTitles.map((title, index) => ({
  number: index + 1,
  title,
  intro: chapterIntros[index],
  items: galleryItems.filter((item) => item.chapter === index + 1),
}));
