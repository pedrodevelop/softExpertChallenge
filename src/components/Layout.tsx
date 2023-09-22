import GameList from "@/components/gameList";
import GameContainer from "./gameContainer";

const Layout: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-between">
      <GameList />
      <GameContainer />
      <div className="w-1/12 mt-auto mb-10">
        <p className="w-fit underline cursor-pointer">Reset all data</p>
      </div>
    </div>
  );
};

export default Layout;
