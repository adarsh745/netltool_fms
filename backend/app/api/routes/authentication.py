
from fastapi import APIRouter , Depends , HTTPException
from app.schemas.User import UserCreate
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.User import UserCreate
from app.services.authentication_service import create_user_for_login, delete_user, get_users

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
        httpException = HTTPException(status_code=500 , detail=str(e))
        raise httpException
    
@router.get("/users")
def get_all_users(db:Session = Depends(get_db)):
    try:
        users = get_users(db)
        return {"users" : users}
    except Exception as e:
        httpException = HTTPException(status_code=500 , detail=str(e))
        raise httpException
    
@router.delete("/delete-user/{user_id}")
def delete(user_id:int , db:Session = Depends(get_db)):
    try:
        result = delete_user(db , user_id)
        return result
    except Exception as e:
        httpException = HTTPException(status_code=500 , detail=str(e))
        raise httpException