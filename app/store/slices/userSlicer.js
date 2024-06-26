import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  users: "",
  cartId: "",
  // searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],
};
const userSlices = createSlice({
  name: "addUserSlice",
  initialState,
  reducers: {
    addUser(state, action) {
      const data = {
        id: nanoid(),
        data: action.payload,
      };
      state.users = data;
    },
    addCartId(state, action) {
      console.log("add cart Id action--", action);
      const data = {
        id: nanoid(),
        data: action.payload,
      };
      state.cartId = data;
    },
    // addSearchQuery(state,action){
    //   // console.log(action)
    //   const newQuery = action.payload.trim();
    //   if (newQuery !== "" && !state.searchHistory.includes(newQuery)) {
    //     state.searchHistory.push(newQuery);
    //     if (state.searchHistory.length > 5) {
    //       state.searchHistory.shift(); // Remove the oldest item when exceeding length
    //     }
    //     localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory)); // Update localStorage
    //   }
    // },

    removeUser(state, action) {},
    deleteUsers(state, action) {},
  },
});

export default userSlices.reducer;

export const { addUser, removeUser, deleteUsers, addCartId, addProductId} =
  userSlices.actions;
