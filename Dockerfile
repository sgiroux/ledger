#syntax = edrevo/dockerfile-plus

INCLUDE+ server/Dockerfile.base

INCLUDE+ client/Dockerfile.base 

FROM node:18.7-alpine

WORKDIR /app

COPY --from=NEST_BUILDER /app /app/server
COPY --from=NEXT_BUILDER /app /app/client


ENV CONFIG_DIRECTORY=/app/config
ENV PLAID_ENVIRONMENT=null
ENV PLAIND_CLIENT_ID=null
ENV PLAID_SECRET=null


COPY entrypoint.sh /usr/local/bin
ENTRYPOINT [ "sh", "/usr/local/bin/entrypoint.sh" ]

EXPOSE 5000 3000
VOLUME "/app/config"

