import { AddVaultItemActions, VaultApiActions } from './../actions';
import { Action, createReducer,on } from '@ngrx/store';


export interface State {
    loading: boolean;
    loaded: boolean;
    error: string | null;
}

const initialState: State = {
    loading: false,
    loaded: false,
    error : null,
};

const addVaultItemReducer = createReducer(
    initialState,
    on(AddVaultItemActions.addVaultItem,(state)=>({...state,loaded:false,loading:true})),
    on(VaultApiActions.addVaultItemSuccess,(state)=>({...state,loaded:true,loading:false})),
    on(VaultApiActions.addVaultItemFailure,(state,{error})=>({...state,error}))
);

export const reducer = (state: State, action: Action) => addVaultItemReducer(state,action);

export const getError = (state: State) => state.error;
export const getLoaded = (state: State) => state.loaded;
