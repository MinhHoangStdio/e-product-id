import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../../types/pagination";
import { Organization } from "../../types/organizations";

interface userState {
  listOrganizations: Organization[];
  allListOrganizations: Organization[];
  pagination: Pagination | null;
  loadingListOrganizations: boolean;
  loadingRemoveOrganization: boolean;
  loadingCreateOrganization: boolean;
  loadingDetailOrganization: boolean;
  loadingRemoveMember: boolean;
  detailOrganization?: Organization;
  loadingAddMember: boolean;
}

const initialState: userState = {
  listOrganizations: [],
  allListOrganizations: [],
  pagination: null,
  loadingListOrganizations: false,
  loadingRemoveOrganization: false,
  loadingCreateOrganization: false,
  loadingDetailOrganization: false,
  loadingRemoveMember: false,
  detailOrganization: undefined,
  loadingAddMember: false,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    getListOrganizations(state, action) {
      state.loadingListOrganizations = true;
    },
    getListOrganizationsSuccess(state, action) {
      state.listOrganizations = action.payload.data;
      state.pagination = action.payload.paginate;
      state.loadingListOrganizations = false;
    },
    getListOrganizationsFailed(state) {
      state.loadingListOrganizations = false;
    },

    removeOrganization(state, action) {
      state.loadingRemoveOrganization = true;
    },
    removeOrganizationsuccess(state) {
      state.loadingRemoveOrganization = false;
    },
    removeOrganizationFailed(state) {
      state.loadingRemoveOrganization = false;
    },

    createOrganization(state, action) {
      state.loadingCreateOrganization = true;
    },
    createOrganizationsuccess(state) {
      state.loadingCreateOrganization = false;
    },
    createOrganizationFailed(state) {
      state.loadingCreateOrganization = false;
    },

    getDetailOrganization(state, action) {
      state.loadingDetailOrganization = true;
    },
    getDetailOrganizationSuccess(state, action) {
      state.detailOrganization = action.payload;
      state.loadingDetailOrganization = false;
    },
    getDetailOrganizationFailed(state) {
      state.loadingDetailOrganization = false;
    },

    removeMemberOrganizer(state, action) {
      state.loadingRemoveMember = true;
    },
    removeMemberOrganizerSuccess(state) {
      state.loadingRemoveMember = false;
    },
    removeMemberOrganizerFailed(state) {
      state.loadingRemoveMember = false;
    },

    addMember(state, action) {
      state.loadingAddMember = true;
    },
    addMemberSuccess(state) {
      state.loadingAddMember = false;
    },
    addMemberFailed(state) {
      state.loadingAddMember = false;
    },
  },
});

// Actions
export const organizationActions = organizationSlice.actions;
// Reducer
const organizationReducer = organizationSlice.reducer;
export default organizationReducer;
