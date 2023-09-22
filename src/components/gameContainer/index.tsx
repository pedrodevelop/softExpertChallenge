const GameContainer: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 w-9/12">
      <div className="font-bold text-5xl mb-5">Guess the color</div>
      {/* Game Info */}
      <div className="flex flex-row w-2/6">
        <div
          className="flex flex-col items-center justify-center w-2/5 h-24 rounded-l
           border-2 border-[#99a1ab] bg-[#e5e9f0] text-sm font-extrabold"
        >
          <p>REMAINING TIME (s)</p>
          <p className="my-1 text-2xl">17</p>
        </div>
        <div
          className="flex items-center justify-center w-1/5 h-24 border-y-2
          border-[#99a1ab] bg-[#aab1ba] text-xs text-white"
        >
          <p>RESTART</p>
        </div>
        <div
          className="flex flex-col w-2/5 h-24 rounded-r border-2
          border-[#99a1ab] bg-[#e5e9f0] text-sm font-extrabold"
        >
          <div
            className="flex items-center justify-between h-1/2 border-b-2
          border-[#99a1ab]"
          >
            <p className="mx-5">HIGH SCORE</p>
            <p className="mx-5 text-2xl">13</p>
          </div>
          <div className="flex items-center justify-between h-1/2">
            <p className="mx-5">SCORE</p>
            <p className="mx-5 text-2xl">12</p>
          </div>
        </div>
      </div>
      {/* Game color square */}
      <div className="flex flex-col w-2/6 h-1/2">
        <div className="h-3 w-full rounded-t bg-gray-300 ">
          <div
            style={{ width: "70%" }}
            className="h-full bg-gray-500 rounded-t"
          />
        </div>
        <div className="h-full w-full rounded-b bg-[#d3d6] " />
      </div>
      <div className="w-2/6 h-12 font-semibold">
        <button className="w-1/3 h-full rounded-l-md border-2 border-[#5e676f]">
          #FFBA5C
        </button>
        <button className="w-1/3 h-full border-y-2 border-[#5e676f]">
          #976DD0
        </button>
        <button className="w-1/3 h-full rounded-r-md border-2 border-[#5e676f]">
          #FDE0AF
        </button>
      </div>
    </div>
  );
};

export default GameContainer;
