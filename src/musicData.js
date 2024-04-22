// totalMusics 배열에서 무작위로 3개의 요소를 선택하는 함수
function getRandomElements(array, numElements) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}

const totalMusics = [
  {
    id: "5dHcVjj_Kq0",
    title: ["그대에게"],
    artist: "무한궤도",
    year: "1988",
  },
  {
    id: "mf1a6VfspKg",
    title: ["깊은 밤을 날아서"],
    artist: "이문세",
    year: "1995",
  },
  {
    id: "p2r64AL7knk",
    title: ["풍선", "Balloons"],
    artist: "동방신기(TVXQ!)",
    year: "2006",
  },
  {
    id: "Xw0CUGygsYw",
    title: ["훗", "Hoot"],
    artist: "소녀시대",
    year: "2011",
  },
  {
    id: "xFHAcsUXc-c",
    title: ["루시퍼", "Lucifer"],
    artist: "SHINee",
    year: "2010",
  },
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
