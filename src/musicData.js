// totalMusics 배열에서 무작위로 3개의 요소를 선택하는 함수
function getRandomElements(array, numElements) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}

const totalMusics = [
  {
    id: "12OHeq-qYwI",
    title: ["Gee"],
    artist: "소녀시대",
    yeart: "2009",
  },
  {
    id: "bzdsqPOJK_I",
    title: ["잔소리"],
    artist: "IU",
    year: "2010",
  },
  {
    id: "uJUzAMEeYfM",
    title: ["죽을만큼 아파서"],
    artist: "MC몽",
    year: "2010",
  },
  {
    id: "VX7w5fwdMkI",
    title: ["자니"],
    artist: "프라이머리",
    year: "2013",
  },
  {
    id: "0pWz9xztrHE",
    title: ["한여름밤의 꿀"],
    artist: "SanE,레이나",
    year: "2014",
  },
  {
    id: "6pkmAOYJt-Q",
    title: ["Cafe", "카페"],
    artist: "빅뱅",
    year: "2006",
  },
  {
    id: "NY47mqz4yCg",
    title: ["비가 오는 날엔"],
    artist: "비스트",
    year: "2011",
  },
  {
    id: "dMDouzr0OOI",
    title: ["바람났어"],
    artist: "GG(박명수, G-Dragon)",
    year: "2011",
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
