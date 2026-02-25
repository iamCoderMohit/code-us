export function generateCode() {
    const alphabetsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const alphabetsLower = "abcdefghijklmnopqrstuvwxyz"
    const nums = "1234567890"

    const code = alphabetsUpper[Math.floor(Math.random() * 26)] + alphabetsLower[Math.floor(Math.random() * 26)] + nums[Math.floor(Math.random() * 10)] + alphabetsUpper[Math.floor(Math.random() * 26)]

    return code
}