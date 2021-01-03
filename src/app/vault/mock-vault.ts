import { VaultItem } from './../model/vault-item';

export const VAULT: VaultItem[] = [
    { id: 1, name: 'instagram', username: 'hitanshu_mehta', password: '12345678', url: 'instagram.com', created_at: Date.parse('12-2-2020'), updated_at: Date.now() },
    { id: 2, name: 'google', username: 'hitu', password: 'abc12345678', url: 'google.com', created_at: Date.parse('12-2-2020'), updated_at: Date.now() },
    { id: 3, name: 'linkedin', username: 'hitanshu', password: '5678', url: 'linkedin.com', created_at: Date.parse('12-2-2020'), updated_at: Date.now() },
    { id: 4, name: 'facebook', username: 'hm', password: 'efgh', url: 'facebook.com', created_at: Date.parse('12-2-2020'), updated_at: Date.now() }
]