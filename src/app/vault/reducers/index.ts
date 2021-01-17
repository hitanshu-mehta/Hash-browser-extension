import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromVault from './vault.reducer';
import * as fromSelectedVaultItemPage from './selected-vault-Item.reducer';
import * as fromAddVaultItemPage from './add-vault-item.reducer';

export interface VaultState {
    status: fromVault.State;
    selectedVaultItemStatus: fromSelectedVaultItemPage.State;
    addVaultItemStatus: fromAddVaultItemPage.State;
}

export interface State extends fromRoot.State{
    vault: VaultState;
}

export const reducers: ActionReducerMap<
    VaultState
> = {
    status:fromVault.reducer,
    selectedVaultItemStatus: fromSelectedVaultItemPage.reducer,
    addVaultItemStatus: fromAddVaultItemPage.reducer,
};

export const selectVaultState = createFeatureSelector<State,VaultState>('vault');


// Vault 
export const selectVaultStatusState = createSelector(
    selectVaultState,
    (state: VaultState) => state.status
);

export const getVault = createSelector(
    selectVaultStatusState,
    fromVault.getVaultItems
);

export const getSelectedVaultId = createSelector(
    selectVaultStatusState,
    fromVault.getSelectedItemId
);

export const getSelectedVaultItem = createSelector(
    getVault,
    getSelectedVaultId,
    (vaultItems, id) => {
        return vaultItems.filter(v => v.id === id)[0];
    } 
)

// Select Vault Page 
export const selectVaultItemState = createSelector(
    selectVaultState,
    (state: VaultState) => state.selectedVaultItemStatus
);


// Add Vault Page 
export const addVaultItemState = createSelector(
    selectVaultState,
    (state: VaultState) => state.addVaultItemStatus
)
