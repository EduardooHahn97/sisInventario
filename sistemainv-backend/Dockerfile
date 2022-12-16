FROM python 3.9
COPY ./sistemainv-backend 
WORKDIR ./sistemainv-backend

ENV DEBIAN_FRONTEND noninteractive
ENV ACCEPT_EULA=Y

RUN apt-get update \
    && apt-get install -y \
    gcc \
    g++ \
    && apt-get clean

RUN apt-get install build-essential -y
RUN apt-get install -y apt-transport-https

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "--worker-class"m "uvicorn.workers.UvicornWorker", '--bind', "0.0.0.0:8000", "--workes", "4"] 