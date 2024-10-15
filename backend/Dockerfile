FROM python:3.12

WORKDIR /app/

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y postgresql-client

COPY . /app/

CMD ["sh", "entrypoint.sh"]