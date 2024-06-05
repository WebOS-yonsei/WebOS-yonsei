# Media Web Application 시청 프로그램

## 1. Overview

### 1.1 목적 (Purpose)
본 문서의 목적은 다음과 같습니다:
- 요구 사항 분석: System의 Fuctional 및 Non Functional Requirements를 명확히 정의하여 모든 이해관계자들이 동일한 이해를 갖도록 합니다. 

- 설계 Guide Line 제공: System Architecture, Database Design, Interface, 주요 Components간의 상호작용에 대한 명확한 지침을 제공하여 팀이 일관되게 작업할 수 있도록 합니다. 
- Communication 도구: 이해관계자 간의 효과적인 Communication을 지원하여 프로젝트 진행 상황과 방향성에 대한 명확한 이해를 돕습니다.  

### 1.2 범위 (Scope)
설계 문서의 범위는 다음과 같습니다:
- System 개요: Media Web Application 시청 프로그램의 목적과 주요 기능에 대한 개요를 제공합니다.

- Architecture 개요: System의 전반적인 Architecture, 주요 Component, 이들 간의 상호 작용을 설명합니다.

- Data Model: Database 설계, 주요 Entity, 속성, 관계 및 데이터 흐름을 포함합니다.

- Interface 설계: 사용자 인터페이스(UI) 및 시스템 간 인터페이스(API) 설계를 포함합니다.
### 1.3 개발 환경 (Development Environment)
- OS: Ubuntu 20.04

- FrontEnd: Enact

- BackEnd: Spring

- Database: MySQL
## 2. Architectural Driver
### 2.1. UseCase Diagram
<img src=".\docs\images\usecasediagram.png" alt="cover" />

### 2.2. Functional Requirements
|ID|Function|Description|Priority|
|--|-------------|---|---|
|테스|테스트2|테스트3|테스트3|
|테스|테스트2|테스트3|테스트3|
### 2.3. Non-Functional Requirements
#### 2.3.1. 성능 (Perfomance)
- 응답 시간: 모든 User Interface 요청은 2초 이내에 응답해야 합니다. 

- 동시 사용자 수용량: System은 최대 10,000명의 동시 사용자를 지원할 수 있어야 합니다. 

- 스트리밍 속도: HD 영상 스트리밍은 버퍼링 없이 제공되어야 합니다. 
#### 2.3.2. 확장성 (Scalability)
- 수평 확장성: System은 필요에 따라 서버를 추가하여 수평적으로 확장할 수 있어야 합니다. 

- 데이터베이스 확장성: 데이터베이스는 증가하는 사용자와 데이터 양에 따라 확장 가능해야 합니다.  
#### 2.3.3. 보안 (Security)
- 데이터 암호화: 모든 데이터 전송은 SSL/TLS를 통해 암호화되어야 합니다. 

- 사용자 인증: OAuth 2.0 프로토콜을 사용하여 사용자 인증을 처리합니다. 사용자가 로그인하면 Access Token이 발급되며, 이 토큰을 통해 사용자는 인증된 세션을 유지 할 수 있습니다. 

- 세션 관리: 발급된 Access Token은 사용자 세션을 유지하는데 사용되며, Token의 유효 기간 동안 사용자는 지속적으로 인증된 상태를 유지합니다. Token이 만료되면 자동으로 갱신 요청을 통해 새로운 Token을 발급 받습니다. 

- 권한 부여: 각 사용자는 할당된 역할에 따라 다른 권한을 가집니다. 사용자 요청 시 액세스 토큰에 포함된 권한 정보를 기반으로 접근 제어가 이루어집니다.

- 토큰 보안: 모든 토큰은 안전하게 저장 및 전송되어야 하며, 토큰 탈취를 방지하기 위해 HTTPS를 사용합니다. 또한, 토큰은 짧은 유효 기간을 가지며, 정기적으로 갱신이 필요합니다.

#### 2.3.4. 신뢰성 (Reliability)
- 가용성: 시스템 가용성은 99.9% 이상이어야 합니다.

- 백업 및 복구: 데이터는 매일 백업되며, 재해 복구 계획이 마련되어 있어야 합니다.

- 장애 대응: 시스템 장애 발생 시 1시간 이내에 복구가 가능해야 합니다. 

## 3. Architectural Overview
### 3.1. Frontend Architecture
### 3.2. Backend Architecture
## 4. Data Design
### 4.1. Database Schema
<img src=".\docs\images\dataschema.png" alt="cover" />

### 4.2 Data Model
