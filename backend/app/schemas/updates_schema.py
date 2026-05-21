from pydantic import BaseModel

class CreateUpdate(BaseModel):
    title:str 
    content:str
    image:str | None = None
    progress:int | None = None
    projectId:int

class UpdateUpdate(BaseModel):
    title:str | None = None
    content:str | None = None
    image:str | None = None
    progress:int | None = None