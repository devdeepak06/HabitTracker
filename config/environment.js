const devlopment = {
    name: 'devlopment',
    asset_path: './assets',
    secret_Key: "RelbXzro0EGeHeOxiVW0CYPcHk0uCOwg",
    db: `mongodb://localhost:27017/habit_tracker`

}
const production = {
    name: 'production',
    asset_path: process.env.assetPath,
    secret_Key: process.env.secret_Key,
    db: process.env.db

}

module.exports = eval(process.env.HABIT_ENV) == undefined ? devlopment : eval(process.env.HABIT_ENV);
// module.exports = production;