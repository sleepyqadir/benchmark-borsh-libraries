import * as borsh from '@coral-xyz/borsh';

// Declare the Car class
class Car {
    // Declare the class properties
    make: string;
    model: string;
    year: number;
    color: string;
    mileage: number;

    // Declare the Borsh schema for the class
    static borshSchema = borsh.struct([
        borsh.str('make'),
        borsh.str('model'),
        borsh.u16('year'),
        borsh.str('color'),
        borsh.u32('mileage'),
    ]);

    // Define the class constructor
    constructor(make: string, model: string, year: number, color: string, mileage: number) {
        // Assign the provided properties to the class instance
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
        this.mileage = mileage;
    }

    // Define the serialize method
    serialize(): Buffer {
        // Allocate a new Buffer with a large enough capacity
        const buffer = Buffer.alloc(1000);
        // Encode the class instance into the Buffer using the Borsh schema
        Car.borshSchema.encode({ ...this }, buffer);
        // Return a slice of the Buffer containing only the used portion
        return buffer.slice(0, Car.borshSchema.getSpan(buffer));
    }

    // Define the deserialize method
    static deserialize(buffer: Buffer): Car | null {
        try {
            // Try to decode the serialized Buffer using the Borsh schema
            // @ts-ignore
            return Car.borshSchema.decode(buffer);
        } catch (e) {
            // If an error occurs, log the error and return null
            console.error('Deserialization error:', e);
            console.error(buffer);
            return null;
        }
    }
}

// Create a new Car instance
const myCar = new Car('Toyota', 'Camry', 2020, 'red', 25000);

// Serialize the car instance
const serializedCar = myCar.serialize();

// Deserialize the serialized car
const deserializedCar = Car.deserialize(serializedCar);

if (deserializedCar) {
    console.log(`Deserialized car:`, deserializedCar);
}