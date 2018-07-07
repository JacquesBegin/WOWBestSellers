require('dotenv').config();

let tempBossID = 23863;

const bossURL = `https://us.api.battle.net/wow/boss/${tempBossID}?locale=en_US&apikey=${process.env.API_KEY}`;


retrieveBossEncounter = (bossURL) => {
  request(
    {
      url: bossURL,
      json: true
    }, function (err, res, body) {
      if (!err & res.statusCode === 200) {
        // console.log("BODY-Encounter Data: ", body);

        // Check if boss already exists in database
        var newExistsQuery = {};
        newExistsQuery.queryText = 'SELECT EXISTS (SELECT true FROM bossencounter WHERE bossid = $1);';
        newExistsQuery.queryValues = [body.id];
        newExistsQuery.queryCallback = function(err, result) {
          if (!result.rows[0].exists) {

            // If boss does not exist in db then insert it
            var newInsertQuery = {};
            newInsertQuery.queryText = 'INSERT INTO bossencounter(bossid, name, description) VALUES($1, $2, $3);';
            newInsertQuery.queryValues = [body.id, body.name, body.description];
            newInsertQuery.queryCallback = function(err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log("Insert passed");
              }
            };

            db.makeClientQuery(newInsertQuery);

          } else {
            console.log("Boss already in db");
          } 
        }

        db.makeClientQuery(newExistsQuery);
      }
    }
  );
}

// retrieveBossEncounter(bossURL);