// All queries for database interactions

module.exports = {
  createItemsTable: function() {
                    return (`CREATE TABLE IF NOT EXISTS items (
                      item_id int NOT NULL,
                      name varchar(100),
                      description varchar(450),
                      icon varchar(45),
                      stackable int,
                      item_bind int,
                      buy_price int,
                      sell_price int,
                      is_auctionable boolean
                    );`);
                  },
  
  getItem: function(itemId) {
            return (`SELECT * FROM items
              WHERE item_id = ${itemId};
            `);
          },

  addItem: function(item) {
            return (`INSERT INTO items
            (item_id, name, description, icon,
            stackable, item_bind, buy_price,
            sell_price, is_auctionable) VALUES
            (${item.itemid}, ${item.name}, ${item.description}, 
            ${item.icon}, ${item.stackable}, ${item.itembind},
            ${item.buyprice}, ${item.sellprice}, ${item.isauctionable}
            );`);
          },

  
}