from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class VisibilityEnum(str, Enum):
    PUBLIC = "PUBLIC"
    PRIVATE = "PRIVATE"


# Create Project Validation Schema
class ProjectCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    summary: Optional[str] = None
    thumbnail: Optional[str] = None

    isActive: bool = True

    visibility: VisibilityEnum = VisibilityEnum.PUBLIC

    companyId: int


# Update Project Validation Schema
class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    summary: Optional[str] = None
    thumbnail: Optional[str] = None
    isActive: Optional[bool] = None
    visibility: Optional[VisibilityEnum] = None
    companyId: Optional[int] = None


# Response Schema
class ProjectResponse(BaseModel):
    id: int
    name: str
    summary: Optional[str]
    thumbnail: Optional[str]

    isActive: bool
    visibility: VisibilityEnum
    companyId: int

    created_at: datetime
    last_updated_at: datetime

    class Config:
        from_attributes = True