import { Link, useSearchParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useEffect, useState } from 'react';
import SpellingSvg from '../components/SpellingSvg';
import LinkwithQuery from '../components/LinkwithQuery';
import { getLevelScore } from '../utils/localsession';
function SelectLevel() {
  const searchParams = useSearchParams();
  const mode = searchParams[0].get('mode');
  const lang = searchParams[0].get('lang');
  const [levels, setLevels] = useState([]);

  const [imageUrl, setImageUrl] = useState('level.png');
  const mouseEnterHandler = (e: any, level) => {
    setImageUrl('L' + level + '.png');
  };
  const mouseLeaveHandler = (e: any, level) => {
    setImageUrl('level.png');
  };
  useEffect(() => {
    if (mode == 'game' && lang == 'en') {
      (async () => {
        let levelPlayed;
        for (let i = 1; i <= 4; i++) {
          levelPlayed = i;
          if (!(await getLevelScore(`game-${i}`))) {
            break;
          }
        }
        let tempLevels = [];
        for (let i = 1; i <= levelPlayed; i++) {
          tempLevels.push(i);
        }
        setLevels(tempLevels);
      })();
    } else if (mode == 'game' && lang == 'am') {
      (async () => {
        let levelPlayed;
        for (let i = 1; i <= 4; i++) {
          levelPlayed = i;
          if (!(await getLevelScore(`game-${i}`))) {
            break;
          }
        }
        let tempLevels = [];
        for (let i = 1; i <= levelPlayed; i++) {
          tempLevels.push(i);
        }
        setLevels(tempLevels);
      })();
    } else {
      setLevels([1, 2, 3, 4]);
    }
  }, []);
  return (
    <div className="flex relative flex-col bg-[#683aff]  bg-no-repeat  bg-top h-[100vh] items-center justify-center gap-10">
      <BackButton url="/select-hand" />
      <SpellingSvg />
      <img className="absolute z-10 top-0" src={'/levels/' + imageUrl} />
      <div className="card  flex items-center z-20">
        {levels.map((item, i) => {
          return (
            <LinkwithQuery
              path={'/start-level'}
              query={`level=${item}`}
              text={`${getText(lang, mode)} ${item}`}
              ref={null}
              key={item}
              style={{
                textTransform: 'none'
              }}
              onMouseEnter={(e) => mouseEnterHandler(e, item)}
              onMouseLeave={(e) => mouseLeaveHandler(e, item)}
              className={`btn my-4 w-80 text-3xl  rounded-3xl ${
                i == 1 ? 'ml-20' : ''
              } ${
                i == 2 ? 'mr-20' : ''
              } flex items-center text-white bg-transparent hover:bg-[#fff] hover:text-[#683aff] hover:border-white border-white px-20 h-16 text-2xl text-bold`}
            />
          );
        })}
      </div>
    </div>
  );
}
function getText(lang, mode): string {
  if (lang == 'en') {
    if (mode == 'learn') {
      return 'Phase';
    } else {
      return 'Level';
    }
  } else {
    return 'ደረጃ';
  }
}

export default SelectLevel;
