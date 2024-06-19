import { getCampaigns } from "@/services/api";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function MarketIntelligence() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);
  
  async function getData() {
    const res = await getCampaigns();
    setData(res);
  }




  const numberOfCampaigns = data.length;

  const digestCampaignOfNo = data.filter(item => item.digestCampaign === "No");
  const totalNumberOfDigestCampaignWOfNo = digestCampaignOfNo.length;

  const digestCampaignOfYes = data.filter(item => item.digestCampaign === "Yes");
  const totalNumberOfDigestCampaignWOfYes = digestCampaignOfYes.length;

  const campaignStatusInActive = data.filter(item => item.campaignStatus === "Inactive");
  const totalNumberOfCampaignStatusInActive = campaignStatusInActive.length;

  const campaignStatusActive = data.filter(item => item.campaignStatus === "Active");
  const totalNumberOfCampaignStatusActive = campaignStatusActive.length;

  if (!Array.isArray(data)) {
    return <div>Loading...</div>;
  }
  // console.log(totalNumberOfCampaignStatusActive);

  const dataExp = [
    ["Category", "Count"],
    ["Number of Campaigns", numberOfCampaigns],
    ["Digest Campaign of No", totalNumberOfDigestCampaignWOfNo],
    ["Digest Campaign of Yes", totalNumberOfDigestCampaignWOfYes],
    ["Numbers of Inactive Campaigns", totalNumberOfCampaignStatusInActive],
    ["Numbers of Active Campaigns", totalNumberOfCampaignStatusActive],
  ];

  const options = {
    title: "Campaign Stats"
  };

  return (
    <div>
      <Chart  className="chat"
        chartType="PieChart"
        data={dataExp}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}

export default MarketIntelligence;
