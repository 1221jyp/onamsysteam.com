# 수행평가 공지사이트

## 사이트 주소 : https://1uton.com

## 개발환경 : localhost:5500

### 프로덕션 환경에서 실행시킬 명령어

```
    docker compose -f docker-compose.prod.yml up
```

### 개발 환경에서 실행시킬 명령어

```
    docker compose up
```

### 도커 이미지 빌드 명령어

```
    DOCKER_DEFAULT_PLATFORM=linux/amd64 docker compose build --no-cache
```

### 도커허브에 업로드

```
    docker tag expressjs-react-server 1221jyp/luton:latest
    docker push 1221jyp/luton:latest
```

### 루트 폴더에서 client 수정했을때

```
    make build
```

### 서버에서 pull 받아오기

```
    docker pull 1221jyp/luton:latest
```

### 서버에서 WAS 키기

```
    docker run -p 5500:5500 1221jyp/luton:latest
```
