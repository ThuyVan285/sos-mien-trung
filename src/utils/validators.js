// src/utils/validators.js

export const validatePhone = (phone) => {
    return /^(0|\+84)[0-9]{9}$/.test(phone);
};

export const required = (value) => {
    return value && value.trim() !== "";
};

export const validateEmergency = (level) => {
    return ["low", "medium", "high"].includes(level);
};