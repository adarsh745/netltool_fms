import os
from dotenv import load_dotenv
import requests
from app.models.blog_draft import Draft
from sqlalchemy.orm import Session

load_dotenv()
ollama_api_url = os.getenv("OLLAMA_URL")

def generate_blog_with_ollama(video_id: str, video_title: str, video_transcript: str, db: Session):
    if not video_id or not video_title or not video_transcript:
        print("Invalid video details")
        return None

    existing_draft = db.query(Draft).filter(Draft.video_id == video_id).first()
    if existing_draft:
        print("Draft already exists for this video")
        return existing_draft

    prompt = f"""..."""  # keep your prompt as-is

    new_draft = Draft(video_id=video_id, response="", status="Processing")
    db.add(new_draft)
    db.commit()

    try:
        response = requests.post(
            ollama_api_url,
            json={"prompt": prompt, "model": "llama3", "stream": False},
            timeout=300  # Ollama can be slow — add a timeout
        )
        response.raise_for_status()

        data = response.json()

        # ✅ Bug 3 fix: Ollama wraps output in {"response": "..."}
        html_content = data.get("response", "")

        # ✅ Bug 1 fix: actually assign the response to the draft
        new_draft.response = html_content
        new_draft.status = "Draft"
        # ✅ Bug 2 fix: no db.add() — object is already tracked by SQLAlchemy
        db.commit()

        return new_draft

    except requests.exceptions.RequestException as e:
    # ✅ Print the actual response body — Ollama puts the error reason here
        if e.response is not None:
            print(f"Ollama error body: {e.response.text}")
        new_draft.status = "Error"
        db.commit()
        print(f"Error generating blog with Ollama: {e}")
        return None 