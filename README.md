# CloudLess

**CloudLess** is a decentralized file-sharing application designed to provide a secure, private, and efficient platform for storing and sharing files. Built on **P2P Pears Runtime**, it eliminates centralized storage, ensuring data privacy and security for all users.

---

```
$ git clone https://github.com/holepunchto/filesharing-react-app-example.git](https://github.com/diasqazaqbro/bed.git
$ cd bed
$ npm install 
$ pear run .
```

When a Pear app runs, it uses a local storage that's the same for all instances. To test the file sharing app, it would be good run multiple instances that looks different. To do that, use the `--store/-s` parameter for `pear`.

In one terminal:

```
$ pear run -s /tmp/fs1 .
```

In another terminal:

```
$ pear run -s /tmp/fs2 .
```

---

## Key Features

### Decentralized Architecture
CloudLess operates on a **P2P (Peer-to-Peer)** network, ensuring that no central servers store your data. Files are distributed across participating nodes, making the platform highly resilient and fault-tolerant.

### Resource Equality
- Users contribute storage equal to the amount they upload. For instance, if you upload 5GB of data, you agree to store 5GB of other users' data.

### Replication and Redundancy
- Each file chunk is replicated across multiple nodes (3-5 copies) to ensure data availability even if some nodes go offline.

### Seamless File Retrieval
- When requesting a file, chunks are located using a **Distributed Hash Table (DHT)** and downloaded in parallel from different nodes, ensuring high-speed retrieval.

### Privacy and Protection
- **End-to-End Encryption**: Files are fully encrypted, and unauthorized access is impossible without the owner's keys.
- Data stored on other users' devices is inaccessible to them, maintaining full privacy.

---

## How It Works

1. **Uploading Files**:
   - Files are split into small encrypted chunks.
   - Chunks are distributed to other nodes in the network.

2. **Storing Files**:
   - Nodes store encrypted chunks of other users' files.
   - Storage capacity is balanced; users store as much as they upload.

3. **Retrieving Files**:
   - Chunks are downloaded and reassembled into the original file.

4. **Maintaining Integrity**:
   - Regular checks verify that nodes retain the files they agreed to store.
   - Missing chunks are automatically replicated to maintain redundancy.

---

## Problems and Solutions

| **Problem**                 | **Solution**                                                                                     |
|------------------------------|-------------------------------------------------------------------------------------------------|
| Node goes offline or deletes data | File chunks are replicated on 3-5 nodes for fault tolerance.                                   |
| Slow file transfer speeds    | Parallel downloading from multiple nodes increases transfer speed.                              |
| Unauthorized data deletion   | Proof of Storage ensures nodes retain their allocated chunks.                                   |
| Limited storage on nodes     | Automatic restrictions limit file uploads based on the node's available resources.              |
| Legal risks of data storage  | All files are encrypted, and unauthorized access is impossible without the owner's decryption keys. |

---

## Technical Stack

- **Storage**: P2P
- **Backend**: REST (FastApi).
- **Frontend**: React for UI, Pear runtime for desktop.

---

## Monetization Opportunities

1. **Premium Features**:
   - Higher upload limits.
   - Faster file transfer speeds.

2. **Rewards for Storage**:
   - Users providing additional storage are rewarded with credits or internal currency.

3. **Super Nodes**:
   - Dedicated servers for guaranteed file availability, offered as a paid service.

---

## Advantages

- **Decentralized**: No single point of failure.
- **Secure**: Fully encrypted and private data storage.
- **Resilient**: High fault tolerance through chunk replication.
- **Scalable**: More users mean more storage and faster transfers.

---

CloudLess represents a revolutionary approach to file storage and sharing, combining **privacy**, **security**, and **efficiency** in a single decentralized platform. Welcome to the future of cloud storage!
