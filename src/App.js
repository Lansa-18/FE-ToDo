import iconCheck from './images/icon-check.svg';
import iconSun from './images/icon-sun.svg';
import iconMoon from './images/icon-moon.svg';
import iconCross from './images/icon-cross.svg';

export default function App() {
  return (
    <div className="flex flex-col h-screen font-josefin">
      <article className="basis-[40%] bg-desktop-dark bg-cover">TOP</article>
      <article className="basis-[60%] bg-very-dark-blue">BOTTOM</article>

      <main className="border border-white h-2/5 w-1/3 absolute top-[20%] left-1/2 -translate-x-1/2">
        <div className='flex items-center justify-between'>
          <h1 className='text-[2rem] text-light-grayish-blue tracking-widest font-bold'>TODO</h1>
          <img className='block' src={iconSun} alt="sun"></img>
        </div>
      </main>
    </div>
  );
}

