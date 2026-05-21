from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import base
import enum

class VisibilityEnum(str, enum.Enum):
    PUBLIC = "PUBLIC"
    PRIVATE = "PRIVATE"


class Projects(base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, autoincrement=True)

    name = Column(String, nullable=False)
    summary = Column(String)
    thumbnail = Column(String)

    isActive = Column(Boolean, default=True)

    visibility = Column(
        Enum(VisibilityEnum),
        default=VisibilityEnum.PUBLIC,
        nullable=False
    )

    companyId = Column(Integer)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    last_updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    updates = relationship(
        "Updates",
        back_populates="project",
        cascade="all, delete-orphan"
    )