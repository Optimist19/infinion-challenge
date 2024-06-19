import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    campaignName: "",
    openModal: false,
    id: "",
    successModal: false,
    openDetailsModal: false,
    details: {}
};

export const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    getCampaignNameAndId: (state, action) => {
      state.campaignName = action.payload.name
      state.id = action.payload.id
    },
    openModalFtn: (state)=>{
      state.openModal = !state.openModal
    },
    successModalFtn: (state)=>{
      state.successModal = !state.successModal
    },
    openModalAndGetDetailsFtn: (state, action)=>{
      state.openDetailsModal = !state.openDetailsModal
      state.details = action.payload
    }
  }
});

export const editCampaignFtn = createAsyncThunk(
  "campaigns/edit",
  async (data) => {
    try {
      const response = await fetch(
        "https://infinion-test-int-test.azurewebsites.net/api/Campaign/" +
          data.id,
        {
          method: "PUT",
          body: JSON.stringify({
            id: data.id,
            campaignName: data.campaignName,
            campaignDescription: data.campaignDescription,
            startDate: data.startDate,
            endDate: data.endDate,
            digestCampaign: data.digestCampaign === "yes" ? true : false,
            linkedKeywords: data.linkedKeywords,
            // campaignStatus: data.campaignName,
            dailyDigest: data.dailyDigest
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update campaign");
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteCampaign = createAsyncThunk(
  "campaigns/delete",
  async (id) => {
    try {
      const response = await fetch(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update campaign");
      }
    } catch (err) {
      console.log(err);
    }
  }
);
export const createCampaign = createAsyncThunk(
  "campaigns/delete",
  async (inputs) => {
    try {
      const response = await fetch(
        "https://infinion-test-int-test.azurewebsites.net/api/Campaign",
        {
          method: "POST",
          body: JSON.stringify({
            campaignName: inputs.campaignName,
            campaignDescription: inputs.campaignDescription,
            startDate: inputs.startDate,
            endDate: inputs.endDate,
            digestCampaign: inputs.digestCampaign,
            linkedKeywords: inputs.linkedKeywords,
            dailyDigest: inputs.dailyDigest
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update campaign");
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const { getCampaignNameAndId, openModalFtn, successModalFtn, openModalAndGetDetailsFtn } = campaignSlice.actions;

export default campaignSlice.reducer;
