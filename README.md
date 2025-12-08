# ⛓️ Decentralized Full-Stack Application (dApp)

![Ethereum](https://img.shields.io/badge/Ethereum-Solidity-black) ![React](https://img.shields.io/badge/Frontend-React.js-61DAFB) ![Hardhat](https://img.shields.io/badge/Framework-Hardhat-yellow) ![License](https://img.shields.io/badge/license-MIT-green)

A comprehensive full-stack decentralized application (dApp). This monorepo contains both the **Solidity smart contracts** (Backend) and the **React.js web interface** (Frontend), providing a complete example of how to build, deploy, and interact with the Ethereum blockchain.

---

## 📂 Repository Structure

This project is organized as a monorepo:

* **`backend/`**: Contains the blockchain logic.
    * **Contracts**: Solidity smart contracts (`.sol`).
    * **Scripts**: Deployment and interaction scripts.
    * **Tests**: Automated tests using Chai & Mocha.
* **`frontend/`**: The client-side application.
    * **React App**: Interacts with the deployed contract via Web3/Ethers.js.
    * **UI**: User interface for wallet connection and transaction handling.

---

## 🛠️ Technology Stack

| Component | Technologies |
| :--- | :--- |
| **Smart Contracts** | Solidity, Hardhat, Ethers.js, Chai (Testing) |
| **Frontend** | React.js, Web3.js / Ethers.js, CSS/Tailwind |
| **Tools** | MetaMask (Wallet), Node.js, NPM |

---

## 🚀 Getting Started

Follow this step-by-step guide to run the entire application locally.

### 1️⃣ Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14+)
* [MetaMask](https://metamask.io/) browser extension.

### 2️⃣ Backend Setup (Smart Contract)

First, we need to compile and deploy the smart contract to a local blockchain.

1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Compile the Smart Contract:**
    This generates the artifacts (ABI) needed for the frontend.
    ```bash
    npx hardhat compile
    ```

4.  **Start a Local Node:**
    This spins up a local Ethereum network (Hardhat Network) with 20 test accounts.
    ```bash
    npx hardhat node
    ```
    > ⚠️ **Keep this terminal running!** This is your local blockchain.

5.  **Deploy the Contract:**
    Open a **new terminal**, go to the `backend` folder, and run:
    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```
    ✅ **Important:** Copy the **Contract Address** printed in the terminal. You will need it shortly.

---

### 3️⃣ Frontend Setup (React Client)

Now, let's connect the frontend to our local blockchain.

1.  **Navigate to the frontend folder:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the Connection:**
    * Open `src/utils/constants.js` (or `App.js` depending on your structure).
    * Paste the **Contract Address** you copied earlier into the `contractAddress` variable.
    * *Note: The ABI is usually automatically imported from the backend artifacts folder. If not, copy the ABI JSON manually.*

4.  **Start the Web App:**
    ```bash
    npm start
    ```
    The application will run at [http://localhost:3000](http://localhost:3000).

---

### 4️⃣ How to Interact (MetaMask)

1.  Open your browser and click the **MetaMask** extension.
2.  Switch the network to **Localhost 8545**.
    * *If you don't see it, go to Settings > Networks > Add Network > RPC URL: `http://127.0.0.1:8545` > Chain ID: `31337`.*
3.  **Import a Test Account:**
    * Go back to the terminal running `npx hardhat node`.
    * Copy one of the "Private Keys" listed (Account #0 or #1).
    * In MetaMask, click the circle icon > **Import Account** > Paste the private key.
4.  Refresh the page and connect your wallet!

---

## 🧪 Running Tests

To ensure the smart contract is secure and bug-free, run the automated test suite:

```bash
cd backend
npx hardhat test
