module.exports = (bot) => {
    let prompt = process.openStdin()
    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
        bot.channels.cache.get("714196561608835092").send("**Console:** " + x.join(" "));
    });
}