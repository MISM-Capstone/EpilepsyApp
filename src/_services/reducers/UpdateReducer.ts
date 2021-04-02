import Db from "../../models/AbstractClasses/Db";
import { HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import { TrendsStackParamList } from "../../navigation/Trends/TrendsNavProps";

export type PageType = keyof HomeStackParamList | keyof TrendsStackParamList;

export type UpdateReducerState = {
    updatedObj:{
        obj: Db,
        id:number,
    } | null,
    pagesToUpdate:PageType[];
}

export const initialUpdateReducerState: UpdateReducerState = {
    updatedObj:null,
    pagesToUpdate:[],
}



export enum UPDATE_REDUCER_OPTIONS {
    setPage = "setPage",
    setObj = "setObj",
    removePage = "removePage",
}
  
type UpdateActionSetPage = {
    type:UPDATE_REDUCER_OPTIONS.setPage,
    pageToUpdate:PageType;
}

type UpdateActionSetObj = {
    type:UPDATE_REDUCER_OPTIONS.setObj,
    updatedObj:Db;
    updateId:number;
}

type UpdateActionRemovePage = {
    type:UPDATE_REDUCER_OPTIONS.removePage,
    pageToRemove:PageType;
}

type UpdateAction = UpdateActionSetPage | UpdateActionSetObj | UpdateActionRemovePage;


export default function UpdateReducer(state:UpdateReducerState, action:UpdateAction):UpdateReducerState {
    const pages = [...state.pagesToUpdate];
    switch (action.type) {
        case UPDATE_REDUCER_OPTIONS.setPage:
            const existingPage = pages.find((type) => {
                return type === action.pageToUpdate
            });
            if (!existingPage) {
                pages.push(action.pageToUpdate);                
            }
            return {
                ...state,
                updatedObj:null,
                pagesToUpdate: pages,
            };
        case UPDATE_REDUCER_OPTIONS.setObj:
            return {
                ...state,
                updatedObj: {
                    id:action.updateId,
                    obj:action.updatedObj,
                },
            };
        case UPDATE_REDUCER_OPTIONS.removePage:
            const index = pages.findIndex((type) => {
                return type === action.pageToRemove
            });
            if (index >= 0) {
                pages.splice(index, 1);
            }
            return {
                ...state,
                updatedObj:null,
                pagesToUpdate:pages,
            }
        default: {
            return state
        }
    }
}
