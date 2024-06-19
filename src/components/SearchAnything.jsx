import { Input } from "./ui/input";
import ProfilePop from "./ProfilePop";


function SearchAnything() {
  return (
    <div>
      <nav className="py-[1vh] sm:py-[4vh] flex justify-center">
        <header className="flex items-center justify-between w-[90%]">
          <div className="flex">
            <Input
              type="text"
              placeholder="Search for anything..."
              className="mr-4 sm:w-[15vw] text-[10px]"
            />
          </div>
          <ProfilePop hasBgPic="yes"  className="" />
        </header>
      </nav>
    </div>
  );
}

export default SearchAnything;
