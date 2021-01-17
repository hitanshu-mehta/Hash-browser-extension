import { VaultItem } from './models/vault-item';

export const VAULT: VaultItem[] = [
    {
        id: "1",
        name: 'instagram',
        username: 'hitanshu_mehta',
        password: '12345678',
        url: 'instagram.com',
        createdAt: Date.parse('12-2-2020'),
        updatedAt: Date.now()
    },
    {
        id: "2",
        name: 'google',
        username: 'hitu',
        password: 'abc12345678',
        url: 'google.com',
        createdAt: Date.parse('12-2-2020'),
        updatedAt: Date.now()
    },
    {
        id: "3",
        name: 'linkedin',
        username: 'hitanshu',
        password: '5678',
        url: 'linkedin.com',
        createdAt: Date.parse('12-2-2020'),
        updatedAt: Date.now()
    },
    {
        id: "4",
        name: 'facebook',
        username: 'hm',
        password: 'efgh',
        url: 'facebook.com',
        createdAt: Date.parse('12-2-2020'),
        updatedAt: Date.now()
    }
];
