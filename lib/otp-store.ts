import fs from "fs"
import path from "path"

const filePath = path.join(
  process.cwd(),
  "otp-data.json"
)

export function saveOtp(
  phone:string,
  code:string
){

  let data:any = {}

  if(fs.existsSync(filePath)){
    data = JSON.parse(
      fs.readFileSync(filePath,"utf8")
    )
  }

  data[phone] = code

  fs.writeFileSync(
    filePath,
    JSON.stringify(data)
  )

}


export function getOtp(
  phone:string
){

  if(!fs.existsSync(filePath)){
    return null
  }

  const data =
    JSON.parse(
      fs.readFileSync(filePath,"utf8")
    )

  return data[phone]

}


export function removeOtp(
  phone:string
){

  if(!fs.existsSync(filePath)){
    return
  }

  const data =
    JSON.parse(
      fs.readFileSync(filePath,"utf8")
    )

  delete data[phone]

  fs.writeFileSync(
    filePath,
    JSON.stringify(data)
  )

}
