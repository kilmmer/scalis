import Customer from "@/entities/customer.entity"
import db from "@/database/database"

export default class CustomerRepository {
  public async createCustomer(customer: Pick<Customer, "customer_name">): Promise<any> {
    const sql = `INSERT INTO customers (customer_name) VALUES (?)`
    const params = [customer]

    const result = db.run(sql, params, function(err: any) {
      if (err) {
        return console.log(err.message)
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`)

      return {id: this.lastID, customer_name: customer}
    })
    return result
  }

  public async getCustomerById(id: number) {
    const sql = `SELECT * FROM customers WHERE id = ?`
    const params = [id]

    return new Promise((resolve, reject) => {
      db.get(sql, params, (err: any, row: any) => {
        return err ? reject(err) : resolve(row)
      })
    })
  }

  public async getAllCustomers(): Promise<Customer[] | []> {
    const sql = `SELECT * FROM customers`

    return new Promise((resolve, reject) => {
      db.all(sql, (err: any, rows: any) => {
        return err ? reject(err) : resolve(rows)
      })
    })
  }

  public async updateCustomer(customer: Customer) {
    const sql = `UPDATE customers SET customer_name = ?, updated_at = ? WHERE id = ?`
    const params = [customer.customer_name, new Date(), customer.id]

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err: any, result: any) => {
        return err ? reject(err) : resolve(result)
      })
    })
  }
}