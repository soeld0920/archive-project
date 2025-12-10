class HttpError extends Error {
  constructor(public status : number, public message : string){
    super(`${status} : ${message}`);
  }
}

export default HttpError;