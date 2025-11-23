from web3 import HTTPProvider, Web3
import asyncio
import time

node_url = "https://ethereum-sepolia-rpc.publicnode.com"
web3 = Web3(HTTPProvider(node_url))

def sendTransaction(value: float, sender: str, receiver: str, privateKey: str) -> str:
    try:
        transaction = {
            'from': sender,
            'to': receiver,
            'value': web3.to_wei(value, 'ether'),
            'nonce': web3.eth.get_transaction_count(sender),
            'gas': 200000,
            'maxFeePerGas': 2000000000,
            'maxPriorityFeePerGas': 1000000000,
            'chainId': web3.eth.chain_id
        }
        signed = web3.eth.account.sign_transaction(transaction, privateKey)
        tx_hash = web3.eth.send_raw_transaction(signed.raw_transaction)
        receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
        return receipt.hash.hex()

    except Exception:
        return 0

async def validateTransaction(txHash: str, confirmations: int, check_interval: int = 5, minutesToBreak: int = 10):
    startTime = time.time()
    while True:
        try:
            tx_receipt = web3.eth.get_transaction_receipt(txHash)

            # Receipt exists
            tx_block_number = tx_receipt['blockNumber']
            current_block_number = web3.eth.block_number
            currentConfirmations = current_block_number - tx_block_number + 1

            if currentConfirmations >= confirmations:
                break

        except Exception:
            if (time.time() - startTime) > minutesToBreak * 60:
                return None

        await asyncio.sleep(check_interval)

    try:
        tx = web3.eth.get_transaction(txHash)
        tx_value = web3.from_wei(tx['value'], 'ether')
        return float(tx_value)

    except Exception:
        return None
