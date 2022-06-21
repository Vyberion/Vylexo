
# Now the package have typings from typescript! 

Anything problem conctact [here](https://github.com/asolden22/Economy-mongoose/issues)

# How to use this package?

Required packages
```ts
npm i economy-mongoose
//Or the equivalent of
yarn add economy-mongoose
//Or others
```

## How to connect MongoDB with the package?

Typescript:
```ts
import {Economy} from "economy-mongoose"
Economy.connect("MongoDB connection")
```
Javascript:
```js
const {Economy} = require("economy-mongoose")
Economy.connect("MongoDB connection")
```

Methods:
```ts
Economy.createUser(UserID, GuildID) // Create a user in the database.
Economy.DeleteUser(UserID, GuildID) // Delete a user in the database.
Economy.getUser(UserID, GuildID) // Gets a user from the database.
Economy.addWallet(UserID, GuildID, Amount) // Add money to a user's wallet.
Economy.removeWallet(User, Guild, Amount) // Remove money from a user's wallet.
Economy.removeBank(User, Guild, Amount) // Remove money from a user's bank.
Economy.addBank(User, Guild, Amount) // Add money to a user's bank.
Economy.Withdraw(User, Guild, Amount) // Take money out of the bank to use it in the wallet.
Economy.transfer(FromUserID, ToUserID, Guild, Amount)//Transfer from one user to another user an amount of money 
Economy.Deposit(User, Guild, Amount) // Deposit money from the wallet to the bank.
Economy.setBank(User, Guild, Amount) //Set an amount in someone's bank.
Economy.setWallet(User, GuildID, Amount) //Set an amount in someone's wallet.
```

Returns, types and errors in code:
```diff
Parameter Amount
+ Amount is necessarily a Number
- If Amount is not a Number it returns false
- If Amount has an error it returns false, otherwise true

Parameter UserID, FromUserID and ToUserID
+ User is necessarily a String
- If User has an error it returns false, otherwise true

Parameter Guild
+ Guild is necessarily a String
- If Guild has an error it returns false, otherwise true

Error getUser
+ const user = await Economy.getUser( User, Guild ); //Return the true
- const user = Economy.getUser( User, Guild );//Return undefined in all

Every time we use the get or another that consists of variables, you must use await

In the case of deposit, withdraw or others are used like this
Economy.deposit()
```

Properties:
```ts
let user = await Economy.getUser(UserID, GuildID)

user.User // Access a user.
user.Bank//Access someone's bank.
user.Wallet // You access a user's wallet.
user.Guild // You access a server/guild.

```

## Balance command example

```ts
let member = <message>.mentions.members.first() || <message>.member
let user = await Economy.getUser(member, message.Guild.id)

let embed = new MessageEmbed()
.addField('Money', user.Wallet)
.addField('Bank', user.Bank)
.addField('Money in total', user.bank+user.Wallet)
```

## How to do a basic pay command

```ts
const {Economy} = require("economy-mongoose")//Require the package

let me = <message>.member//You
let member = <message>.mentions.members.first()//Member to pay
let Guild = <message>.guild.id//The GuildID (OPTIONAL)
Economy.transfer(me.id, member.id, Guild, 100)
```