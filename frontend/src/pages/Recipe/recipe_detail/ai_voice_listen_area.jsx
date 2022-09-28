import { useEffect, useState } from "react";
import { AiAreaTextWrapper } from "../styles/recipe_ai_styles";

const AiVoiceListenArea = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] = useState(true);
  const [alertAudio] = useState(new Audio("/sound/alert.wav"));
  const [alertPlay, setAlertPlay] = useState(false);
  const [talk, setTalk] = useState("듣는 중입니다...");
  useEffect(() => {
    setAlertPlay((prev) => {
      return !prev;
    });
  }, []);
  useEffect(() => {
    if (alertPlay) {
      alertAudio.load();
      alertAudio.play();
    } else {
      alertAudio.pause();
    }
  }, [alertPlay]);
  useEffect(() => {
    if (!alertPlay) {
      setDisabled(true);

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createScriptProcessor(0, 1, 1);
      setAnalyser(analyser);

      function makeSound(stream) {
        // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
        const source = audioCtx.createMediaStreamSource(stream);
        setSource(source);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
      }

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setStream(stream);
        setMedia(mediaRecorder);
        makeSound(stream);

        analyser.onaudioprocess = function (e) {
          if (e.playbackTime > 3) {
            stream.getAudioTracks().forEach(function (track) {
              track.stop();
            });
            mediaRecorder.stop();
            analyser.disconnect();
            audioCtx.createMediaStreamSource(stream).disconnect();

            mediaRecorder.ondataavailable = function (e) {
              setAudioUrl(e.data);
              setOnRec(true);
            };
            if (audioUrl) {
              URL.createObjectURL(audioUrl);
            }

            const sound = new File([audioUrl], "soundBlob", {
              lastModified: new Date().getTime(),
              type: "audio",
            });
            setDisabled(false);
            console.log(sound);
          } else {
            setOnRec(false);
          }
        };
      });
    }
  }, [alertPlay]);

  const play = () => {
    const audio = new Audio(URL.createObjectURL(audioUrl));
    audio.loop = false;
    audio.volume = 1;
    audio.play();
  };

  return (
    <>
      {/* <button onClick={onRecAudio}>녹음</button> */}
      <button onClick={play} disabled={disabled}>
        재생
      </button>
      {disabled ? <AiAreaTextWrapper>{talk}</AiAreaTextWrapper> : null}
    </>
  );
};

export default AiVoiceListenArea;
