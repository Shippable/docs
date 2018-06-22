FROM drydock/u16microbase:v6.5.4

ADD . /home/shippable/docs

RUN cd /home/shippable/docs && pip install -r requirements.txt

ENTRYPOINT ["/home/shippable/docs/boot.sh"]

EXPOSE 5555
