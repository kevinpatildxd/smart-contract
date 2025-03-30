import { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import { formatEther, parseEther } from "ethers";
import SupplyChainABI from "./SupplyChainABI.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed contract address

function App() {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    // Connect to MetaMask and initialize contract
    async function connectWallet() {
        if (!window.ethereum) {
            alert("MetaMask is not installed!");
            return;
        }
    
        try {
            // Create provider & signer
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();
    
            // Ensure ABI is correctly extracted
            if (!SupplyChainABI.abi || SupplyChainABI.abi.length === 0) {
                console.error("ABI is missing or incorrect.");
                alert("Contract ABI is missing or empty!");
                return;
            }
    
            // Initialize contract
            const supplyChainContract = new Contract(contractAddress, SupplyChainABI.abi, signer);
    
            // 🛠 Fix: Ensure contract is valid before logging functions
            if (!supplyChainContract || !supplyChainContract.interface) {
                console.error("Contract initialization failed!");
                alert("Error initializing contract. Check ABI and contract address.");
                return;
            }
    
            // 🛠 Fix: Use `supplyChainContract.interface.fragments` instead of `functions`
            const availableFunctions = supplyChainContract.interface.fragments
                .filter(frag => frag.type === "function")
                .map(frag => frag.name);
    
            // Debugging Logs
            console.log("Wallet connected:", userAddress);
            console.log("Contract ABI:", SupplyChainABI.abi);
            console.log("Available contract functions:", SupplyChainABI.abi.map(f => f.name));
    
            // Ensure `createProduct` exists
            if (!availableFunctions.includes("createProduct")) {
                console.error("createProduct function not found in contract!");
                alert("Contract ABI mismatch: `createProduct` function not found!");
                return;
            }
    
            // Save state
            setAccount(userAddress);
            setContract(supplyChainContract);
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert(`Failed to connect wallet: ${error.message}`);
        }
    }
    

    // Function to create a product
    async function createProduct() {
        if (!contract) {
            console.error("Error: Contract is not initialized.");
            alert("Please connect your wallet first.");
            return;
        }
    
        // Validate input fields
        if (!productName.trim()) {
            alert("Product name cannot be empty!");
            return;
        }
    
        if (!productPrice || isNaN(productPrice) || Number(productPrice) <= 0) {
            alert("Please enter a valid product price (greater than 0)");
            return;
        }
    
        try {
            // ✅ Remove `parseEther`, manually convert ETH to `uint256`
            const priceInETH = Number(productPrice); // User inputs ETH
            const priceForContract = priceInETH * 10 ** 18; // Convert to `uint256`
    
            // 🔍 Debugging: Log values before calling the contract
            console.log("Attempting to create product with values:", {
                name: productName,
                priceForContract: priceForContract, // ✅ Now a normal number
            });
    
            // ✅ Call contract with ETH value (converted manually)
            const tx = await contract.createProduct(productName, priceForContract);
            console.log("Transaction sent:", tx);
    
            await tx.wait();
            alert(`Product created successfully at ${priceInETH} ETH!`);
    
            // Clear input fields after success
            setProductName("");
            setProductPrice("");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product. Check console for details.");
        }
    }
    
    
    
    

    return (
        <div>
            <h1>Supply Chain Management</h1>
            {!account ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <p>Connected as: {account}</p>
            )}

            <div>
                <h2>Create Product</h2>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Product Price (ETH)"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    min="0.01" // Ensures minimum valid value
                    step="0.01"
                />
                <button onClick={createProduct} disabled={!contract}>Create Product</button>
            </div>
        </div>
    );
}

export default App;
