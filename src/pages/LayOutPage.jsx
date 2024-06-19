import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

import vector from "../assets/Vector.png";
import logo from "../assets/arcticons_google-messages.png";
import add from "../assets/material-symbols_add.png";
import campaign from "../assets/material-symbols_campaign-outline.png";
import dashboard from "../assets/ri_dashboard-2-line.png";
import idea from "../assets/fluent-mdl2_insights.png";
import settings from "../assets/ep_setting.png";

import { GiHamburgerMenu } from "react-icons/gi";
import { GiCancel } from "react-icons/gi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCampaign, openModalFtn } from "@/features/campaignSlice";

function LayOutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const { id, campaignName, openModal } = useSelector(
    (state) => state.campaigns
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (event) => {
      if (event.matches) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    if (mediaQuery.matches) {
      setCollapsed(true);
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const style = {
    display: collapsed ? "none" : "block"
  };

  // console.log(id, campaignName, openModal)

  return (
    <div>
      <nav>
        <div style={{ display: "flex", height: "100vh" }} className="relative">
          <Sidebar collapsed={collapsed} className="">
            <div className="absolute right-3 top-2">
              <button
                className="sb-button hide"
                onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? (
                  <GiHamburgerMenu className="text-xl text-[#247B7B]" />
                ) : (
                  <GiCancel className="text-xl text-[#247B7B]" />
                )}
              </button>
            </div>

            <Menu className=" flex justify-center">
              <nav className=" pt-3 pb-[6vh]">
                <header className="flex  px-5 gap-5">
                  <div className="">
                    <img src={logo} alt="the site's logo" className="full" />
                  </div>
                  <h1
                    className="text-[32px] text-[#3B247B] font-bold"
                    style={style}>
                    Scrutz
                  </h1>
                </header>
              </nav>
              <ul>
                <MenuItem className="py-2">
                  <Link to="/add-campaign">
                    <li className=" bg-[#247B7B] flex items-center  gap-2 py-2 rounded-md  px-5 ">
                      <div className="w-[15px]">
                        <img src={add} alt="icon add" className="w-full" />
                      </div>
                      <p style={style} className="text-[14px] font-semibold">
                        New Campaign
                      </p>
                    </li>
                  </Link>
                </MenuItem>
                <Link to="/">
                  <MenuItem className="py-2">
                    <li className=" flex items-center  gap-2 py-2 px-5 rounded-md">
                      <div className="sm:w-[20px] w-[15px]">
                        <img
                          src={dashboard}
                          alt="dashboard icon"
                          className="w-full"
                        />
                      </div>
                      <p className="text-[14px] font-medium" style={style}>
                        Overview
                      </p>
                    </li>
                  </MenuItem>
                </Link>
                <Link activeClassName="active" to="/campaign">
                  <MenuItem className="py-2">
                    <li className=" flex  px-5 items-center  gap-2 py-2 rounded-md">
                      <div className="sm:w-[20px] w-[15px]">
                        <img
                          src={campaign}
                          alt="campaign icon"
                          className="w-full"
                        />
                      </div>
                      <p style={style} className="text-[14px] font-medium">
                        Campaign
                      </p>
                    </li>
                  </MenuItem>
                </Link>
                <Link to="/stats">
                  <MenuItem className="py-2">
                    <li className=" flex items-center  px-5 gap-2 py-2 rounded-md">
                      <div className="sm:w-[20px] w-[15px]">
                        <img src={idea} alt="idea icon" className="w-full" />
                      </div>
                      <p className="text-[14px] font-medium" style={style}>
                        Market Intelligence
                      </p>
                    </li>
                  </MenuItem>
                </Link>
                <MenuItem className="py-2">
                  <li className=" flex items-center  px-5 gap-2 py-2 rounded-md">
                    <div className="sm:w-[20px] w-[15px]">
                      <img
                        src={settings}
                        alt="settings icon"
                        className="w-full"
                      />
                    </div>
                    <p className="text-[14px] font-medium" style={style}>
                      Account Settings
                    </p>
                  </li>
                </MenuItem>
              </ul>
              {collapsed ? (
                <div className="fixed right-4 bottom-3">
                  <div>
                    <FaRegQuestionCircle className="text-5xl text-red-500" />
                  </div>
                </div>
              ) : (
                <div className="pt-[10vh]">
                  <div className="px-2">
                    <div className=" flex justify-center items-center flex-col gap-2 bg-[#FFFFFF] py-5 rounded-md">
                      <div className="w-[1.602vw]">
                        <img
                          src={vector}
                          alt="help-question-mark"
                          className="w-[full]"
                        />
                      </div>
                      <p className="text-[14px] need-help">Need help?</p>
                      <p className="text-center text-[12px]">
                        We&apos;re readily available to <br /> provide help
                      </p>
                      <Button className=" bg-white text-[#247B7B] text-center text-[12px] font-semibold mt-1 border border-[#247B7B]">
                        Get help
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Menu>
          </Sidebar>
          <main className="w-full px-2">
            <Outlet />
          </main>
        </div>
      </nav>
      {openModal && (
        <div className="bg-modal fixed bottom-0 top-0 right-0 left-0 z-10">
          <div className="flex h-[100vh]  justify-center items-center flex-col">
            <div className=" bg-white py-[9vh] flex flex-col rounded-md items-center gap-[5vh] px-[12vw]">
              <h3 className="text-[13px] sm:text-[14px]">Stop Campaign</h3>
              <div>
                <p className="text-[12px] sm:text-[14px]">
                  Are You sure you want to delete{" "}
                  <span className="uppercase font-bold text-red-800">
                    {campaignName}
                  </span>
                  ?
                </p>
                <p className="text-[12px] sm:text-[14px]">
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="px-7 py-1 border border-black bg-white text-black text-[12px] sm:text-[14px] rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(openModalFtn());
                  }}>
                  Cancel
                </Button>
                <Button
                  className="px-3 py-1 bg-[#990000] text-white text-[12px] sm:text-[14px]"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(deleteCampaign(id)).then(() => {
                      dispatch(openModalFtn());
                      navigate("/campaign");
                    });
                  }}>
                  Delete Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LayOutPage;
