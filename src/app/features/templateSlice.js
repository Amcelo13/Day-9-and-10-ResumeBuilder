import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  cv_data: [],
  isLoggedIn: false,
  currentNumber: -1,
  CurrentUserId: "", //optional
  TemplateVersion: '1',
  draft_data: []
};

export const templateSlice = createSlice({
  name: "data",
  initialState,

  reducers: {
    setUsers: (state, action) => {
      // console.log(action);
      state.users.push(action.payload);
    },

    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.CurrentUserId = action.payload.id;
      state.currentNumber = action.payload.currentNumber;
    },
    setLogOut: (state, action) => {
      state.isLoggedIn = false;
      state.CurrentUserId = "";
      state.currentNumber = -1;
    },

    addCV: (state, action) => {
      state.cv_data = [...state.cv_data, action.payload];
    },

    addDraft: (state, action) => {
      state.draft_data = [...state.draft_data, action.payload];
    },

    deleteDraft: (state,action) => {
      state.draft_data = state.draft_data.filter((e) => e.id !== action.payload)
    },  

    deleteCV: (state, action) => {
      state.cv_data = state.cv_data.filter((e) => e.id !== action.payload.id);
    },

    setCurrentNumber: (state, action) => {
      state.currentNumber = action.payload;
    },
    
    setTemplateVersion: (state, action) => {
        state.TemplateVersion = action.payload
    }
  },
});
export const { addCV,addDraft, deleteCV,deleteDraft, setUsers, setCurrentNumber,setLogin, setLogOut, setTemplateVersion} =templateSlice.actions;
export default templateSlice.reducer;
