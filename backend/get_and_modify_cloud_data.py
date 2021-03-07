import requests
import env
import json
from fastapi.exceptions import HTTPException
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR


def get_and_modify_cloud_data(method: str, url: str):
    cloud_data = make_request(method=method, url=url)["clouds"]
    modified_cloud_data = add_cloud_provider(cloud_data)
    return modified_cloud_data


def add_cloud_provider(cloud_data: list):
    provider_lookup = {"aws": "Amazon", "azure": "Azure",
                       "google": "Google", "do": "DigitalOcean", "upcloud": "UpCloud"}
    for cloud in cloud_data:
        for i in list(provider_lookup.keys()):
            if i in cloud["cloud_name"]:
                provider = i
        cloud["cloud_provider"] = provider_lookup.get(provider)
    return cloud_data


def make_request(method: str, url: str, data=None, headers=None):
    with requests.Session() as session:
        response = session.request(
            method=method, url=f"{env.BASE_URL}{url}", data=data, headers=headers)

    if response.status_code != 200:
        raise HTTPException(HTTP_500_INTERNAL_SERVER_ERROR,
                            f"Bad response from application: {response.status_code} {response.text}")
    else:
        return json.loads(response.text)
