// Validate if an email address has a correct format.
//  * @param email - The email address to validate.
//  * @returns True if the email format is valid; otherwise, false.
//  */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Validate if a password meets the required security standards.
 * @param password - The password to validate.
 * @returns True if the password is valid; otherwise, false.
 */
export function isValidPassword(password: string): boolean {
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return (
        password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar
    )
}

/**
 * Validate if a username has valid characters and length.
 * @param username - The username to validate.
 * @returns True if the username is valid; otherwise, false.
 */
export function isValidUsername(username: string): boolean {
    const minLength = 3
    const maxLength = 20
    const usernameRegex = /^[a-zA-Z0-9_]+$/

    return (
        username.length >= minLength &&
        username.length <= maxLength &&
        usernameRegex.test(username)
    )
}

/**
 * Validate if a phone number is digits only and has a valid length.
 * @param phoneNumber - The phone number to validate.
 * @returns True if the phone number is valid; otherwise, false.
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
    const minLength = 10
    const maxLength = 15
    const phoneRegex = /^\d+$/

    return (
        phoneNumber.length >= minLength &&
        phoneNumber.length <= maxLength &&
        phoneRegex.test(phoneNumber)
    )
}