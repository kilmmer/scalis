import AccountRepository from "@/repositories/account.repository";

export async function GET(req: any, res: any) {

    const accountRepository = new AccountRepository();
   
    // Query to get all todos from the "todo" table
    const accounts = await accountRepository.findAll();
  
    // Return the todos as a JSON response with a 200 status code
    return new Response(JSON.stringify(accounts), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  }