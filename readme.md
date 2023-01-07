# Benchmarking the Borsh Libraries for Serialization and Deserialization

This project compares the performance of the following Borsh libraries for serializing and deserializing data structures:

- `@coral-xyz/borsh`: a Borsh library developed by Coral XYZ.
- `@dao-xyz/borsh`: a Borsh library developed by DAO XYZ.
- `@metaplex-foundation/beet`: a Borsh library developed by Metaplex Foundation.
- `@project-serum/borsh`: a Borsh library developed by Project Serum.
- `borsh`: the core Borsh library by Near.

## Prerequisites

- Node.js
- npm (comes with Node.js)
- ts-node (`npm install -g ts-node`)

## Installation

1. Clone the repository: `git clone https://github.com/<your-username>/benchmark-borsh-libraries.git`
2. Navigate to the project directory: `cd benchmark-borsh-libraries`
3. Install the dependencies: `npm install`

## Libraries

Navigate to the libraries subdirectory `cd src/libs`

## Samples/Examples

To see samples/examples implemented using different borsh libraries navigate to the subdirectory: `cd src/samples`

## Testing
This project uses the Jest testing framework.

1. Run the benchmarks: `npm run test`
2. The results of the tests will be logged

## Running the Benchmarks

1. Run the benchmarks: `npm run benchmark`
2. The results of the benchmarks will be printed to the console.

## Benchmark Results

Below are the results of running the benchmarks for the transaction example struct on a machine with the following specs:

`Processor: Intel Core i7‑8557U` \
`Memory: 16GB DDR4` \
`Storage: 512GB NVMe SSD` 

**Transaction Struct:**

```typescript
{
	id: u32,
	data: string,
	idHash: Uint8Array(32)
}

```

### Deserialization:

**@dao-xyz/borsh:** 414,619 ops/sec ±3.13% (94 runs sampled) \
**@project-serum/borsh:** 288,389 ops/sec ±1.28% (93 runs sampled) \
**@coral-xyz/borsh:** 242,675 ops/sec ±3.03% (84 runs sampled) \
**@metaplex-foundation/beet:** 451,653 ops/sec ±10.62% (85 runs sampled) \
**borsh:** 128,820 ops/sec ±4.71% (83 runs sampled) 

**Fastest is @metaplex-foundation/beet**

### Serialization:

**@dao-xyz/borsh:** 752,003 ops/sec ±1.30% (88 runs sampled) \
**@project-serum/borsh:** 308,778 ops/sec ±2.47% (78 runs sampled) \
**@coral-xyz/borsh:** 319,793 ops/sec ±1.36% (81 runs sampled) \
**@metaplex-foundation/beet:** 1,223,160 ops/sec ±2.38% (92 runs sampled) \
**borsh:** 149,616 ops/sec ±1.57% (59 runs sampled) 
**Fastest is @metaplex-foundation/beet**

## Conclusion

Based on the benchmark results, it appears that Metaplex Borsh is the fastest for both serialization and deserialization. Dao XYZ Borsh and Project Serum Borsh had the second and third highest performance in both serialization and deserialization, respectively, while Anchor Coral Borsh and Near Borsh had the lowest performance in both cases.

In addition to having the highest performance in both serialization and deserialization, Metaplex Borsh is also well-maintained and widely used in many projects. It also has a high level of popularity, with a weekly download rate of 74,183. All of these factors make Metaplex Borsh a strong choice for those considering using Borsh in their projects.

Also it is worth considering Dao XYZ Borsh as a second option, as it is a fork of the Near Borsh library and has rich decorators with good implementation. However, It is important to note that benchmark results are subjective and can be affected by the machine and hardware on which they are run. While the results provided may be a good indication of the relative performance of the different Borsh libraries, they may not be directly comparable across different environments. As such, it is always a good idea to perform your own benchmarks in your specific environment to determine the best choice for your needs.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Acknowledgments
The Borsh libraries listed above
The Benchmark.js library
It's important to note that the performance of a serialization library can depend on various factors, such as the size and complexity of the data being serialized, the hardware and software environment in which the library is tested.