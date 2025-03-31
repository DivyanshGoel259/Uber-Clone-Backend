import db from "../../libs/db"
import { genAuthToken, hashPassword } from "../../libs/utils"
import { CaptainType, LocationType, TypeVehicle } from "../../types"

type RegisterCaptainArgs = Pick<CaptainType,'email'|'firstName'|'lastName'|'password'> &  Pick<TypeVehicle,'capacity'|'color'|'plate'|'type'>

export const registerCaptain = async (payload:RegisterCaptainArgs)=>{
    try {
        if(!payload.firstName || !payload.capacity || !payload.color || !payload.plate || !payload.password || !payload.type || !payload.email ){
            throw new Error('All feilds are required')
        }
        const checkUser = await db.oneOrNone(`SELECT id FROM captain WHERE email=$(email)`,{email:payload.email})
        if(checkUser?.id){
            throw new Error("Email Already Exists")
        }
        const hashedPassword = await hashPassword(payload.password)
        const vehicle = await db.oneOrNone(`INSERT INTO vehicle(color,plate,capacity,type) VALUES($(color),$(plate),$(capacity),$(type)) RETURNING *`,payload)
        
        if(!vehicle?.id){
            throw new Error("Internal Server Error")
        }

        let captain = await db.oneOrNone(`INSERT INTO captain(firstName,lastName,email,password,vehicleId) VALUES($(firstName),$(lastName),$(email),$(hashedPassword),$(vehicleId)) RETURNING firstName,lastName,email,status,id`,{...payload,vehicleId:vehicle.id,hashedPassword})
        if(!captain?.id){
            throw new Error("Internal Server Error")
        }
        captain = {...captain,vehicle}
        const token = await genAuthToken(captain.id)

        return {token,captain}

    } catch (err){
        throw err
    }
}