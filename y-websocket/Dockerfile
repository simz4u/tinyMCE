# 베이스 이미지
FROM node:20-alpine

# 작업 디렉토리 생성
WORKDIR /app

# y-websocket 설치
RUN npm install @y/websocket-server

# 포트 오픈
EXPOSE 1234

# 실행 명령
CMD ["sh", "-c", "HOST=0.0.0.0 PORT=1234 npx y-websocket"]
