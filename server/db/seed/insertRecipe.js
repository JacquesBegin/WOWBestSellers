const request = require("request");
require('dotenv').config();

module.exports = {

  insertRecipeToDB: function(client) {

    var url = `https://us.api.battle.net/wow/recipe/33994?locale=en_US&apikey=${process.env.API_KEY}`;

    request(
      {
        url: url,
        json: true
      }, function (error, response, body) {

        console.log("recipe: ", body)

        var insertStatement = `INSERT INTO recipe
        (recipeId, name, profession, icon) VALUES
        (${body.id}, '${body.name}', '${body.profession}', '${body.icon}');
        `;

        console.log(insertStatement);

        client.connect((err) => {
          if(err) {
            console.log(err);
          } else {
            client.query(insertStatement, 
              (err, result) => {
                if(err) {
                  console.log(err);
                } else {
                  
                }
                client.end();
            });
          }
        });
      }
    );
  }
}