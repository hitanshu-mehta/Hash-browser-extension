import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVault from './vault.reducer';
import * as fromRoot from '../../reducers';

export interface VaultState {
    vaultState: fromVault.State;
}

export interface State extends fromRoot.State {
    vault: VaultState;
}

export const reducers: ActionReducerMap<
    VaultState
> = {
    vaultState: fromVault.reducer,
};

const selectVaultState = createSelector(
    createFeatureSelector<State, VaultState>('vault'),
    (state: VaultState) => state.vaultState
);

export const getCurrentVaultId = createSelector(
    selectVaultState,
    fromVault.getCurrentId
)