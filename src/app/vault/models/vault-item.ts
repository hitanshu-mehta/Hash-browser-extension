import { encryptionKeyObj } from './encryption-key';
export interface VaultItem {
    id: string;
    name: string;
    username: string;
    password: string | encryptionKeyObj;
    url: string;
    createdAt: number;
    updatedAt: number;
}
