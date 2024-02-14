import db from "@/database/database";
import Customer from "@/entities/customer.entity";
import AccountRepository from "@/repositories/account.repository";
import CustomerRepository from "@/repositories/customer.repository";
import { NextResponse } from "next/server";

// Initialize a variable to hold the SQLite database connection

// Handler for GET requests to retrieve all todos
export async function GET(req: any, res: any) {

  const customerRepository = new CustomerRepository();
  const customersAccount = []
  
  const customers: Customer[] = await customerRepository.getAllCustomers();
  console.log(customers)
  const accountRepository = new AccountRepository();
  
  for(const customer of customers){
    const accounts = await accountRepository.findAccountByCustomerId(customer.id);
    customersAccount.push({customer, accounts})
  }
  
  // Return the todos as a JSON response with a 200 status code
  return new Response(JSON.stringify(customersAccount), {
    headers: { "content-type": "application/json" },
    status: 200
  });
}

export async function POST(req: any, res: any) {
  const customer= await req.json();
  
  if(customer.customer_name === ""){
    return NextResponse.json({message: "Name is required", error: true}, {
      status: 400,
      headers: { "content-type": "application/json" }
    })
  }

  const customerRepository = new CustomerRepository();
  const newCustomer = await customerRepository.createCustomer(customer.customer_name);

  if(!newCustomer){
    console.trace('error creating customer: ', newCustomer)
    return NextResponse.json({message: "Customer not created\n"+JSON.stringify(newCustomer), error: true}, {
      status: 400,
      headers: { "content-type": "application/json" }
    })
  }

  const accountRepository = new AccountRepository();


  const newAccount = await accountRepository.create(newCustomer.id, customer.initial_amount)

  if(!newAccount.id){
    return NextResponse.json({message: "Customer account not created\n"+newAccount, error: true}, {
      status: 400,
      headers: { "content-type": "application/json" }
    })
  } else {
    
    return Response.json({
      status: 200,
      error: false,
      message: "Customer and Account created",
      body: {
        customer: newCustomer,
        account: newAccount
      }
    })
  }
}