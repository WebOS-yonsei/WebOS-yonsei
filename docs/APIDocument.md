Need to install the following packages:
openapi-to-md@1.0.24
Ok to proceed? (y) 
# Webos Yonsei

> Version 1.0.0

Webos Yonsei API 명세서

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| GET | [/users](#getusers) | 현재 사용자 조회 |
| POST | [/users/login](#postuserslogin) | 로그인 |
| POST | [/users/join](#postusersjoin) | 회원 가입 |
| POST | [/profiles](#postprofiles) | 프로필 생성 |
| POST | [/profiles/{profileId}](#postprofilesprofileid) | 프로필 선택 |
| POST | [/profiles/exit](#postprofilesexit) | 프로필 종료 |
| GET | [/profiles/{profileId}/history](#getprofilesprofileidhistory) | 프로필 시청 기록 조회 |
| GET | [/profiles/list](#getprofileslist) | 프로필 목록 조회 |
| POST | [/file](#postfile) | 파일 업로드 |
| GET | [/videos](#getvideos) | 컨텐츠 목록 조회 |
| GET | [/videos/{videoId}](#getvideosvideoid) | 컨텐츠 정보 조회 |
| POST | [/videos/{videoId}/time](#postvideosvideoidtime) | 시청 시간 기록 |

## Path Details
***
### User 관련
***

### [POST]/users/join

- Summary: 회원 가입

- Description: 새로운 사용자를 등록합니다.

#### RequestBody

- application/json

```ts
// 회원 가입 요청 정보
{
    "loginId": "gitchan"
    "password": "webos"
}
```

#### Responses

- 200 성공적으로 회원 가입을 완료했습니다.

`*/*`
- 400 잘못된 요청입니다.

- 409 중복된 사용자입니다.

***

### [POST]/users/login

- Summary: 로그인

- Description: 사용자가 로그인합니다.

#### RequestBody

- application/json

```ts
// 로그인 요청 정보
{
    loginId: "gitchan"
    password: "webos"
}
```

#### Responses

- 200 성공적으로 로그인을 완료했습니다.
```ts
// 로그인 응답 정보
{
    sessionId: 1
}
```

`*/*`
- 400 잘못된 요청입니다.

- 401 유효하지 않은 사용자 이름 또는 비밀번호입니다.


***

### [GET]/users

- Summary: 현재 사용자 조회

- Description: 현재 로그인한 사용자의 정보를 조회합니다.

- Security: Authorization(Session Id)

#### Responses

- 200 성공적으로 사용자 정보를 조회했습니다.

```ts
{
    loginId: "gitchan"
    nickname: "닉네임"
    profileURI: "https://..."
}
```
`*/*`

- 401 인증되지 않은 사용자입니다.
- 403 접근이 금지되었습니다.
- 404 요청한 리소스를 찾을 수 없습니다.

***
### Profile 관련
***

### [POST]/profiles

- Summary: 프로필 생성

- Description: 사용자의 새로운 프로필을 생성합니다.

- Security: Authorization(Session Id)

#### RequestBody

- application/json

```ts
// 프로필 생성 요청 정보
{
    nickname: "깃짱"
    profileUri: "https://3rkewj4g32rk41r5t45r"
    grade: enum[CHILD, ADULT]
    profilePassword: "0123"
}
```
#### Responses

- 201 성공적으로 프로필을 생성했습니다.
  `Location: /profiles/{profileId}`

`*/*`
- 400 잘못된 요청입니다.
- 401 인증되지 않은 사용자입니다.
- 403 접근이 금지되었습니다.

***

### [POST]/profiles/{profileId}

- Summary: 프로필 선택

- Description: 사용자가 특정 프로필을 선택합니다.

- Security: Authorization(Session Id)

#### Responses

- 200 성공적으로 프로필을 선택했습니다.

`*/*`
- 400 잘못된 요청입니다.

- 401 인증되지 않은 사용자입니다.

- 403 접근이 금지되었습니다.

***

### [POST]/profiles/exit

- Summary: 프로필 종료

- Description: 사용자가 현재 프로필에서 종료합니다.

- Security: Authorization(Session Id)

#### Responses

- 200 성공적으로 프로필에서 종료했습니다.

`*/*`
- 400 잘못된 요청입니다.

- 401 인증되지 않은 사용자입니다.

- 403 접근이 금지되었습니다.

***
### [GET]/profiles/list

- Summary: 프로필 목록 조회

- Description: 사용자의 프로필 목록을 조회합니다.

- Security: Authorization(Session Id)

#### Responses

- 200 성공적으로 프로필 목록을 조회했습니다.

```ts
{
  profiles: [
      {
          id: integer
          userId: integer
          nickname: string
          imageURI: string
          grade: enum[CHILD, ADULT]
          password: string
      }
  ]
}
```
`*/*`

- 401 인증되지 않은 사용자입니다.
- 403 접근이 금지되었습니다.
- 404 요청한 리소스를 찾을 수 없습니다.
***
### [GET]/profiles/{profileId}/history

- Summary: 프로필 시청 기록 조회

- Description: 특정 프로필의 시청 기록을 조회합니다.

- Security: Authorization(Session Id)

#### Responses

- 200 성공적으로 시청 기록을 조회했습니다.

```ts
{
  videos: [
      {
          id: integer
          title: string
          description: string
          duration: number
          grade: enum[CHILD, ADULT]
          thumbnailURI: string
          genre: string
          sourceURI: string
      }
  ]
}
```
`*/*`

- 401 인증되지 않은 사용자입니다.
- 403 접근이 금지되었습니다.
- 404 요청한 리소스를 찾을 수 없습니다.

***
### File 관련
***
### [POST]/file

- Summary: 파일 업로드

- Description: 사용자가 파일을 업로드합니다.

- Security: Authorization(Session Id)

#### RequestBody

- 'Content-Type': 'multipart/form-data'

#### Responses

- 200 성공적으로 파일을 업로드했습니다.

```ts
// 저장된 파일 경로 리턴
{
    "url": "https://server.web.os/thumbnail.jpg"
}
```

`*/*`

- 400 잘못된 요청입니다.
- 401 인증되지 않은 사용자입니다.
- 403 접근이 금지되었습니다.

***
### Video 관련
***
### [GET]/videos

- Summary: 컨텐츠 목록 조회

- Description: 사용자의 연령(등급)에 따라 비디오 컨텐츠 목록을 반환합니다.

- Security: Authorization  

#### Responses

- 200 성공적으로 목록을 조회했습니다.

```ts
{
  contents: [
      {
          id: integer
          title: string
          description: string
          duration: number
          grade: enum[CHILD, ADULT]
          thumbnailURI: string
          genre: string
          sourceURI: string
      }
  ]
}
```

`*/*`
- 401 인증되지 않은 사용자입니다.
- 403 접근이 금지되었습니다.
- 404 요청한 리소스를 찾을 수 없습니다.

***

### [GET]/videos/{videoId}

- Summary: 컨텐츠 정보 조회

- Description: 특정 비디오 컨텐츠의 상세 정보를 반환합니다.

- Security: Authorization(Session Id)  

#### Responses

- 200 성공적으로 정보를 조회했습니다.

```ts
{
    {
        id: integer
        title: string
        description: string
        duration: number
        grade: enum
        [CHILD, ADULT]
        thumbnailURI: string
        genre: string
        sourceURI: string
        currentPlaybackTime: number
    }
}
```

`*/*`
- 404 요청한 리소스를 찾을 수 없습니다.

***

### [POST]/videos/{videoId}/time

- Summary: 시청 시간 기록

- Description: 사용자가 특정 비디오를 본 시간을 기록합니다.

- Security: Authorization(Session Id)

#### RequestBody

- application/json

```ts
// 시청 시간 요청 본문
{
    "time": "24:02:11"
}
```

#### Responses

- 200 성공적으로 시간을 기록했습니다.

`*/*`
- 400 잘못된 요청입니다.

- 404 요청한 리소스를 찾을 수 없습니다.

***
