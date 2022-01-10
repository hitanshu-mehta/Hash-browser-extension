import { EncryptionKeyObj } from './encryption-key';
export interface VaultItem {
  id: string;
  name: string;
  username: string;
  password: string | EncryptionKeyObj;
  url: string;
  createdAt: number;
  updatedAt: number;
}
