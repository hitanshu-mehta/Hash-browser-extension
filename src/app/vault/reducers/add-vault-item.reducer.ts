import { EncryptionKeyObj } from './../models/encryption-key';
import { VaultItem } from './../models/vault-item';
import { AddVaultItemActions, VaultApiActions } from './../actions';
import { Action, createReducer, on } from '@ngrx/store';


export interface State {
    loading: boolean;
    error: string | null;
    id: string;
    name: string;
    username: string;
    password: string | EncryptionKeyObj;
    url: string;
    createdAt: number;
    updatedAt: number;
}

const initialState: State = {
    loading: false,
    error: null,
    id: '',
    name: '',
    username: '',
    password: '',
    url: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
};

const addVaultItemReducer = createReducer(
    initialState,
    on(AddVaultItemActions.addVaultItem, (state, { vaultItem }) => ({
        ...state,
        id: vaultItem.id,
        name: vaultItem.name,
        username: vaultItem.username,
        password: vaultItem.password,
        url: vaultItem.url,
        createdAt: vaultItem.createdAt,
        updatedAt: vaultItem.updatedAt,
        loading: true
    })),
    on(VaultApiActions.addVaultItemSuccess, (state) => ({ ...state, loaded: true, loading: false })),
    on(VaultApiActions.addVaultItemFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(VaultApiActions.encryptLoginPassword, (state) => ({ ...state, loading: true })),
    on(
        VaultApiActions.encryptLoginPasswordSuccess,
        (state, { encryptionKeyObj }) => ({ ...state, password: encryptionKeyObj, loading: false })
    ),
    on(VaultApiActions.encryptLoginPasswordFailure, (state, { error }) => ({ ...state, error }))
);

export const reducer = (state: State, action: Action) => addVaultItemReducer(state, action);

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
export const getVaultItem = (state: State): VaultItem => ({
    id: state.id,
    name: state.name,
    username: state.username,
    password: state.password,
    url: state.url,
    createdAt: state.createdAt,
    updatedAt: state.updatedAt,
});
