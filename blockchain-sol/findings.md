https://github.com/adeen-s/Blockendance?tab=readme-ov-file

### E-Attendance using Blockchain, Adeen Shukla, 2018
### Copyright (c) 2018 Adeen Shukla - Released under the MIT License

Our project implements an E-Attendance system which stores student attendance data on a blockchain.

Gif of workflow

Introduction

Blockchain is the technology behind cryptocurrencies such as Bitcoin, Ethereum, Litecoin etc.

A blockchain, is a list of records, called blocks, which are linked and secured using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp and transaction data. The data, once entered in a block is immutable due to the way blockchains are designed.

This concept of immutable digital data storage can be used for storing data securely, such as student attendance, medical records, and financial transactions, to prevent tampering with this data.

Disclaimer and assumptions

This project is to be considered as a proof of concept only. As such the basic algorithm behind a blockchain is used which constructs blocks and associates them using their cryptographic hashes. A proof of work or proof of stake algorithm has not been implemented to prevent the need for higher computing resources. Unlike traditional decentralized blockchains, this blockchain works using a centralized flask server to avoid dealing with multiple nodes unnecessarily for now.

Some assumptions have been made in this project:

A teacher will enter the attendance of a class, only once for a date. Multiple lectures in a day are not supported.
Roll numbers are assumed to start from 1 for each class.
Roll numbers of students who are repeating a year, will not be available.
Objectives

Implementing blockchain for secure data storage.
Storing student attendance data along with their roll numbers in the blockchain.
Retrieval of data from the blockchain.
Web interface for insertion and retrieval of data.
Ability to check if a block has been tampered with.

HyperLedger fabric: 

https://github.com/hyperledger/fabric

https://www.ibm.com/think/topics/hyperledger

What is Hyperledger Fabric?

Hyperledger Fabric, an open source project from the Linux® Foundation, is the modular blockchain framework and has become the unofficial standard for enterprise blockchain platforms.
Intended as a foundation for developing enterprise-grade applications and industry strategies, the open, modular architecture of Hyperledger Fabric uses plug-and-play components to accommodate a wide range of use cases.

Over 120,000 organizations and 15,000 engineers are collaborating on Hyperledger Fabric. This collaboration leads to a distinctive approach to consensus, enabling performance at scale and preserving the data privacy that enterprises demand.

As the flexible blockchain framework behind the IBM Blockchain® Platform, Hyperledger Fabric is helping innovators ignite a global business transformation.

How Hyperledger Fabric works

Hyperledger Fabric is an open, enterprise-grade, distributed ledger platform. It has advanced privacy controls so you only share the data you want among the permissioned, or known, network participants.

Smart contracts document the business processes you want to automate with self-executing terms between the parties written into lines of code. The code and the agreements contained therein exist across the distributed, decentralized blockchain network. Transactions are trackable and irreversible, creating trust between organizations and enabling businesses to make more informed decisions quicker—saving time and reducing costs and risks.

Benefits of Hyperledger Fabric


Permissioned network
Establish decentralized trust in a network of known participants rather than an open network of anonymous participants.

Confidential transactions
Share only the data you want to the parties you want to share it with.

Pluggable architecture
Tailor the blockchain to industry needs with a pluggable architecture rather than a one-size-fits-all approach.

Simple to get started
Program smart contracts in the languages your team works in today, instead of learning custom languages and architectures.
Why Hyperledger Fabric is the framework under the IBM Blockchain Platform

IBM® recommends that businesses don't build a production blockchain system by using just the free open source. Along with other vendors, IBM offers commercial distributions that include tools and support.

The IBM Blockchain Platform, IBM's commercial version of Hyperledger Fabric, provides continuous support that is available all day, all week and all year round. This includes service level agreements (SLAs) for the open source solution. It comes with the most advanced set of productivity tools for building, governing and operating your blockchain system.
Hyperledger Fabric is an open source blockchain for business

Innovators in a wide range of industries are using Hyperledger Fabric. This includes sectors like finance, banking, healthcare, IoT, supply chain, manufacturing, and technology, all aiming to create open, standardized, enterprise-grade blockchain frameworks and code bases for tangible business results.

Companies part of Hyperledger: 148
Lines of code: 18.4 million

Hyperledger Fabric Explainer [https://www.youtube.com/watch?v=js3Zjxbo8TM]

### How Hyperledger Fabric Helps in Our Project
Permissioned Blockchain – Unlike public blockchains, Hyperledger Fabric is private and permissioned, meaning only verified students and admins can interact with the attendance system.
Smart Contracts (Chaincode) – We can create smart contracts that automatically record attendance when a student checks in, ensuring immutable records.
Identity Management – Fabric has a built-in certificate authority (CA) that assigns unique identities to students, preventing fake check-ins.
Geofencing & Verification – We can integrate GPS validation with Fabric's smart contracts to ensure students are inside the classroom before marking attendance.
No Cryptocurrency/Gas Fees – Unlike Ethereum, Fabric doesn’t require gas fees, making it a cost-effective solution for an attendance system.
High Throughput & Scalability – It processes transactions faster than public blockchains, making it efficient for real-time attendance tracking.
Tamper-Proof Records – Since all attendance data is stored in an immutable ledger, no one (including teachers or admins) can alter the records after they’re submitted.
Why Fabric is a Good Fit for Our Project
Private & Secure → Only authorized users (students, faculty, admin) can access data.
Scalable & Fast → Works well for large universities or institutions.
No Gas Fees → Unlike Ethereum, transactions are free within the network.
Tamper-Proof → Attendance records can’t be modified or faked.