import { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpellingSvg from '../components/SpellingSvg';
import { getSessionInfo } from '../utils/localsession';

function SelectGame() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [configuration, setConfiguration] = useState<any>();
  const buttonRef = createRef<HTMLAnchorElement>();
  useEffect(() => {
    (async () => {
      setConfiguration(await getSessionInfo());
    })();
    const mouseEnterHandler = async (e: MouseEvent) => {
      setIsMouseOver(true);
    };
    const mouseLeaveHandler = async (e: MouseEvent) => {
      setIsMouseOver(false);
    };
    buttonRef.current?.addEventListener('mouseenter', mouseEnterHandler);
    buttonRef.current?.addEventListener('mouseleave', mouseLeaveHandler);

    return () => {
      buttonRef.current?.removeEventListener('mouseenter', mouseEnterHandler);
      buttonRef.current?.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  }, []);
  return (
    <div className="flex w-screen flex-col h-screen overflow-hidden items-center justify-center bg-[#683aff]  gap-1 ">
      <div className="absolute  z-0 ">
        {isMouseOver ? (
          <img src="/hover.png" width="470" height="100" />
        ) : (
          <img
            src="/inital.gif"
            className="relative -top-14  object-contain"
            style={{
              width: 700,
              height: 700
            }}
          />
        )}
      </div>
      <div className="absolute inset-x-auto inset-y-60 z-40 ">
        <SpellingSvg />
        <div className="text-[#ffe090] text-2xl text-center font-[LabilGroteskRegular sans-serif] tracking-wide leading-7">
          <p>Learn the ABC in American Sign Languge </p>
          <h1>with machine Languge</h1>
          {configuration?.level && (
            <h1 className="mt-10">
              You can continue from where you left off last time by pressing
              Resume
            </h1>
          )}

          <div className="card justify-center">
            <Link
              ref={buttonRef}
              to={`/select-hand?mode=game`}
              className={`${
                configuration?.level ? 'left-96' : 'left-56'
              } btn rounded-full w-48 h-16 absolute  inset-y-7 bg-[#FFE090] text-[#683aff] hover:bg-white text-3xl leading-8 normal-case font-normal`}
            >
              New game
            </Link>
            {configuration?.level && (
              <Link
                ref={buttonRef}
                to={`/start-level?level=${configuration?.level}&lang=${configuration?.lang}&hand=${configuration?.hand}`}
                className="btn rounded-full w-48 h-16 absolute left-28 inset-y-7 bg-[#FFE090] text-[#683aff] hover:bg-white text-3xl leading-8 normal-case font-normal"
              >
                Resume
              </Link>
            )}
            <div className="text-[14px] absolute top-32 left-28 font-[LabilGroteskRegular sans-serif] leading-5">
              <p>This game will using your webcam and machine learning to</p>
              <p>
                analyze your handshapes.Everything is processed locally and
                <p>no webcam data will be sent or stoerd anywhere</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectGame;
