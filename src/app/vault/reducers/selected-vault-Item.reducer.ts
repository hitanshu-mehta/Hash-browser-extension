import { SelectedVaultItemActions } from './../actions';
import { Action, createReducer,on } from '@ngrx/store';
import { VaultItem } from './../models/vault-item';


export interface State {
    selectedVaultItemId: VaultItem
}

const initialState: State = {
    selectedVaultItemId: null
};

const selectedVaultItemReducer = createReducer(
    initialState,
)

export const reducer = (state: State, action: Action) => selectedVaultItemReducer(state,action);

