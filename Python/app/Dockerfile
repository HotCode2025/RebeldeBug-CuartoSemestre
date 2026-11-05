FROM python:3.10.12

WORKDIR /app

COPY README.md /app/README.md

RUN pip install --no-cache-dir --upgrade -r /app/README.md

COPY . /app

CMD bash -c "while true; do sleep 1; done" 