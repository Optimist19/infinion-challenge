import { useState } from "react";
import SearchAnything from "./SearchAnything";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  successModalFtn
} from "@/features/campaignSlice";
import { useNavigate } from "react-router-dom";

import { MdToggleOff } from "react-icons/md";
import { MdToggleOn } from "react-icons/md";

import success from "../assets/success.png";

function NewCampaign() {
  const navigate = useNavigate();
  const { successModal } = useSelector((state) => state.campaigns);
  const dispatch = useDispatch();
  const [digestCampaignToggle, setDigestCampaignToggle] = useState(false);
  const [inputs, setInputs] = useState({
    campaignName: "",
    campaignDescription: "",
    startDate: "",
    endDate: "",
    digestCampaign: false,
    linkedKeywords: [],
    dailyDigest: "Monthly"
  });

  const [keyword, setKeyword] = useState("");

  const onChangeHandle = (event) => {
    const { name, value, type, checked } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleKeywordKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (keyword.trim() !== "") {
        setInputs((prevState) => ({
          ...prevState,
          linkedKeywords: [...prevState.linkedKeywords, keyword.trim()]
        }));
        setKeyword("");
      }
    }
  };

  const removeKeyword = (index) => {
    setInputs((prevState) => ({
      ...prevState,
      linkedKeywords: prevState.linkedKeywords.filter((_, i) => i !== index)
    }));
  };

  function handleDigestCampaign() {
    setDigestCampaignToggle(!digestCampaignToggle);
    setInputs((prevState) => ({
      ...prevState,
      digestCampaign: digestCampaignToggle
    }));
  }

  function submitFtn(e) {
    e.preventDefault();
    // console.log(inputs);
    dispatch(createCampaign(inputs)).then(() => {
      dispatch(successModalFtn());
      
    });
  }

  return (
    <div className="h-[100vh]">
      <div>
        <div className="">
          <SearchAnything />
          <form className="h-[100vh] mx-auto w-[75vw]" onSubmit={submitFtn}>
            <div className="flex flex-col gap-2">
              <div className="py-2">
                <h2 className="campaign-info font-bold sm:text-[20px] text-[15px]">
                  Create New Campaign
                </h2>
              </div>

              <div className="py-2 flex flex-col gap-1">
                <p className="text-[12px] sm:text-[14px] font-medium text-[#666666]">
                  Campaign Name
                </p>
                <Input
                  type="text"
                  placeholder="e.g The Future is now"
                  onChange={onChangeHandle}
                  value={inputs.campaignName}
                  name="campaignName"
                  className="text-[10px] sm:placeholder:text-[14px] placeholder:text-[#999999]"
                />
              </div>
              <div className="py-2">
                <div className="flex flex-col gap-1">
                  <p className="text-[12px] sm:text-[14px] font-medium text-[#666666]">
                    Campaign Description
                  </p>
                  <textarea
                    rows="4"
                    name="campaignDescription"
                    value={inputs.campaignDescription}
                    onChange={onChangeHandle}
                    placeholder="Please add a description to your campaign"
                    className="text-[10px] sm:text-[14px] font-medium text-[#999999] placeholder:pt-2 placeholder:pl-2"
                  />
                </div>
                <div className="sm:flex sm:items-center sm:justify-between py-2">
                  <div className="flex flex-col gap-1 sm:w-[20vw] cursor-pointer">
                    <p className="text-[12px] sm:text-[14px] font-medium text-[#666666] ">
                      Start Date
                    </p>
                    <Input
                      type="datetime-local"
                      name="startDate"
                      value={inputs.startDate}
                      onChange={onChangeHandle}
                      className="text-[10px] sm:text-[14px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:w-[20vw] cursor-pointer">
                    <p className="text-[12px] sm:text-[14px] font-medium text-[#666666]">
                      End Date
                    </p>
                    <Input
                      type="datetime-local"
                      name="endDate"
                      value={inputs.endDate}
                      onChange={onChangeHandle}
                      className="text-[10px] sm:text-[14px]"
                    />
                  </div>
                </div>

                <div className="flex justify-between py-2">
                  <p className="sm:text-[14px] text-[12px]  font-medium text-[#666666]">
                    Want to receive daily digest about the campaign?
                  </p>
                  <div
                    onClick={handleDigestCampaign}
                    className="text-2xl sm:text-4xl">
                    {digestCampaignToggle ? (
                      <MdToggleOn className="text-[#6E0080]" />
                    ) : (
                      <MdToggleOff className="text-[#6E0080]" />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1 py-2">
                  <p className="text-[12px] sm:text-[14px] font-medium text-[#666666]">
                    Linked Keywords
                  </p>
                  <div className="h-[12vh] pt-3 pl-3 rounded-md border border-[#F0F4F4]">
                    <div className="flex items-center gap-2">
                      {inputs.linkedKeywords.map((keyword, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "5px 10px",
                            backgroundColor: "#2c7a7b",
                            color: "#fff",
                            borderRadius: "5px"
                          }}>
                          <span>{keyword}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeKeyword(index);
                            }}
                            style={{
                              marginLeft: "10px",
                              backgroundColor: "transparent",
                              border: "none",
                              color: "#fff",
                              cursor: "pointer"
                            }}>
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <Input
                      type="text"
                      placeholder="To add keywords, type your keyword and press enter"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      onKeyDown={handleKeywordKeyDown}
                      className="input-arr text-[10px] sm:text-[14px] font-medium text-[#999999]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 py-2">
                  <p className="text-[12px] sm:text-[14px] font-medium text-[#999999]">
                    Kindly select how often you want to receive daily digest
                  </p>
                  <select
                    className="text-[10px] sm:text-[14px] py-2 border border-[#e2e8f0] rounded-md"
                    name="dailyDigest"
                    value={inputs.dailyDigest}
                    onChange={onChangeHandle}>
                    {/* <option>Monthly</option> */}
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
              </div>
              <div className="flex pt-[4vh]">
                <div className="flex gap-3">
                  <Button
                    type="reset"
                    className="text-[#247B7B] px-[3vw] py-1 bg-white border border-[#247B7B]">
                    Cancel
                  </Button>
                  <Button className="text-white bg-[#247B7B] px-5 py-1">
                    Create Campaign
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {successModal && (
        <div className="bg-modal fixed bottom-0 top-0 right-0 left-0 z-10">
          <div className="flex h-[100vh]  justify-center items-center flex-col">
            <div className=" bg-white py-[9vh] flex flex-col items-center gap-[5vh] px-[12vw] rounded-md">
              <div>
                <img src={success} alt="success-icon" />
              </div>
              <p className="text-[12px] sm:text-[14px]">
                Campaign Successfully Created!
              </p>
              <div className="flex items-center gap-3">
                <Button
                  className="px-5 py-1 bg-[#247B7B] text-white text-[12px] sm:text-[14px]"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("/campaign");
                  }}>
                  Go Back to campaign list
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewCampaign;
