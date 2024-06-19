import { SkeletonDemo } from "./SkeletonDemo";
import { Link } from "react-router-dom";
import {
  deleteCampaign,
  openModalAndGetDetailsFtn
} from "@/features/campaignSlice";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { getCampaigns } from "@/services/api";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import edit from "../assets/lucide_edit.png";
import del from "../assets/material-symbols_delete-outline-rounded.png";
import hide from "../assets/mdi_eye-outline.png";
import search from "../assets/ic_baseline-search.png";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import DropDownForCalender from "./DropDownForCalender";

import ReactPaginate from "react-paginate";

import moment from "moment";

function Campaign() {
  const { openDetailsModal, details } = useSelector((state) => state.campaigns);
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["campaign"],
    queryFn: getCampaigns
  });

  function delFtn(id) {
    // console.log(id, "id");
    dispatch(deleteCampaign(id)).then(() => {
      location.reload();
    });
  }

  function showDetails(id) {
    const getId = data.find((data) => data.id === id);
    dispatch(openModalAndGetDetailsFtn(getId));
  }

  return (
    <div>
      <div className="w-[95%] flex justify-center flex-col mx-auto">
        <div>
          <h2 className="text-[12px] sm:text-[14px]">All Campaigns</h2>
          <div className=" sm:flex sm:items-center sm:justify-between my-3 ">
            <div className="sm:flex sm:items-center sm:gap-3 sm:my-2  text-[14px] hidden">
              <Button className="bg-white text-color">All (90)</Button>
              <Button className="bg-white text-color">Inactive (90)</Button>
              <Button className="bg-white text-color">Active (90)</Button>
            </div>
            <div className="sm:flex sm:items-center sm:pr-[10vw] sm:gap-3 my-2">
              <div className="flex relative sm:w-[15vw] my-2">
                <Input type="text" placeholder="Search..." className="mr-4  " />
                <div className="absolute top-3 right-8">
                  <img src={search} alt="" />
                </div>
              </div>
              <div className="border border-[#e2e8f0] py-2 px-1 rounded-sm">
                <DropDownForCalender className="my-2" />
              </div>
            </div>
          </div>
        </div>

        <Table>
          <TableCaption className="sm:text-[14px] text-[12px]">
            A list of your recent campaigns.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[9px] sm:text-[12px] bold ">
                S/N
              </TableHead>
              <TableHead className="text-[9px] sm:text-[12px] bold">
                Campaign Name
              </TableHead>
              <TableHead className="text-[9px] sm:text-[12px] bold">
                Start Date
              </TableHead>
              <TableHead className="text-[9px] sm:block hidden sm:text-[12px] bold">
                Status
              </TableHead>
              <TableHead className="text-[9px] sm:text-[12px] bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <div>
                <TableRow>
                  <TableCell>
                    <SkeletonDemo />
                  </TableCell>
                  <TableCell>
                    <SkeletonDemo />
                  </TableCell>
                  <TableCell>
                    <SkeletonDemo />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center sm:gap-5 gap-2">
                      <div className="cursor-pointer">
                        <img src={hide} alt="hide-image" />
                      </div>
                      <div className="cursor-pointer">
                        <img src={edit} alt="edit-image" />
                      </div>
                      <div className="cursor-pointer">
                        <img src={del} alt="delete-image" />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </div>
            ) : (
              Array.isArray(data) &&
              data.map((campaign) => {
                return (
                  <TableRow key={campaign.id} className="text-[#666666]">
                    <TableCell className="text-[9px] sm:text-[14px] font-medium">
                      {campaign.id}.
                    </TableCell>
                    <TableCell className="text-[9px] sm:text-[14px] font-medium">
                      {campaign.campaignName}.
                    </TableCell>
                    <TableCell className="text-[9px] sm:text-[14px] font-medium">
                      {moment(campaign.startDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell
                      className={`${
                        campaign.campaignStatus === "Inactive"
                          ? "text-[#990000]"
                          : "text-[#009918]"
                      } text-[12px] font-bold sm:block hidden`}>
                      {campaign.campaignStatus}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-5">
                        <div
                          onClick={() => showDetails(campaign.id)}
                          className="cursor-pointer w-[20px]">
                          <img src={hide} alt="hide-image" />
                        </div>

                        <Link to={`/edit/${campaign.id}`}>
                          <div className="cursor-pointer [20px]">
                            <img src={edit} alt="edit-image" />
                          </div>
                        </Link>

                        <div
                          onClick={() => delFtn(campaign.id)}
                          className="cursor-pointer [20px]">
                          <img src={del} alt="delete-image" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <div className="sm:flex sm:items-center sm:justify-between ">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={15}
            marginPagesDisplayed={1}
            pageRangeDisplayed={7}
            containerClassName={"pagination flex pt-[5vh]"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            className="text-[12px] sm:text-[14px] flex"
          />
          <p className="text-[12px] sm:text-[14px] pt-2 font-medium text-center ">
            showing 10 of 40 results
          </p>
        </div>
      </div>
      {openDetailsModal && (
        <div className="bg-modal fixed bottom-0 top-0 right-0 left-0 z-10">
          <div className="flex h-[100vh]  justify-center items-center flex-col">
            <div className=" bg-white py-[9vh] flex flex-col items-center gap-[5vh] px-[12vw] rounded-md">
              <div className="text-[12px] sm:text-[14px] flex flex-col gap-1">
                <p>
                  Campaign ID:
                  <span className="font-bold  text-[#247B7B]">
                    {details.id}
                  </span>
                </p>
                <p>
                  Campaign Name:
                  <span className="font-bold  text-[#247B7B]">
                    {details.campaignName}
                  </span>
                </p>
                <p>
                  Campaign Description:
                  <span className="font-bold  text-[#247B7B]">
                    {details.campaignDescription}
                  </span>
                </p>
                <p>
                  Campaign Start Date:
                  <span className="font-bold  text-[#247B7B]">
                    {moment(details.startDate).format("DD-MM-YYYY")}
                  </span>
                </p>
                <p>
                  Campaign End Date:
                  <span className="font-bold  text-[#247B7B]">
                    {moment(details.startDate).format("DD-MM-YYYY")}
                  </span>
                </p>
                <p>
                  Campaign Digest Campaign:
                  <span className="font-bold  text-[#247B7B]">
                    {details.digestCampaign}
                  </span>
                </p>
                <div>
                  Campaign linked Keywords:
                  {details.linkedKeywords.length === 0 ? (
                    <p className="text-red-600">Null</p>
                  ) : (
                    <div>
                      {details.linkedKeywords.map((list, i) => {
                        return (
                          <ul key={i}>
                            <li>
                              <span className="font-bold  text-[#247B7B]">
                                {list}
                              </span>
                            </li>
                          </ul>
                        );
                      })}
                    </div>
                  )}
                </div>
                <p>
                  Campaign DailyDigest:
                  <span className="font-bold  text-[#247B7B]">
                    {details.dailyDigest}
                  </span>
                </p>
                <p>
                  Campaign CampaignStatus:
                  <span className="font-bold  text-[#247B7B]">
                    {details.campaignStatus}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="px-5 py-1 bg-[#247B7B] text-white text-[12px] sm:text-[14px]"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(openModalAndGetDetailsFtn());
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

export default Campaign;
