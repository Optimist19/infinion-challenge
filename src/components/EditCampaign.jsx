
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getCampaignById } from "@/services/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editCampaignFtn,
  getCampaignNameAndId,
  openModalFtn
} from "@/features/campaignSlice";

import vector2 from "../assets/Vector (2).png";

import SearchAnything from "./SearchAnything";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
function EditCampaign() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const data = useLoaderData();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    campaignName: data.campaignName,
    startDate: data.startDate,
    endDate: data.endDate,
    digestCampaign: data.digestCampaign,
    linkedKeywords: data.linkedKeywords,
    dailyDigest: data.dailyDigest,
    campaignStatus: data.campaignName,
    campaignDescription: data.campaignDescription //We are not using this in this component, but will be useful for PUT, as it rewuires it for the data to be sent.
  });

  useEffect(() => {
    getName();
  }, []);


  function getName() {
    const nameAndId = {
      name: data.campaignName,
      id: params.id
    };
    dispatch(getCampaignNameAndId(nameAndId));
  }

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function submitFtn(e) {
    e.preventDefault();
    // console.log(inputs);
    const data = { ...inputs, id: params.id };
    dispatch(editCampaignFtn(data)).then(() => {
      navigate("/campaign");
    });
  }


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

  const style = {
    color: data.campaignStatus === "Inactive" ? "red" : "rgb(0,153,24)"
  };

  return (
    <div className="h-[100vh]">
      <div className="">
        <SearchAnything />
        <form className="h-[100vh] mx-auto w-[75vw] px-3" onSubmit={submitFtn}>
          <Link to="/">
            <div className="flex items-center gap-3 py-2">
              <img src={vector2} alt="" />
              <p className="text-[11px] sm:text-[16px] text-[#333333] font-semibold">Back</p>
            </div>
          </Link>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between py-2">
              <h2 className=" font-semibold text-[#247B7B] text-[15px] sm:text-[20px]">
                Campaign Information
              </h2>

              <div className="bg-[#DDD9D9] px-2 rounded-md py-2 text-[10px] sm:text-[14px]">
                Campaign Status <span className="text-[#373636] sm:pl-2">|</span>
                <span style={style} className="sm:pl-2 font-bold">
                  {data.campaignStatus}
                </span>
              </div>
            </div>

            <div className="py-2 flex flex-col gap-1">
              <p className="text-[#666666] text-[11px] sm:text-[14px] font-medium">Campaign Name</p>
              <Input
                type="text"
                placeholder="Fidelity Bank"
                onChange={onChangeHandle}
                value={inputs.campaignName}
                name="campaignName"
                className="placeholder:font-medium placeholder:text-[#999999] text-[10px] sm:text-[14px]"
              />
            </div>
            <div className="sm:flex sm:items-center sm:justify-between py-2">
              <div className="flex flex-col gap-1">
                <p className="font-medium text-[#999999] text-[12px] sm:text-[14px]">Start Date</p>
                <Input
                  type="datetime-local"
                  name="startDate"
                  value={inputs.startDate}
                  onChange={onChangeHandle}
                  className="text-[10px] sm:text-[14px]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium text-[#666666] text-[12px] sm:text-[14px]">End Date</p>
                <Input
                  type="datetime-local"
                  name="endDate"
                  value={inputs.endDate}
                  onChange={onChangeHandle}
                  className="text-[10px] sm:text-[14px]"
                />
              </div>
            </div>


            <div className="flex flex-col gap-1 py-2">
                  <p  className="text-[12px] sm:text-[14px] font-medium text-[#666666]">Linked Keywords</p>
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
              <p className="font-medium text-[#666666] text-[12px] sm:text-[14px]">Want to receive daily digest about the campaign?</p>
              <select
                className="py-2 border border-[#e2e8f0] rounded-md text-[10px] sm:text-[14px]"
                name="digestCampaign"
                value={inputs.digestCampaign}
                onChange={onChangeHandle}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 py-2">
              <p className="font-medium text-[#666666] text-[12px] sm:text-[14px]">Kindly select the time you want to receive daily digest</p>
              <select
                className="py-2 border border-[#e2e8f0] rounded-md text-[10px] sm:text-[14px]"
                name="dailyDigest"
                value={inputs.dailyDigest}
                onChange={onChangeHandle}>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
          <div className="flex pt-[4vh] py-3">
            <div className="flex gap-3">
              <Button
                className="bg-[#990000] px-5 py-1 font-semibold  text-[12px] sm:text-[14px]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(openModalFtn());
                }}>
                Stop Campaign
              </Button>
              <Button className="text-[#009918] bg-white border border-[#009918] px-5 py-1 font-semibold  text-[12px] sm:text-[14px]">
                Edit Information
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
}

export async function loader(params) {
  // console.log(params.params.id)

  const data = await getCampaignById(params.params.id);
  return data;
}

export default EditCampaign;
