from pydantic import BaseModel, EmailStr
from typing import List, Optional

class EmailRequest(BaseModel):
    to: List[EmailStr]
    cc: Optional[List[EmailStr]] = None
    subject: str
    body: str
