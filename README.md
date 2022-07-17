# <center>TYPE TYPE MUSIC</center>

### <center> 💡 아이디어를 떠올리게 된 계기... </center>

코딩을 하고 있던 어느 날, 컴퓨터 화면 속에 있는 코드들이 무척 단조로워 보였던 때가 있었습니다. 당시에 아무런 소리를 내지 않는 코드가 화면에 틀어박혀 있는 듯한 느낌을 받았습니다. 그러다 문득, 코드들이 살아 움직여서 음악이 되어 들어보는 상상을 해보았습니다.

코드를 컴퓨터 코드로만 볼 필요가 없다고 생각이 들었습니다. 그러자 컴퓨터 코드가 꼭 악보와 같이 보이기 시작했고, 컴퓨터 코드와 악보는 공통점이 있다고 생각되었습니다. 개발자가 짠 코드를 정해진 규칙으로 컴퓨터가 읽으면서 내려가듯이, 음악도 작곡가가 작성한 음악 코드에 따라 연주가 되기 때문입니다.

그렇다면 내가 짠 코드는 어떤 소리를 낼까요? 그것은 과연 좋은 음악이 될까요 나쁜 음악이 될까요? 이제는 나의 코드를 "읽지" 말고 멜로디로 "들어" 보세요.

<br/>

### 🪁 같이 코드를 작성.. 아니, 코드로 작곡하러 가보실래요?

> 작곡하러 가보기 https://joyful-druid-5ea444.netlify.app

<br/>

## 🛰 배포

```
- 프론트엔드 웹사이트 배포: Netlify
- 백엔드 웹사이트 배포: AWS EB (Elastic Beanstalk)
- SSL 발급 및 관리: Amazon ACM (AWS Certificate Manager)
- HTTPS Listener 생성: Elastic Load Balancing
```

<br/>

## 📆 작업 기간

- **기획** : 1주차 (2022/06/27 ~ 2022/07/03)
  - 아이디어 구상 및 기술 스택 선택
- **개발** : 2, 3주차 (2022/07/04 ~ 2022/07/17)
  - 코드 작성 및 배포

<br/>

## ⚙️ 기술 스택

- 프론트엔드
  - `React`
  - `recoil`
  - `Tone.js`
- 백엔드

  - `Node`
  - `Express`
  - `MongoDB`

- 기타
  - Storage: `AWS S3 bucket`
  - Login: `firebase`

<br/>

## 🎵 음악이 흘러나오는 로직

프로젝트를 진행하면서 가장 고민했던 부분은 어떻게 하면 조화로운 음악을 만들 수 있을까였습니다. 단순히 키 하나에 음을 하나씩 매핑해서 듣는다면, 절대 듣기 좋은 소리를 만들어낼 수가 없었기 때문입니다. 그래서 여러가지 작곡법을 알아보던 중, 코드(Chord, 화음)톤을 기반으로 한 작곡법을 기반으로 음악 로직을 구상하기로 결정했습니다. 이는 코드로 먼저 멜로디를 만든 후에 코드톤에 해당하는 음들로만 더 섬세하게 멜로디를 만들어내는 작곡법입니다. 하나의 글자는 하나의 코드톤에 해당하도록 짜고 그 코드톤에 해당하는 음들로 나머지 악보를 만들어줬습니다.

## 💾 프로젝트 설치 및 실행 방법

- Frontend

```
git clone https://github.com/minjugg/type-type-music-frontend.git
npm install
npm run start
```

- Backend

```
git clone https://github.com/minjugg/type-type-music-backend.git
npm install
npm run nodemon
```

- Frontend & Backend 동시 실행 방법

```
각각 위 두 가지 과정을 npm install 까지 실행한 후
npm run con
```
