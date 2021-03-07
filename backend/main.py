from typing import Optional
from fastapi import FastAPI
from get_and_modify_cloud_data import get_and_modify_cloud_data

app = FastAPI()


@app.get("/api/clouds")
async def get_list_available_cloud_platforms():
    return get_and_modify_cloud_data(method="GET", url="/v1/clouds")
