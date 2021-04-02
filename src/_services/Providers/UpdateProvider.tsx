import React, { useReducer, useMemo, createContext } from 'react';
import Db from '../../models/AbstractClasses/Db';
import UpdateReducer, { initialUpdateReducerState, PageType, UPDATE_REDUCER_OPTIONS } from '../reducers/UpdateReducer';


export interface UpdateProviderContext {
    hasObject:boolean;
    setPageToUpdate: (page:PageType) => void;
    setUpdateObj: (obj:Db, id:number) => void;
    getUpdatedObj: <T extends Db>(page:PageType, type: (new (...args: any[]) => T)) => {
        obj: T,
        id:number,
    } | null,
}

const UpdateContext = createContext<UpdateProviderContext>({} as UpdateProviderContext);


type AuthProviderProps = {
    children: React.ReactNode;
}

export default function UpdateProvider(props:AuthProviderProps) {
    const [state, dispatch] = useReducer(UpdateReducer, initialUpdateReducerState);

    const updateContext:UpdateProviderContext = useMemo(() => {
        const page = state.pagesToUpdate[state.pagesToUpdate.length - 1];
        return {
            hasObject:state.updatedObj?true:false,
            setPageToUpdate: (page) => {
                dispatch({type:UPDATE_REDUCER_OPTIONS.setPage, pageToUpdate:page})
            },
            setUpdateObj: (obj, id) => {
                dispatch({type:UPDATE_REDUCER_OPTIONS.setObj, updatedObj:obj, updateId:id})
            },
            getUpdatedObj: <T extends Db>(currPage:PageType, type: (new (...args: any[]) => T)) => {
                let updateObj = null;
                if (currPage === page && state.updatedObj && state.updatedObj.obj instanceof type) {
                    updateObj = {
                        obj: state.updatedObj.obj as T,
                        id: state.updatedObj.id
                    }
                    dispatch({type:UPDATE_REDUCER_OPTIONS.removePage, pageToRemove:currPage});
                }
                return updateObj;
            },
        }
    }, [state, dispatch]);

    console.log("State:", state);

    return (
        <UpdateContext.Provider value={updateContext}>
            {props.children}
        </UpdateContext.Provider>
    );
};

export function GetUpdateContext() {
    return React.useContext(UpdateContext);
}
