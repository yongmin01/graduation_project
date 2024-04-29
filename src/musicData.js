// totalMusics 배열에서 무작위로 3개의 요소를 선택하는 함수
function getRandomElements(array, numElements) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}

const totalMusics = [
  {
    id: "NrmLcwGjovc",
    title: ["21세기의 어떤 날", "Some Day in the 21century"],
    artist: "LUCY",
    yeart: "2022",
  },
  {
    id: "I1nGGToyte8",
    title: ["때려쳐"],
    artist: "DAY6",
    year: "2020",
  },
  {
    id: "Q_TzqcWKz00",
    title: ["왜요 왜요 왜"],
    artist: "플레이브",
    year: "2023",
  },
  {
    id: "hrXCP0xeoA8",
    title: ["행운을 빌어줘"],
    artist: "원필",
    year: "2022",
  },
  {
    id: "m6M6awqPPns",
    title: ["Siren"],
    artist: "RIIZE",
    year: "2024",
  },
  {
    id: "i4koWV1akZA",
    title: ["Magnetic"],
    artist: "ILLIT (아일릿)",
    year: "2024",
  },
];

// totalMusics 배열에서 무작위로 3개의 요소 선택
const randomMusics = getRandomElements(totalMusics, 5);

// musics 배열에 객체 형태로 담기
const musics = randomMusics.map(({ id, title, artist, year }) => ({
  id,
  title,
  artist,
  year,
}));

export default musics;
