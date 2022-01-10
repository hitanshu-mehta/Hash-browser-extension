import { ActionReducerMap, createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromVault from './vault.reducer';
import * as fromRoot from '../../reducers';

export interface VaultState {
  status: fromVault.State;
}

export interface State extends fromRoot.State {
  vault: VaultState;
}

export const reducers: ActionReducerMap<VaultState> = {
  status: fromVault.reducer,
};

export const selectVaultState = createFeatureSelector<State, VaultState>('vault');

export const selectVaultStateStatus = createSelector(selectVaultState, (state: VaultState) => state.status);

export const getVaultItems = createSelector(selectVaultStateStatus, fromVault.getVaultItems);

export const getCurrentVaultItem = createSelector(selectVaultStateStatus, fromVault.getCurrentVaultItem);

export const getVaultStatus = createSelector(selectVaultStateStatus, fromVault.getVaultStatus);
