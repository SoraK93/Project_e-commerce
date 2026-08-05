import os

import model

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import setting
from router.auth import router as auth
from router.product import router as products
from router.user import router as user
from router.cart import router as cart
from router.order import router as order

load_dotenv()

app = FastAPI(
    title="E-Commerce App Backend",
    description="This is the backend of my E-Commerce App"
)

app.add_middleware(CORSMiddleware,
                   allow_origins=[setting.CLIENT_URL, setting.RENDER_URL],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

app.include_router(products)
app.include_router(auth)
app.include_router(user)
app.include_router(cart)
app.include_router(order)


@app.get("/")
async def root():
    return {"message": "Welcome to E-Commerce App Backend"}


@app.get("/health-check")
async def health_check():
    return {"message": "Running successfully"}


if __name__ == "__main__":
    if os.getenv("RENDER"):
        print("Starting Production Server...")
        uvicorn.run(
            "main:app",
            host=setting.SERVER_HOST,
            port=setting.SERVER_PORT,
        )
    else:
        print("Starting Local Development Server with SSL...")
        uvicorn.run(
            "main:app",
            host=setting.SERVER_HOST,
            port=setting.SERVER_PORT,
            reload=True,
            ssl_certfile="./localhost+3.pem",
            ssl_keyfile="./localhost+3-key.pem"
        )
