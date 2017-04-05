FROM shipimg/microbase:master.50994

ADD . /home/shippable/docs

RUN cd /home/shippable/docs && pip install -r requirements.txt

ENTRYPOINT ["/home/shippable/docs/boot.sh"]

EXPOSE 5555
