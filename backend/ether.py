from web3 import HTTPProvider, Web3
from web3.exceptions import TransactionNotFound
from time import time

node_url = "https://ethereum-sepolia-rpc.publicnode.com"
web3 = Web3(HTTPProvider(node_url))

def sendTransaction(value: float, sender: str, receiver: str, privateKey: str) -> int:
    try
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
        return receipt.blockNumber

    except Exception:
        return -1

def validateTransaction(sender: str, confirmations: int, sleepTime: int = 12):
    try:
        block = web3.eth.get_block('latest', full_transactions=True)
        found = False
        value = 0
        blockNumber = 0
        hash = ""
        for tx in block.transactions:
            if tx['from'] == sender:
                value = web3.from_wei(tx['value'], 'ether')
                hash = tx['hash'].hex()
                blockNumber = tx['blockNumber']
                found = True
        if not found:
            return 1
        while web3.eth.get_transaction_receipt(hash)['blockNumber']-blockNumber<=confirmations:
            time.sleep(sleepTime)
        return value
    except TransactionNotFound:
        return 2
    except Exception:
        return 3
