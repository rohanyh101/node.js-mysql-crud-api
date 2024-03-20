const bcrypt = require("bcryptjs");

const HashPassword = async (args) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(args.password, salt);
};

const MatchPassword = async(enteredPassword, hash) => {
    return await bcrypt.compare(enteredPassword, hash);
}

module.exports = { HashPassword, MatchPassword}