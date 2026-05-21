from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.User import UserCreate
from app.services.authentication_service import create_user_for_login

router = APIRouter()


@router.post("/create-user-for-login")
async def create(
    user : UserCreate,
    db : Session = Depends(get_db)
):
    try:
        user = await create_user_for_login(user , db)
        return {"message" : "User created successfully" , "user" : user}
    except Exception as e:
        return {"message" : "User not created" , "error" : str(e)}