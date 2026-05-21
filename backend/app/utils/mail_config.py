import os
from dotenv import load_dotenv
from fastapi_mail import ConnectionConfig

load_dotenv()

try:
    mail_port = int(os.getenv("MAIL_PORT", 587))
except ValueError:
    mail_port = 587

def _str_to_bool(value: str, default: bool) -> bool:
    if value is None:
        return default
    return value.lower() in ("true", "1", "t", "yes")

mail_starttls = os.getenv("MAIL_STARTTLS")
if mail_starttls is None:
    mail_starttls = os.getenv("USE_TLS")

mail_ssl_tls = os.getenv("MAIL_SSL_TLS")
if mail_ssl_tls is None:
    mail_ssl_tls = os.getenv("USE_SSL")

mail_config = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", ""),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", ""),
    MAIL_FROM=os.getenv("MAIL_FROM", ""),
    MAIL_PORT=mail_port,
    MAIL_SERVER=os.getenv("MAIL_SERVER", ""),
    MAIL_FROM_NAME=os.getenv("MAIL_FROM_NAME", "Netltool"),
    MAIL_STARTTLS=_str_to_bool(mail_starttls, True),
    MAIL_SSL_TLS=_str_to_bool(mail_ssl_tls, False)
)