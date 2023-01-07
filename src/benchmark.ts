import B from 'benchmark';

// Import all the required node classes
import { AnchorNode } from './libs/anchor';
import { SerumNode } from './libs/serum';
import { NearNode, nearDeserialize, nearSerialize } from './libs/near';
import { DaoNode, daoDeserialize, daoSerialize } from './libs/dao';
import { MetaNode, metaDeserialize, metaSerialize } from './libs/metaplex';

// Import the NodeProperties interface
import { NodeProperties } from './interfaces/NodeProperties';

// Declare a transaction object with the required properties
const transaction: NodeProperties = {
    id: 121,
    data: 'metadata',
    idHash: new Uint8Array(32).fill(0),
};

// Initialize all the required node instances with the transaction object
const anchorNodeInstance = new AnchorNode(transaction);
const daoNodeInstance = new DaoNode(transaction);
const metaNodeInstance = new MetaNode(transaction.id, transaction.data, transaction.idHash);
const nearNodeInstance = new NearNode(transaction);
const serumNodeInstance = new SerumNode(transaction);

// Initialize a new benchmark suite
const desrializeSuite = new B.Suite("Deserialize");
const serializeSuite = new B.Suite("serialize");

// Add all the benchmark tests to the suite
desrializeSuite
    .add('Dao XYZ Borsh', () => {
        daoDeserialize(daoSerialize(daoNodeInstance));
    })
    .add('Project Serum Borsh', () => {
        serumNodeInstance.deserialize(serumNodeInstance.serialize());
    })
    .add('Anchor Coral Borsh', () => {
        anchorNodeInstance.deserialize(anchorNodeInstance.serialize());
    })
    .add('Metaplex Borsh', () => {
        // @ts-ignore
        metaDeserialize(metaSerialize(metaNodeInstance)[0]);
    })
    .add('Near Borsh', () => {
        nearDeserialize(nearSerialize(nearNodeInstance));
    })
    // Log the name of each test as it completes
    .on('cycle', (event: any) => {
        console.log(String(event.target) + "\n");
    })
    // Log the name of the fastest test when all tests have completed
    .on('complete', function () {
        // @ts-ignore
        console.log(`Fastest is ${this.filter('fastest').map('name')} in deserialization\n`);
    })
    // Run the suite
    .run();

// Add all the benchmark tests to the suite
serializeSuite
    .add('Dao XYZ Borsh', () => {
        daoSerialize(daoNodeInstance)
    })
    .add('Project Serum Borsh', () => {
        serumNodeInstance.serialize()
    })
    .add('Anchor Coral Borsh', () => {
        anchorNodeInstance.serialize()
    })
    .add('Metaplex Borsh', () => {
        // @ts-ignore
        metaSerialize(metaNodeInstance)
    })
    .add('Near Borsh', () => {
        nearSerialize(nearNodeInstance)
    })
    // Log the name of each test as it completes
    .on('cycle', (event: any) => {
        console.log(String(event.target) + "\n");
    })
    // Log the name of the fastest test when all tests have completed
    .on('complete', function () {
        // @ts-ignore
        console.log(`Fastest is ${this.filter('fastest').map('name')} in serialization`);
    })
    // Run the suite
    .run();