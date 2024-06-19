import { Link } from "react-router-dom";

import { Input } from "./ui/input";
import { Button } from "./ui/button";


import ProfilePop from "./ProfilePop";

import caret from "../assets/Vector (1).png";

import search from "../assets/ic_baseline-search.png";
import exportfile from "../assets/uil_export.png";
import date from "../assets/material-symbols_date-range-outline-rounded.png";
import empty from "../assets/empty-RBIL0twm1B.png";
import add from "../assets/material-symbols_add.png";

import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;




function OverView() {
  //   const a = useSelector(state => state.campaigns)

  return (
    
    <div className="">
      <nav className="py-[4vh] flex justify-center">
        <header className="flex justify-between w-[90%]">
          <div className="flex relative">
            <Input type="text" placeholder="Search..." className="mr-4  " />
            <div className="absolute top-3 right-8">
              <img src={search} alt="" />
            </div>
          </div>
          <ProfilePop className="float-right" />
        </header>
      </nav>

      <div>
        <div className="lg:flex lg:gap-3 py-[3vh] flex justify-center px-[4vw]">
          <div className="lg:flex lg:justify-between w-[90%] mx-">
            <h2 className="text-[24px] text-[#247B7B] font-bold text-center">
              Overview
            </h2>
            <div className="lg:flex lg:items-center lg:relative lg:gap-2">
              <div className="my-2 flex items-center gap-1 lg:border-r-2 lg:border-right-custom lg:px-1 lg:mr-2">
                <div>
                  <img src={date} alt="" className="" />
                </div>
                <p>Date Range</p>
              </div>
              <Space direction="vertical" size={12} className="my-2">
                <RangePicker />
              </Space>
              <div className="hidden">
                <img src={caret} alt="" />
              </div>
            </div>
          </div>
          <div className="flex  items-center gap-1 lg:bg-[#F0F4F4] lg:px-8 rounded-md my-2">
            <div>
              <img src={exportfile} alt="" />
            </div>
            <p className="text-[14px] font-semibold text-[#247B7B]">Export</p>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="flex lg:justify-center items-center flex-col gap-6 pt-9">
          <div>
            <img src={empty} alt="" className="" />
          </div>
          <p className="text-[14px] text-center">
            No activity yet. Create anew campaign to get started
          </p>
          <Link to="/add-campaign">
            <Button className="bg-[#247B7B]">
              <img src={add} alt="" />
              <span className="text-[15px] font-semibold">New Campaign</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default OverView;
