# WeatherTogether

### 💡 계기
날씨에 둔감하여 항상 추위에 떨거나 더위를 탔던 나. 매일의 날씨를 메모하고 일기와 옷차림에 대한 간략한 정보를 써두면 좋지 않을까? 이 정보를 친구들과 공유하고 하루의 메시지를 남겨보자! 


-------------                                                


### 📗 목차
1. [기획 및 설계](#기획-및-설계)
2. [기술 스택](#기술-스택)
3. [트러블 슈팅](#트러블-슈팅)
-------------                                                

### ✏️
### 기획 및 설계
#### < 화면 > 
    1. 메인 페이지
      1-1. 오늘의 기분
      1-2. 오늘의 옷차림 
    2. 세부 날씨 페이지
      2-1. 해당 날짜의 기분
      2-2. 해당 날짜의 옷차림
    3. 메세지함
      3-1. 세부 메세지 보기
    4. 계정 페이지
      4-1. 회원가입 페이지
      4-2. 로그인 페이지
    
    

#### < 상세 페이지 설명 > 
* 1.메인 페이지
  * ![image](https://user-images.githubusercontent.com/91399033/164986691-3ecc5512-3be8-4912-9f85-e48c2d590575.png)
 
  *  맨 처음으로 보여지는 페이지 
  *  현재의 기온 , 날짜와 시간 정보 
  *  해시태그로 날씨 정보 노출 : 기온에 따라서 자동으로 미리 입력해둔 해시태그가 나옴  
  *  오늘 나의 상태 입력 칸 
      
* 1-1. 오늘의 기분 
  * ![image](https://user-images.githubusercontent.com/91399033/164986712-5a2d1d0d-46f6-4513-b424-44b4b9a7cb8f.png)

  * 경로 : 메인페이지 > 오늘 나의 상태의 태양 버튼
  * 오늘 날짜 자동 입력
  * 오늘의 기분 선택
  * 일기나 메모 작성
  * 저장 버튼 / 취소 버튼
      
* 1-2. 오늘의 옷차림 작성
  * ![image](https://user-images.githubusercontent.com/91399033/164986728-619da6a4-a2bc-4961-b9b3-8cb01e5d2215.png)

  * 경로 : 메인페이지 > 오늘 나의 상태의 티셔츠 버튼
  * 오늘 날짜 자동 입력
  * 메모 작성
  * 옷차림 사진 삽입 버튼
  * 저장 버튼 /  취소 버튼

       
* 2.세부 날씨 페이지
  *  ![image](https://user-images.githubusercontent.com/91399033/164986281-442cd0b1-0c87-49d3-b558-3e11bae4ad16.png)
  * 경로 :  메인페이지 > 오른쪽 중앙에 세모 버튼(or 슬라이드)
  * 시간대별 날씨
  * 주간 날씨
  * 주간 나의 기분 
  * 주간 나의 옷차림
  

* 2-1. 해당 날짜의 기분
  * ![image](https://user-images.githubusercontent.com/91399033/164986300-d254af7f-c820-41d9-b68c-9dffd78924f9.png)
 
  * 날짜와 날씨 자동 입력
  * 작성된 기분과 일기 노출
  * 취소 버튼

* 2-2. 해당 날짜의 옷차림
   * ![image](https://user-images.githubusercontent.com/91399033/164986315-3fb83ddc-816a-427d-99de-0628d8cb76b0.png)
  
   * 날짜와 날씨 자동 입력
   * 작성된 메모와 사진 노출
   * 취소 버튼

* 3.메세지함
  * ![image](https://user-images.githubusercontent.com/91399033/164986324-1342c333-5348-43f7-8679-40e6f57ad000.png)
 
  * 경로 : 메인페이지 > 하단의 세모 버튼(or 슬라이드)
  *  새로운 메시지가 개수 노출
  *  날씨 이모티콘으로 메시지 표현
  *  사진과 원하는 이모티콘, 메시지 작성 가능

* 3-1. 세부 메시지 보기 
  *  ![image](https://user-images.githubusercontent.com/91399033/164986332-24da5cc3-ae6a-4777-8ada-97d9079d44c8.png)

  * 보낸이
  * 메세지
  * 보낸이의 오늘 옷차림 보러가기 버튼
  * 취소 버튼 
  
* 4.계정 페이지
  * ![image](https://user-images.githubusercontent.com/91399033/164986379-7b91f7cf-4f36-49f1-9d4e-fc70826837fa.png)
  * 경로 : 메인페이지 > 햄버거바
  * 로그인 및 로그아웃    
  * 계정삭제
 
* 4-1. 회원가입 페이지
  * ![image](https://user-images.githubusercontent.com/91399033/164987349-e069bca2-e791-485c-a4b9-2032c486863e.png)
  

* 4-2. 로그인 페이지
  *  ![image](https://user-images.githubusercontent.com/91399033/164987368-bab55f38-c9a0-4fe7-bc7f-cf9e5fc041d0.png)

 


#### < 추가 공통 기능 >
    1. 다크 / 라이트 모드
    2. 회원가입 / 로그인 - oauth
    3. 사진첨부 : 
   

-------------    
### 💻
### 기술 스택
>#### API 
>       날씨 API 사용 : https://weatherstack.com/

>#### FE
>      언어 : Typescript
>      프레임워크 : React
>      css : tailwind vs emotion
>      상태관리 : Redux
>      fetch : react-query 

>#### BE
>     배포 : Firebase 
>     DB : NoSQL - Firebase DB
>       

-------------  
### 🔥
### 트러블 슈팅
..
-------------
