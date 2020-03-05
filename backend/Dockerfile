FROM ubuntu:latest
COPY ./flaskr /flaskr
COPY ./migrations /migrations
COPY ./config.py /config.py
COPY ./run.py /run.py
COPY ./requirements.txt /requirements.txt
WORKDIR /
ENV FLASK_CONFIG prod
RUN apt-get update -y && \
    apt-get install -y python-pip python-dev
RUN pip install -r requirements.txt

RUN python run.py db stamp heads
RUN python run.py db migrate
RUN python run.py db upgrade
EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["run.py" , "start"]