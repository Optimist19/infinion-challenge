import Campaign from "@/components/Campaign";
import SearchAnything from "@/components/SearchAnything";

function CampaignPage() {
  return (
    <div>
      <div className="px-2">
        <SearchAnything
          search="Search"
          searchRorAnything="Search For Anything"
        />
        <Campaign />
      </div>
    </div>
  );
}

export default CampaignPage;
