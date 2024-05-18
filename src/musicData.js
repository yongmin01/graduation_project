// totalMusics 배열에서 무작위로 3개의 요소를 선택하는 함수
function getRandomElements(array, numElements) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}

const totalMusics = [
  {
    id: "vWbMDA7wjLw",
    title: ["A"],
    artist: "레인보우",
  },
  {
    id: "rjMcJHfzoIs",
    title: ["으르렁"],
    artist: "엑소",
  },
  {
    id: "ufP7vtO7hSQ",
    title: ["쏘리쏘리", "Sorry Sorry"],
    artist: "슈퍼주니어",
  },
  {
    id: "OX4MUsFRzKI",
    title: ["트윙클"],
    artist: "태티서",
  },
  {
    id: "kxk8MOEmLEk",
    title: ["200%"],
    artist: "악동뮤지션",
  },
  {
    id: "v-FvZaaLKSI",
    title: ["NoNoNo", "노노노"],
    artist: "에이핑크",
  },
  {
    id: "ubJjRXSnzFE",
    title: ["Pretty Girl", "프리티 걸"],
    artist: "카라",
  },
  {
    id: "epQBOq_WGPI",
    title: ["U Go Girl", "유고걸"],
    artist: "이효리",
  },
  {
    id: "fEEf_UzQtCo",
    title: ["Good boy", "굿보이"],
    artist: "GD X TAEYANG",
  },
  {
    id: "xEEtcrCH5To",
    title: ["낭만 고양이"],
    artist: "체리필터",
  },
  {
    id: "QS2HsYnaSXk",
    title: ["풍선"],
    artist: "동방신기(TVXQ!)",
  },

  {
    id: "prWVZFgZ3Zc",
    title: ["Cheer up", "치얼업"],
    artist: "TWICE",
  },
  {
    id: "su2zOUW6fUM",
    title: ["Something", "썸띵"],
    artist: "걸스데이",
  },
  {
    id: "_ya_ewPWt3E",
    title: ["추격자"],
    artist: "인피니트",
  },
  {
    id: "9iMFkd2yf_Y",
    title: ["Shy Boy", "샤이보이"],
    artist: "시크릿",
  },

  {
    id: "GAAaxI_svZU",
    title: ["Jackpot", "잭팟"],
    artist: "블락비",
  },

  {
    id: "5qMUzPH7Qik",
    title: ["드림하이"],
    artist: "수지, 김수현, 장우영, 택연",
  },
  {
    id: "WJCoH47PaA8",
    title: ["내 머리가 나빠서"],
    artist: "SS501",
  },
  {
    id: "-l56O00kEgM",
    title: ["까탈레나"],
    artist: "오렌지캬라멜",
  },
  {
    id: "c0t3FpVWLJ8",
    title: ["Hot Issue", "핫이슈"],
    artist: "포미닛(4MINUTE)",
  },
  {
    id: "uJUzAMEeYfM",
    title: ["죽을만큼 아파서"],
    artist: "MC 몽",
  },
  {
    id: "49aKDZNtqjc",
    title: ["10 Minutes", "텐미닛"],
    artist: "이효리",
  },
  {
    id: "p_1ypvwxiSw",
    title: ["썸"],
    artist: "소유&정기고",
  },

  {
    id: "RX0OLbxqVGw",
    title: ["나혼자"],
    artist: "씨스타",
  },
  {
    id: "9X5Kcr8hXmI",
    title: ["좋은 날"],
    artist: "IU",
  },
  {
    id: "edsYWXnR2bc",
    title: ["대박사건"],
    artist: "B.A.P",
  },
  {
    id: "OHlvBC9Sk6A",
    title: ["Bad Girl Good Girl", "배드 걸 굿 걸"],
    artist: "미쓰에이(miss A)",
  },
  {
    id: "ZlqeBArFee0",
    title: ["Roly-Poly", "롤리폴리"],
    artist: "티아라",
  },
];

// totalMusics 배열에서 무작위로 3개의 요소 선택
const randomMusics = getRandomElements(totalMusics, 5);

// musics 배열에 객체 형태로 담기
const musics = randomMusics.map(({ id, title, artist }) => ({
  id,
  title,
  artist,
}));

export default musics;
