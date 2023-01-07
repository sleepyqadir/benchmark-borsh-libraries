import { deserialize, serialize, field } from '@dao-xyz/borsh';

// Declare the Transaction class
class Transaction {
    // Declare the class properties with the @field decorator
    @field({ type: 'u32' })
    id: number;

    @field({ type: 'string' })
    sender: string;

    @field({ type: 'string' })
    recipient: string;

    @field({ type: 'u64' })
    value: number;

    // Define the class constructor
    constructor(id: number, sender: string, recipient: string, value: number) {
        // Assign the provided properties to the class instance
        this.id = id;
        this.sender = sender;
        this.recipient = recipient;
        this.value = value;
    }
}

// Define the transactionSerialize function
const transactionSerialize = (transaction: Transaction): Buffer => {
    // Use the serialize function from the @dao-xyz/borsh library to serialize the transaction
    // @ts-ignore
    return serialize(transaction);
};

// Define the transactionDeserialize function
const transactionDeserialize = (buffer: Buffer): Transaction | null => {
    try {
        // Use the deserialize function from the @dao-xyz/borsh library to deserialize the buffer
        return deserialize(buffer, Transaction, { unchecked: true }) as Transaction;
    } catch (e) {
        // If an error occurs, log the error and return null
        console.error('Deserialization error:', e);
        console.error(buffer);
        return null;
    }
};


const buffer = transactionSerialize(new Transaction(12, "0x6f", "0xd4", 100))

console.log(buffer);

const transaction = transactionDeserialize(buffer);

console.log(transaction);