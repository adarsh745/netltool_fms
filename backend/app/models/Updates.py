from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import base


class Updates(base):
    __tablename__ = "updates"

    id = Column(Integer, primary_key=True, autoincrement=True)

    title = Column(String, nullable=False)
    content = Column(String)

    projectId = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=False
    )

    image = Column(String)

    progress = Column(Integer)  # 0 - 100

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    project = relationship(
        "Projects",
        back_populates="updates"
    )