import { Button } from "@/components/ui/button";
import { HiOutlineLogout } from "react-icons/hi";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import not from "../assets/ic_outline-notifications.png";
import profile from "../assets/image 16.png";
import ellipse from "../assets/Ellipse 1.png";
import caret from "../assets/Vector (1).png";

function ProfilePop({ hasBgPic }) {
  
	// console.log(hasBgPic, noBgPic)



  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <div className="flex items-center sm:gap-3">
            <div className="sm:cursor-pointer sm:border-r-2 border-right-custom sm:px-1 hidden">
              <img src={not} alt="" />
            </div>
            <div className="cursor-pointer">
              <label htmlFor="profile">
              { hasBgPic === "yes" ?  <img src={ellipse} alt="" /> :
                <img src={profile} alt="" />}
              </label>
            </div>

            <Button
              variant="outline"
              id="profile"
              className="flex items-center gap-2 border-none">
              <span className="font-medium text-[14px]">BigTech </span>
              <img src={caret} alt="" />
            </Button>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="">
          <div className="flex items-center gap-2">
            <HiOutlineLogout className="text-2xl" />
            <h4 className="font-medium leading-none">Logout</h4>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProfilePop;
