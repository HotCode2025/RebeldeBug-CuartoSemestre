##FROM python:3.10.12

##WORKDIR /app

##COPY README.md /app/README.md

###RUN pip install --no-cache-dir --upgrade -r /app/README.md

###COPY . /app

##CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]

FROM python:3.10

WORKDIR /app

# Forzamos la instalación manual directa de las librerías web aquí
RUN pip install --no-cache-dir fastapi uvicorn

COPY . /app
