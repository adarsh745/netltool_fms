from pydantic import BaseModel

class BlogCreateRequest(BaseModel):
    title: str
    content: str
    video_id: int | None = None
    tags: str | None = None
    summary: str | None = None
    components: str | None = None