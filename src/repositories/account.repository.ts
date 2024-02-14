import { generateAccountNumber } from "@/app/utils/generate_utils"
import db from "@/database/database"
import Account from "@/entities/account.entity"


export default class AccountRepository {
    public async create(customerId: number, checking_balance: number): Promise<any | null> {
        if(!customerId) return new Error('customerId is required')
        
        const sql = `INSERT INTO accounts (account_number, checking_balance, saving_balance, customer_id) VALUES (?, ?, ?, ?)`
        const params = [generateAccountNumber().toString(), checking_balance, 0, customerId]

        return db.serialize(() => {
            db.run(sql, params, function(err: any) {
                if(!err) {
                    const result: Account = {
                        id: this.lastID,
                        account_number: params[0].toString(),
                        checking_balance: +params[1],
                        saving_balance: +params[2],
                        customer_id: +params[3]
                    }
                    return result
                } else {
                    console.log(err)
                    return err
                }
            })
        }) 
    }

    public async findById(id: number): Promise<Account | null> {
        const sql = `SELECT * FROM accounts WHERE id = ?`
        const params = [id]

        return new Promise((resolve, reject) => {
            db.get(sql, params, (err: any, row: any) => {
                err ? reject(err) : resolve(row)
            })
        })
    }
    public async findAll(): Promise<any | null> {
        const sql = `SELECT * FROM accounts`
        
        return db.get(sql,[], (err: any, rows: any) => {
            if(!err) {
                return rows
            } else {
                console.log(err)
                return err
            }
        })
    }
   
    public async findAccountByAccounterNumber(id: number): Promise<Account | null> {
        const sql = `SELECT * FROM accounts WHERE id = ?`
        const params = [id]

        return new Promise((resolve, reject) => {
            db.get(sql, params, (err: any, row: any) => {
                err ? reject(err) : resolve(row)
            })
        })
    }

    public async findAccountByCustomerId(customerId: number): Promise<Account | null> {
        const sql = `SELECT * FROM accounts WHERE customerId = ?`
        const params = [customerId]

        return new Promise((resolve, reject) => {
            db.get(sql, params, (err: any, row: any) => {
                err ? reject(err) : resolve(row)
            })
        })

    }

    
}