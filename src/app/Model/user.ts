export class user{
   
    constructor(
        public email:string,
        public id :string,
        private _token:string,
        private _expiresIn:Date

    )
   {}
   
    get token(){
       if(!this._expiresIn  || this._expiresIn < new Date()){
        console.log("jhjh")   
        return null
           
       }
      return this._token
    }
  

}