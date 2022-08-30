#syntax = edrevo/dockerfile-plus

INCLUDE+ server/Dockerfile.base

INCLUDE+ client/Dockerfile.base 

FROM node:18.7-alpine

WORKDIR /app
COPY --from=NEST_BUILDER /app server
COPY --from=NEXT_BUILDER /app client

#ENTRYPOINT ["tail", "-f", "/dev/null"]
COPY entrypoint.sh /usr/local/bin
ENTRYPOINT [ "sh", "/usr/local/bin/entrypoint.sh" ]

EXPOSE 5000 3000
