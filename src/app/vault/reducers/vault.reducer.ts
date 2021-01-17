import { updateVaultItem } from './../actions/selected-vault-item.actions';
import { Action, createReducer,on } from '@ngrx/store';
import { VaultActions, VaultApiActions } from '../actions';
import { VaultItem } from './../models/vault-item';


export interface State{
    loaded: boolean;
    loading: boolean;
    currentSelectedId: string | null;
    vaultItems: VaultItem[];
}

const initialState: State = {
    loaded: false,
    loading: false,
    currentSelectedId: null,
    vaultItems: [],
};
  
const vaultReducer = createReducer(
    initialState,
    on(VaultActions.loadVault,(state)=> ({...state,loading:true})),
    on(VaultApiActions.loadVaultSuccess,(state,{vaultItems})=> ({...state,loaded:true,loading:false,vaultItems:vaultItems})),
    on(VaultApiActions.addVaultItemSuccess, (state,{vaultItem})=>({...state,vaultItems:[...state.vaultItems, vaultItem]})),
    on(VaultApiActions.removeVaultItemSuccess,(state,{vaultItem})=>({
        ...state,
        vaultItems:state.vaultItems.filter(v => v.id !== vaultItem.id
    )})),
    on(VaultApiActions.updateVaultItemSuccess,(state,{oldVaultItem,updatedVaultItem})=>{
        state.vaultItems = state.vaultItems.filter(v => v.id !== oldVaultItem.id);
        state.vaultItems.push(updatedVaultItem);
        return state;
    }),
    on(VaultActions.viewVaultItem,(state,{id})=>({...state,currentSelectedId:id}))
)

export const reducer = (state:State, action:Action) => vaultReducer(state,action);

export const getVaultItems = (state: State) => state.vaultItems;

export const getSelectedItemId = (state: State) => state.currentSelectedId;