export interface MasterPasswordObj {
    encryptionKey:string;
    encryptionKeyIv:string;
    masterKeySalt:string; 
    masterKeyHash:string;
}

export interface MasterKeyObj {
    masterKeySalt:string;
    masterKeyHash:string;
}
