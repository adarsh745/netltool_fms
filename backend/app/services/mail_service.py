from fastapi import HTTPException
from fastapi_mail import FastMail , MessageSchema , MessageType , ConnectionConfig
from app.utils.mail_config import mail_config
from typing import List
from app.schemas.email_schema import EmailRequest


async def send_mail(mail_config: ConnectionConfig, email_data: EmailRequest):
    try:
        message = MessageSchema(
            subject=email_data.subject,
            recipients=email_data.to,
            cc=email_data.cc,
            body=email_data.body,
            subtype=MessageType.plain
        )
        await FastMail(mail_config).send_message(message)
        return True, "Mail sent successfully"
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

