import { init } from "./database/database"


export function register(){}

export function bootstrap(){
  console.log('bootstrap')
  new Promise((resolve, reject) => {
resolve(init())
  }).then(() => {
    console.log('init done')
  }) 
}