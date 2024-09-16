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

const lagrangeInterpolation = (points) => (x) => {
    let result = 0;
    for (let i = 0; i < points.length; i++) {
        const L_i = lagrangeBasisPolynomial(i, points);
        result += points[i][1] * L_i(x);
    }
    return result;
};

const readTestCase = (jsonInput) => {
    const data = parseJSON(jsonInput);
    const n = data.keys.n;
    const k = data.keys.k;

    const points = [];
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

    const polynomial = lagrangeInterpolation(points);
    const constantTerm = polynomial(0);

    return {
        n,
        k,
        points,
        constantTerm: Math.round(constantTerm)
    };
};

const handleInput = (jsonInput) => {
    try {
        const result = readTestCase(jsonInput);
        console.log("Extracted Data:", result);
        console.log("Secret (C):", result.constantTerm);
    } catch (error) {
        console.error("Error processing JSON input:", error.message);
    }
};

// Provided JSON input
const jsonInput = `
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
`;

// Call the function with the provided JSON input
handleInput(jsonInput);
