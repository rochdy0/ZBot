const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.db')


module.exports = {
    nouveauGuerrier: function (Discord, client, message) {
        db.serialize(function () {
            message.author.username = message.author.username.replace("'", "''")
            db.run(`INSERT OR IGNORE INTO nouveau_guerrier (id, username, count, date) VALUES('${message.author.id}', '${message.author.username}', 0, '${new Date()}');`)
            db.run(`UPDATE nouveau_guerrier SET count = count + 1 WHERE id = '${message.author.id}';`)
            db.all(`SELECT id, count, date FROM nouveau_guerrier WHERE id = '${message.author.id}';`, function (err, row) {
                if (err) {console.log(`ng auto : ${message.author.id}`);console.log(err)}
                else {
                    row = row[0]
                    if (row.count >= 300) {
                        const date = new Date()
                        const ngdate = new Date(row.date)
                        if ((Math.abs(date.getTime() - ngdate.getTime()) / (1000 * 3600 * 24)) >= 14) {
                            console.log(`${row.username} : ${row.count}`)
                            message.member.roles.add("610959663865004050");
                            message.member.roles.remove("747705073458610197");
                            db.run(`DELETE FROM nouveau_guerrier WHERE id = ${message.author.id};`)
                            var target_chan = client.channels.resolve('611864040699985931');
                            target_chan.send('<@' + message.author.id + '>')
                            const Embed = new Discord.MessageEmbed()
                                .setColor('#ffa600')
                                .setTitle('Félicitations pour ta promotion au rang guerrier <:edt:786348941741654046>')
                                .setDescription('<@' + message.author.id + '> Tu peux dés à présent avoir accès au salon <#875783142638759976>, aux salons vocaux, mais aussi mettre en ligne les fichiers multimédias de ton choix. \nMerci pour ton activité et ton investissement, tu es un véritable tigre.\n\nQue la masse <:peaky2:678665593490243635>')
                            target_chan.send({ embeds: [Embed] })
                        }
                    }
                }
            })
        })
    }
}