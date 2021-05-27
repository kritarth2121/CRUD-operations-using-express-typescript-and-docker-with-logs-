FROM alpine:latest
RUN apk add --no-cache nodejs npm
WORKDIR /dist
COPY . /dist
RUN npm install
EXPOSE 3000
ENTRYPOINT ["node"]
CMD ["dist/app.js"]
# // docker images
# //docker build -tapi:latest .
# // sudo docker run -it -d -p 3000:3000 api:latest
# //6be6b63df1faa24df6ec0533c61cf75cfbdaa7734bca165cbf5ac8360d49ed5f