export const simulateApiCall = async (code) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return code === '1234'; // Replace with actual API logic
};