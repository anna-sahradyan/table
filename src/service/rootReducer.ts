import {combineReducers} from "@reduxjs/toolkit";
import tableSlice from "./slice/tableSlice.ts";

export const rootReducer = combineReducers({
    data: tableSlice

});
