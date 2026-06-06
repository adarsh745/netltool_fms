import os
from fastapi import UploadFile, File, HTTPException
OUT_DIR = "uploads/profiles"


os.makedirs(OUT_DIR, exist_ok=True)

def validate_profile_image(
    profile_image: UploadFile = File(...)
):
    allowed_extensions = [".jpg", ".jpeg", ".png"]

    extension = os.path.splitext(profile_image.filename)[1]

    if extension.lower() not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )

    return profile_image

def upload_profile_image(
    profile_image: UploadFile,
    user_id: int
):
    extension = os.path.splitext(profile_image.filename)[1]
    file_name = f"user_{user_id}{extension}"
    file_path = os.path.join(OUT_DIR, file_name)

    with open(file_path, "wb") as f:
        f.write(profile_image.file.read())

    return file_path
