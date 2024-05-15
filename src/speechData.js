function getRandomElements(array, numElements) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}

const totalQuiz = [
  {
    id: 0,
    end: 2,
    quiz: "소혜야",
    answer: "가수가 하고 싶어?",
    format: "mp4",
  },
  {
    id: 1,
    end: 2.5,
    quiz: "고갱님~",
    answer: "당황하셨어요?",
    format: "mp4",
  },
  {
    id: 2,
    end: 2.5,
    quiz: "길라임씨는",
    answer: "몇 살 때부터 그렇게 예뻤나?",
    format: "mov",
  },
  {
    id: 3,
    end: 0.8,
    quiz: "이따 5시에",
    answer: "호떡집에 불이 날 거예요",
    format: "mov",
  },

  {
    id: 4,
    end: 1,
    quiz: "괜찮아요?",
    answer: "많이 놀랬죠?",
    format: "mov",
  },
  {
    id: 5,
    end: 1.5,
    quiz: "아직 신에게는",
    answer: "12척의 배가 남아있사옵니다.",
    format: "mov",
  },
  {
    id: 6,
    end: 2,
    quiz: "나는 예쁜 척하는 게 아니라",
    answer: "그냥 예쁘게 태어난 건데",
    format: "mov",
  },
  {
    id: 7,
    end: 2.3,
    quiz: "엄청 커다란 모기가 나의 발을 물었어",
    answer: "간지러웠어",
    format: "mov",
  },
  {
    id: 8,
    end: 0.5,
    quiz: "오션월드",
    answer: "하태핫태",
    format: "mov",
  },
  {
    id: 10,
    end: 2,
    quiz: "나 꿍꼬또",
    answer: "기싱 꿍꼬또",
    format: "mov",
  },
];

const randomQuiz = getRandomElements(totalQuiz, 4);

const speech = randomQuiz.map(({ id, end, quiz, answer, format }) => ({
  id,
  end,
  quiz,
  answer,
  format,
}));
speech.push({
  id: 9,
  end: 2.5,
  quiz: "뭐지뭐지하고 물으신다면",
  answer: "대답해드리는게 인지상정",
  format: "mp4",
});

export default speech;
