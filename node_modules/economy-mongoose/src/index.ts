import mongoose from "mongoose"
mongoose.set('useFindAndModify', false);
const EconomySchema = require("./model/economy");
import { IsNaS } from "./util/util";
export class Economy {
    //--------------------------------------------------------------------------------------\\
    //---------------------------------------------------------------------------------------\\
    /**
     * @param {string} url Here you will have the connection link to mongodb
    **/

    static async connect(url: string) {
        if (!url) return console.log('you need to enter a connection to MongoDB.')
        IsNaS(url, 'Url')
        return mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    //--------------------------------------------------------------------------------------\\
    //---------------------------------------------------------------------------------------\\
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be.
     *  
    **/
    static async getUser(User: string, Guild: string) {
        if (!User) return console.log('[User] You need to enter a user ID.')
        if (!Guild) return console.log('[Guild] You need to enter a server ID.')
        IsNaS(User, 'User')
        IsNaS(Guild, 'Guild')

        let user = await EconomySchema.findOne({ User: User, Guild: Guild })
        if (!user) return false

        return user
    }
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be.
     * @param {number} Amount Here you will put the amount of money.
    **/
    //--------------------------------------------------------------------------------------\\
    //---------------------------------------------------------------------------------------\\
    static async addWallet(User: string, Guild: string, Amount: number) {//サーバーユーザーに金額を追加します。
        IsNaS(User, 'User')
        IsNaS(Guild, 'Guild')
        if (!User) return console.log('[User]  You need to enter a user ID.')
        if (!Guild) return console.log('[Guild] You need to enter a server ID. to enter a user ID.')
        if (!Amount) return console.log('[Amount] You need to enter the amount.')
        if (isNaN(Amount)) return console.log('[Amount NaN] The amount entered is not a number.')
        if (Amount < 0) return console.log('[NMZ] The amount entered is not less than zero or zero')

        let user = await EconomySchema.findOne({ User: User, Guild: Guild })

        if (!user) {
            const newUser = new EconomySchema({
                Guild: Guild,
                User: User,
                Wallet: 0,
                Bank: 0
            })
            await newUser.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
            return Amount;
        }

        user.Wallet += Amount; await user.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
        return Amount;
    }
    //--------------------------------------------------------------------------------------\\
    //---------------------------------------------------------------------------------------\\
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be.
     * @param {number} Amount Here you will put the amount of money.
    **/
    static async removeWallet(User: string, Guild: string, Amount: number) {
        if (!User) return console.log('[User] You need to enter a user ID.')
        if (!Guild) return console.log('[Guild] You need to enter a server ID.')
        IsNaS(User, 'User')
        IsNaS(Guild, 'Guild')
        if (!Amount) return console.log('[Amount] You need to enter the amount.')
        if (isNaN(Amount)) return console.log('[Amount NaN] The amount entered is not a number.')
        if (Amount < 0) return console.log('[NMZ] The amount entered is not less than zero or zero')

        let user = await EconomySchema.findOne({ User: User, Guild: Guild })

        if (!user) {
            const newUser = new EconomySchema({
                Guild: Guild,
                User: User,
                Wallet: 0,
                Bank: 0
            })
            await newUser.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
            return Amount;
        }
        if (Amount > user.Wallet) {
            user.Wallet -= user.Wallet;

            await user.save()
                .catch((err: any) => console.log(err));

            return Amount;

        }
        user.Wallet -= Amount; await user.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
        return Amount;
    }
    //--------------------------------------------------------------------------------------\\
    //---------------------------------------------------------------------------------------\\
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be.
     * @param {number} Amount Here you will put the amount of money.
    **/
    static async removeBank(User: string, Guild: string, Amount: number) {
        IsNaS(User, 'User')
        IsNaS(Guild, 'Guild')
        if (!User) return console.log('[User] You need to enter a user ID.')
        if (!Guild) return console.log('[Guild]You need to enter a server ID.')
        if (!Amount) return console.log('[Amount] You need to enter the amount.')
        if (isNaN(Amount)) return console.log('[Amount NaN] The amount entered is not a number.')
        if (Amount < 0) return console.log('[NMZ] The amount entered is not less than zero or zero')

        let user = await EconomySchema.findOne({ User: User, Guild: Guild })

        if (!user) {
            const newUser = new EconomySchema({
                Guild: Guild,
                User: User,
                Wallet: 0,
                Bank: 0
            })
            await newUser.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
            return Amount;
        }
        if (Amount > user.Bank) {
            user.Bank -= user.Bank;

            await user.save()
                .catch((err: any) => console.log(err));

            return Amount;

        }
        user.Bank -= Amount; await user.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
        return Amount;
    }
    //--------------------------------------------------------------------------------------\\
    //---------------------------------------------------------------------------------------\\
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be.
     * @param {number} Amount Here you will put the amount of money.
    **/
    static async addBank(User: string, Guild: string, Amount: number) {
        if (!User) return console.log('[User] You need to enter a user ID.')
        if (!Guild) return console.log('[Guild] You need to enter a server ID.')
        IsNaS(User, 'User')
        IsNaS(Guild, 'Guild')
        if (!Amount) return console.log('[Amount] You need to enter the amount.')
        if (isNaN(Amount)) return console.log('[Amount NaN] The amount entered is not a number.')
        if (Amount < 0) return console.log('[NMZ] The amount entered is not less than zero or zero')

        let user = await EconomySchema.findOne({ User: User, Guild: Guild })

        if (!user) {
            const newUser = new EconomySchema({
                Guild: Guild,
                User: User,
                Wallet: 0,
                Bank: 0
            })
            await newUser.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
            return Amount;
        }

        user.Bank += Amount; await user.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
        return Amount;
    }
    //--------------------------------------------------------------------------------------\\
    //---------------------------------------------------------------------------------------\\
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be.
     * @param {number} Amount Here you will put the amount of money.
    **/
    static async Withdraw(User: string, Guild: string, Amount: number) {
        if (!User) return console.log('[User] You need to enter a user ID.')
        if (!Guild) return console.log('[Guild] You need to enter a server ID.')
        IsNaS(User, 'User')
        IsNaS(Guild, 'Guild')
        if (!Amount) return console.log('[Amount] You need to enter the amount.')
        let x = Number(Amount)
        if (isNaN(x)) return console.log('[Amount NaN] The amount entered is not a number.')
        if (x < 0) return console.log('[NMZ] The amount entered is not less than zero or zero')
        let user = await EconomySchema.findOne({ User: User, Guild: Guild })
        if (!user) {
            const newUser = new EconomySchema({
                Guild: Guild,
                User: User,
                Wallet: 0,
                Bank: 0
            })
            await newUser.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
            return Amount;
        }
        if (x > user.Bank) return console.log('[Amount] The amount entered exceeds the amount the user has in the bank')
        user.Bank -= x
        user.Wallet += x
        await user.save()
            .catch((err: any) => console.log(err));
        return Amount;
    }
    //--------------------------------------------------------------------------------------\\
    //---------------------------------------------------------------------------------------\\
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be.
     * @param {number} Amount Here you will put the amount of money.
    **/
    static async Deposit(User: string, Guild: string, Amount: number) {
        if (!User) return console.log('[User] You need to enter a user ID.')
        if (!Guild) return console.log('[Guild] You need to enter a server ID.')
        IsNaS(User, 'User')
        IsNaS(Guild, 'Guild')
        if (!Amount) return console.log('[Amount] You need to enter the amount.')
        let x = Number(Amount)
        if (isNaN(x)) return console.log('[Amount NaN] The amount entered is not a number.')
        if (x < 0) return console.log('[NMZ] The amount entered is not less than zero or zero')
        let user = await EconomySchema.findOne({ User: User, Guild: Guild })
        if (!user) {
            const newUser = new EconomySchema({
                Guild: Guild,
                User: User,
                Wallet: 0,
                Bank: 0
            })
            await newUser.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
            return Amount;
        }
        if (x > user.Wallet) return console.log('[Amount] The amount entered exceeds the amount the user has in the bank')
        user.Wallet -= x
        user.Bank += x
        await user.save().catch((err: any) => console.log(err));
        return Amount;
    }
    //--------------------------------------------------------------------------------------\\
    //---------------------------------------------------------------------------------------\\
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be. 
    **/
    static async createUser(User: string, Guild: string) {
        IsNaS(User, 'User')
        IsNaS(Guild, 'Guild')
        if (!User) return console.log('[User] You need to enter a user ID.。')
        if (!Guild) return console.log('[Guild] You need to enter a server ID.')
        let user = await EconomySchema.findOne({ User: User, Guild: Guild });
        if (user) return false;
        const newUser = new EconomySchema({
            Guild: Guild,
            User: User,
            Wallet: 0,
            Bank: 0
        })
        await newUser.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
    }
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be.
    **/
    static async DeleteUser(User: string, Guild: string) {
        if (!User) return console.log('[User] You need to enter a user ID.')
        if (!Guild) return console.log('[Guild] You need to enter a server ID.')

        let user = await EconomySchema.findOne({ User: User, Guild: Guild });
        if (!user) return false;

        await EconomySchema.findOneAndRemove({ User: User, Guild: Guild });

    }
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others. 
     * @param {string} Guild Here you will have the server, that is, where will the money or others be. 
     * @param {number} Amount Here you will put the amount of money. 
    **/
    static async setBank(User: string, Guild: string, Amount: number) {
        if (!User) return console.log('[User] You need to enter a user ID.')
        if (!Guild) return console.log('[Guild] You need to enter a server ID.')
        IsNaS(User, 'User')
        IsNaS(Guild, 'Guild')
        if (!Amount) return console.log('[Amount] You need to enter the amount.')
        if (isNaN(Amount)) return console.log('[NaN] The amount entered is not a number.')
        if (Amount < 0) return console.log('[AIC] The amount entered is not less than zero or zero')

        let user = await EconomySchema.findOne({ User: User, Guild: Guild })
        if (!user) return false

        user.Bank = Amount
        await user.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
        return Amount;

    }
    /**
     * @param {string} User Here you will put the user, that is, who will receive the money or others.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be.
     * @param {number} Amount Here you will put the amount of money.
    **/
    static async setWallet(User: string, Guild: string, Amount: number) {
        if (!User) return console.log('[User] You need to enter a user ID.')
        if (!Guild) return console.log('[Guild] You need to enter a server ID.')
        IsNaS(User, 'User')
        IsNaS(Guild, 'Guild')
        if (!Amount) return console.log('[Amount] You need to enter the amount.')
        if (isNaN(Amount)) return console.log('[NaN] The amount entered is not a number.')
        if (Amount < 0) return console.log('[AIC] The amount entered is not less than zero or zero')

        let user = await EconomySchema.findOne({ User: User, Guild: Guild })
        if (!user) return false

        user.Wallet = Amount
        await user.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
        return Amount;
    }
    /**
     * @param {string} ToUser Here you enter the id of the user who will give the money.
     * @param {string} FromUser Here you enter the id of the user who will receive the money.
     * @param {string} Guild Here you will have the server, that is, where will the money or others be.
     * @param {number} Amount Here you will put the amount of money.
    **/
    static async transfer(ToUser: string, FromUser: string, Guild: string, Amount: number) {
        if (!ToUser) return console.log('[To User] You need to enter a user ID.')
        IsNaS(ToUser, 'User')

        if (!FromUser) return console.log('[From User] You need to enter a user ID.')
        IsNaS(FromUser, 'User')

        if (!Guild) return console.log('[Guild] You need to enter a server ID.')
        IsNaS(Guild, 'Guild')

        if (!Amount) return console.log('[Amount] You need to enter the amount.')
        if (isNaN(Amount)) return console.log('[NaN] The amount entered is not a number.')
        if (Amount < 0) return console.log('[AIC] The amount entered is not less than zero or zero')
        let user1 = await EconomySchema.findOne({ User: ToUser, Guild: Guild })
        let user2 = await EconomySchema.findOne({ User: FromUser, Guild: Guild })
        if (!user1) return false
        if (!user2) {
            user1.Wallet -= Amount
            const newUser = new EconomySchema({
                Guild: Guild,
                User: user2,
                Wallet: Amount,
                Bank: 0
            })
            await newUser.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
            await user1.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
        }
        user1.Wallet -= Amount
        user2.Wallet += Amount
        await user1.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
        await user2.save().catch((err: any) => console.error(`[MongoDB-Error]${err}`))
    }
}

