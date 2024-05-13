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
    id: "as6fQ_HPTJQ",
    title: ["Fantastic Baby", "판타스틱 베이비"],
    artist: "빅뱅",
    year: "2012",
  },
  {
    id: "qJQKmu9_UrU",
    title: ["잘자요 굿나잇", "Baby good night"],
    artist: "B1A4",
    year: "2012",
  },
  {
    id: "xe7IwlLyjsI",
    title: ["내가 제일 잘 나가"],
    artist: "2NE1",
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
