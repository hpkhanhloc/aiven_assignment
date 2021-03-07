FROM python:3.8-slim-buster

WORKDIR /app

COPY . ./

RUN apt-get update \
    && pip3 --no-cache-dir install -r /app/requirements.txt \
    && apt-get update

ENV GUNICORN_PARAMETERS=${GUNICORN_PARAMETERS:-"-w 1 -k uvicorn.workers.UvicornWorker -b :8080 --preload"}
CMD gunicorn main:app ${GUNICORN_PARAMETERS}