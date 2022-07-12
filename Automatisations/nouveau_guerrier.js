'use strict';

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.db')


module.exports = {
    // Increases to 1 the message counter, if the member has more than 300 messages and a difference of 14 days
    // Between the first message and now, the member is deleted from the table and an embed is sent to bot-meme-spam.
    nouveauGuerrier: function (client, message) {
        const embed = {
            color: 0xffa600,
            title: 'Félicitations pour ta promotion au rang guerrier <:edt:786348941741654046>',
            description: `<@${message.author.id}> Tu peux dés à présent avoir accès au salon <#875783142638759976>, aux salons vocaux, mais aussi mettre en ligne les fichiers multimédias de ton choix. \nMerci pour ton activité et ton investissement, tu es un véritable tigre.\n\nQue la masse <:peaky2:678665593490243635>`
        }


        db.serialize(function () {
            message.author.username = message.author.username.replace("'", "''")
            db.run(`INSERT OR IGNORE INTO nouveau_guerrier (id, username, count, date) VALUES('${message.author.id}', '${message.author.username}', 0, '${new Date()}');`)
            db.run(`UPDATE nouveau_guerrier SET count = count + 1 WHERE id = '${message.author.id}';`)
            db.all(`SELECT id, count, date FROM nouveau_guerrier WHERE id = '${message.author.id}';`, function (err, row) {
                if (err) {console.log(`ng auto : ${message.author.id}`);console.log(err)}
                else {
                    row = row[0]
                    const [dateNow, dateJoin] = [new Date(), new Date(row.date)]
                    const dateDiff = (Math.abs(dateNow.getTime() - dateJoin.getTime()) / (8.64 * 10**7))
                    if (row.count >= 300 && dateDiff >= 14) {
                            console.log(`Nouveau guerrier : ${row.id} : ${row.count}`)
                            message.member.roles.add("610959663865004050");
                            message.member.roles.remove("747705073458610197");
                            db.run(`DELETE FROM nouveau_guerrier WHERE id = ${message.author.id};`)
                            client.channels.resolve('611864040699985931').send({ content: `<@${message.author.id}>`, embeds: [embed] })
                    }
                }
            })
        })
    }
}