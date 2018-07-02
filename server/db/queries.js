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

  addItem: function(item) {
            return (`INSERT INTO items
            (itemid, name, description, icon
            stackable, itembind, buyprice,
            sellprice, isauctionable) VALUES
            (${item.itemid}, ${item.name}, ${item.description}, 
            ${item.icon}, ${item.stackable}, ${item.itembind},
            ${item.buyprice}, ${item.sellprice}, ${item.isauctionable}
            );`);
          },

  
}