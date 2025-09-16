FROM alpine:3.14
RUN apk add --no-cache git

WORKDIR /usr/src

RUN git clone https://codeberg.org/SystemCrafters/craftering.git

COPY ./webring.sh /usr/scripts/

RUN chmod +x /usr/scripts/webring.sh
RUN mkdir /usr/websites

RUN /usr/scripts/webring.sh

RUN echo "0 4 * * * /usr/scripts/webring.sh" > /etc/crontabs/root

CMD ["crond", "-f"]
