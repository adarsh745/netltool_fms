# background task for processing video transcript
from app.db.database import sessionLocal
from sqlalchemy.orm import Session
from app.models.Video import Video
from faster_whisper import WhisperModel
from app.services.AI.ai_service import generate_blog_with_ollama


def process_video_transcript(video_id: int):
    try:
        db: Session = sessionLocal()
        video = db.query(Video).filter(Video.id == video_id).first()
        video.video_status = "processing"
        db.commit()

        model = WhisperModel(
            "base",
            device="cpu",
            compute_type="int8"
        )

        video.video_status = "10"
        db.commit()
        segments, info = model.transcribe(
            video.url
        )
        audio_duration = info.duration
        print(f"Audio duration: {audio_duration} seconds")
        last_commited_progress  =10 
        COMMIT_THRESHOLD = 5
        transcript = ""
        # total_segments = len(segments)
        for segment in segments:
            transcript += segment.text + " "
            raw_progress = (segment.end / audio_duration) * 85 + 10
            progress = min(int(raw_progress), 95)
            if progress - last_commited_progress >= COMMIT_THRESHOLD:
                video.video_status = str(progress)
                db.commit()
        last_committed_progress = progress
        video.transcript = transcript
        draft = generate_blog_with_ollama(video_id=video_id, video_title=video.title, video_transcript=transcript, db=db)
        print("this is the draft" , draft)
        video.video_status = "completed"
        db.commit()
    except Exception as e:
        video.video_status = "error"
        db.commit()
        print(
            f"Error processing video transcript for video ID {video_id}: {str(e)}")
