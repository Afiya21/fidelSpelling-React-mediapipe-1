import { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpellingSvg from '../components/SpellingSvg';
import { getSessionInfo } from '../utils/localsession';

function InitialPage() {
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
              style={{
                textTransform: 'none'
              }}
              to={`/select-game`}
              className="btn my-2 h-14 hover:bg-white hover:text-[#683aff] rounded-3xl text-xl border-none text-white px-20 bg-[#683aff]"
            >
              Game Mode
            </Link>

            <Link
              style={{
                textTransform: 'none'
              }}
              to={`/select-hand?mode=learn`}
              className="btn my-2 h-14 text-xl hover:bg-white  hover:text-[#683aff] rounded-3xl bg-[#683aff] border-none px-20 text-white"
            >
              Learn Mode
            </Link>

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

export default InitialPage;
