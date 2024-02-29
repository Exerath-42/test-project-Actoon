// Define directions as constants for easier reference
const Direction = {
    N: 0, // North
    E: 1, // East
    S: 2, // South
    W: 3, // West
};

// Class representing a player with position and direction
const Player = class {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = Direction[direction]; // Map direction string to numerical value
    }

    // Method to change player's direction based on turn (L = left, R = right)
    changeDirection(turn) {
        if (turn === 'L') {
            if (this.direction === 0) {
                this.direction = 3; // Change direction to West if currently facing North
            } else {
                this.direction--; // Decrement direction otherwise
            }
        }
        if (turn === 'R') {
            if (this.direction === 3) {
                this.direction = 0; // Change direction to North if currently facing West
            } else {
                this.direction++; // Increment direction otherwise
            }
        }
    }

    // Method to move player within the bounds of the field
    move(height, width) {
        if (this.direction === 0) { // North
            if (this.y + 1 <= height) {
                this.y++;
            }
        } else if (this.direction === 2) { // South
            if (this.y - 1 >= 0) {
                this.y--;
            }
        } else if (this.direction === 1) { // East
            if (this.x + 1 <= width) {
                this.x++;
            }
        } else if (this.direction === 3) { // West
            if (this.x - 1 >= 0) {
                this.x--;
            }
        }
        return [this.x, this.y]; // Return current position
    }
};

const fs = require('fs');

// Function to read and split a file into blocks
function readAndSplitFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const lines = data.split('\n'); // Split file content into lines
            const firstLine = lines.shift(); // Extract the first line
            const fieldSize =  firstLine.split(' '); // Split the first line into field size
            const blocks = [];

            for (let i = 0; i < lines.length; i += 2) {
                const block = [lines[i], lines[i + 1]].filter(Boolean); // Group lines into blocks of two, filtering out empty lines
                blocks.push(block);
            }

            resolve({ fieldSize, blocks }); // Resolve the promise with field size and blocks
        });
    });
}

// Read and split the file 'instructions.txt', then process each block
readAndSplitFile('instructions.txt')
    .then(({ fieldSize, blocks }) => {
        blocks.forEach((block, index) => {
            coordinates = block[0].split(' '); // Split the coordinates from the first line
            const p1 = new Player(coordinates[0], coordinates[1], coordinates[2]); // Create a new player with given coordinates and direction
            instructions = block[1]; // Extract instructions from the second line
            for (let i = 0; i < instructions.length; i++) {
                if (instructions[i] == 'L' || instructions[i] == 'R') {
                    p1.changeDirection(instructions[i]); // Change direction if instruction is a turn
                } else {
                    p1.move(fieldSize[0], fieldSize[1]); // Move player if instruction is a forward movement
                }
            }
            console.log(p1.x, p1.y, Object.keys(Direction)[p1.direction]); // Output the final position and direction of the player
        });
    })
    .catch(error => {
        console.error('Error reading file:', error); // Log error if file reading or processing fails
    });
