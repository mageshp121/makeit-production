export interface userData {
    firstName : string,
    lastName: string,
    email:string,
    phone:number,
    password:string,
    roll:string
    isOtPVerified:boolean
    profileImage:string | null
    s3ImageUrl:string | null
    isBlock:boolean
}

export class userProfile{
    firstName : string;
    lastName: string
    email : string
    phone:number
    password:string 
    roll:string
    isOtPVerified:boolean
    profileImage:string | null
    s3ImageUrl:string | null
    isBlock:boolean | undefined
    constructor({firstName,lastName,email,phone,password,roll,isOtPVerified,profileImage,s3ImageUrl,isBlock}:userData){
        this.firstName = firstName
        this.lastName  = lastName,
        this.email = email,
        this.phone = phone,
        this.password = password,
        this.roll = roll
        this.isOtPVerified = isOtPVerified
        this.profileImage = profileImage
        this.s3ImageUrl = s3ImageUrl
        this.isBlock = isBlock
    }
}
