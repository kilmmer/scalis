export function generateAccountNumber(){
    // generate an function that make bank account number
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return accountNumber;
}


// generate_utils.ts
export function generateAccountPin(){
    // generate an function that make bank account pin
    const accountPin = Math.floor(1000 + Math.random() * 9000);
    return accountPin;
}