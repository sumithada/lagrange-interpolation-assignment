const parseJSON = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        throw new Error("Invalid JSON format.");
    }
};

const decodeValue = (valueStr, base) => {
    return parseInt(valueStr, base);
};

// Function to compute Lagrange basis polynomial L_i(x)
const lagrangeBasisPolynomial = (i, points) => (x) => {
    let numerator = 1;
    let denominator = 1;
    for (let j = 0; j < points.length; j++) {
        if (i !== j) {
            numerator *= (x - points[j][0]);
            denominator *= (points[i][0] - points[j][0]);
        }
    }
    return numerator / denominator;
};

// Function to compute Lagrange Interpolation Polynomial
const lagrangeInterpolation = (points) => (x) => {
    let result = 0;
    for (let i = 0; i < points.length; i++) {
        const L_i = lagrangeBasisPolynomial(i, points);
        result += points[i][1] * L_i(x);
    }
    return result;
};

const readTestCase = (jsonInput) => {
    // Parse the JSON input
    const data = parseJSON(jsonInput);

    // Extract the value of 'n' and 'k'
    const n = data.keys.n;
    const k = data.keys.k;

    // Initialize an array to hold the roots
    const points = [];

    // Iterate over the keys in the JSON object
    for (const key in data) {
        if (key !== 'keys') {
            const base = parseInt(data[key].base);
            const value = decodeValue(data[key].value, base);
            points.push([parseInt(key), value]);
        }
    }

    if (points.length < k) {
        throw new Error('Not enough points to determine the polynomial');
    }

    // Calculate the polynomial function
    const polynomial = lagrangeInterpolation(points);
    const constantTerm = polynomial(0);

    // Return the extracted roots and constant term
    return {
        n,
        k,
        points,
        constantTerm: Math.round(constantTerm) // Round to handle floating-point precision
    };
};

// Function to handle input and output
const handleInput = (jsonInput) => {
    try {
        const result = readTestCase(jsonInput);
        console.log("Extracted Data:", result);
        console.log("Secret (C):", result.constantTerm);
    } catch (error) {
        console.error("Error processing JSON input:", error.message);
    }
};

// Example JSON input
const jsonInput = `
{
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
}
`;

// Call the function with the provided JSON input
handleInput(jsonInput);
