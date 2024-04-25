import { Howl } from "howler";

function useEffectSound(src, volume = 1) {
  // 1. useEffectSound라는 함수를 선언하고, 매개변수로 src와 volume을 지정한다.
  let sound;
  // 1-1. sound라는 변수를 선언하고 값은 따로 할당하지 않는다.
  const soundEffect = (src) => {
    // 1-2. 중첩함수로 soundEffect 화살표 함수를 생성한다.
    // 1-3. 해당 함수의 매개변수는 src로 설정한다.
    sound = new Howl({ src });
    // 1-4. new howl 생성자를 만들고 sound라는 변수에 할당한다.
    sound.volume(volume);
    // 1-5. sound.volume의 매개변수는 useEffectSound의 인자인 volume과 동일하게 설정한다
  };
  soundEffect(src);
  // 1-6. useEffectSound 내부에서 soundEffect 함수를 호출한다.
  return sound;
  // 1-7. useEffectSound의 리턴값을 sound로 설정하여 soundEffect의 결과물이 sound에 할당되도록 한다.
}

export default useEffectSound;
