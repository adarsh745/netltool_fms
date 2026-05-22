from fastapi import HTTPException
from fastapi_mail import FastMail , MessageSchema , MessageType , ConnectionConfig
import os
from dotenv import load_dotenv
from app.utils.mail_config import mail_config
from typing import List
from app.schemas.email_schema import EmailRequest

load_dotenv()

async def send_mail(
    mail_config: ConnectionConfig,
    email_data: EmailRequest
):
    try:
        print(os.getenv("MAIL_USERNAME"))
        print(os.getenv("MAIL_SERVER"))
        print(os.getenv("MAIL_PORT"))

        message = MessageSchema(
            subject=email_data.subject,
            recipients=email_data.to,
            cc=email_data.cc or [],
            body=email_data.body,
            subtype=MessageType.plain
        )

        await FastMail(mail_config).send_message(message)

        return True, "Mail sent successfully"

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )