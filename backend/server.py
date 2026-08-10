from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL', '')

if RESEND_API_KEY:
    import resend
    resend.api_key = RESEND_API_KEY

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)


class ContactMessage(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


@api_router.get("/")
async def root():
    return {"message": "BALA OS backend online", "system": "BRAND NEW DAY"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/contact")
async def send_contact(msg: ContactMessage):
    doc = {
        "id": str(uuid.uuid4()),
        "name": msg.name,
        "email": msg.email,
        "message": msg.message,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_messages.insert_one(doc)

    emailed = False
    if RESEND_API_KEY and CONTACT_EMAIL:
        html = f"""
        <table style="width:100%;background:#050505;padding:24px;font-family:monospace;">
          <tr><td style="background:#0f172a;border:2px solid #e11d48;padding:24px;color:#f8fafc;">
            <h2 style="color:#e11d48;margin:0 0 16px;">WEB SIGNAL RECEIVED</h2>
            <p style="color:#94a3b8;margin:4px 0;">FROM: <b style="color:#f8fafc;">{msg.name}</b></p>
            <p style="color:#94a3b8;margin:4px 0;">EMAIL: <b style="color:#f8fafc;">{msg.email}</b></p>
            <hr style="border-color:#1e293b;margin:16px 0;"/>
            <p style="color:#f8fafc;white-space:pre-wrap;">{msg.message}</p>
            <hr style="border-color:#1e293b;margin:16px 0;"/>
            <p style="color:#475569;font-size:11px;">Sent from BALA OS — Brand New Day portfolio</p>
          </td></tr>
        </table>
        """
        params = {
            "from": SENDER_EMAIL,
            "to": [CONTACT_EMAIL],
            "subject": f"Web Signal from {msg.name} — BALA OS",
            "html": html,
        }
        try:
            import resend
            await asyncio.to_thread(resend.Emails.send, params)
            emailed = True
        except Exception as e:
            logger.error(f"Resend delivery failed: {e}")

    return {"status": "success", "id": doc["id"], "emailed": emailed}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
