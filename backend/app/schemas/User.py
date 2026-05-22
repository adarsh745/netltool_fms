from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    first_name:str
    role: str = "User"

