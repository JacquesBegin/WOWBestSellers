// All queries for database interactions

module.exports = {
  createItemsTable: function() {
                    return (`CREATE TABLE IF NOT EXISTS items (
                      itemid int NOT NULL,
                      name varchar(100),
                      description varchar(450),
                      icon varchar(45),
                      stackable int,
                      itembind int,
                      buyprice int,
                      sellprice int,
                      isauctionable boolean
                    );`);
                  },
  
  getItem: function(itemId) {
            return (`SELECT * FROM items
              WHERE itemid = ${itemId};
            `);
          },
}