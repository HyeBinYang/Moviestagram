# ๐ฅ Moviestagram v1.0.0 (์ํ๋ฆฌ๋ทฐ ์ปค๋ฎค๋ํฐ)

## ๐ค ์ฌ์ฉํ ๊ธฐ์  ์คํ์ ์ด๋ค๊ฑด๊ฐ์?

![Generic badge](https://img.shields.io/badge/ReactJS-v17.0.2-61DAFB?logo=react&style=flat)
![Generic badge](https://img.shields.io/badge/Redux-v4.1.2-%23593d88.svg?logo=redux&style=flat)
![Generic badge](https://img.shields.io/badge/NodeJS-v12.18.3-6DA55F?logo=nodedotjs&style=flat)
![Generic badge](https://img.shields.io/badge/MySQL-v8.0.22-%23316192.svg?logo=mysql&style=flat)

<br>

## ๐ค ํ๋ก์ ํธ์ ๊ธฐ๋ฅ๋ค์ ์ด๋ค ๊ฒ์ด ์๋์?

- ๋ก๊ทธ์ธ, ํ์๊ฐ์
- JWT ํ ํฐ์ธ์ฆ (access token + refresh token)
- Open API๋ฅผ ์ด์ฉํ ์ํ data ๊ฐ์ ธ์์ ํ๋ฉด์ ๋ณด์ฌ์ฃผ๊ธฐ
- ์ํ ๋ฆฌ๋ทฐ CRUD
- ๋๊ธ CRUD
- ํด์ํ๊ทธ
- ์ข์์

<br>

## ๐ค ํด๊ฒฐํ๊ธฐ ์ด๋ ค์ ๋ ๊ตฌํ ๋๋ ์ด์ ์ฌํญ์ ๋ฌด์์ด์์ผ๋ฉฐ ์ด๋ป๊ฒ ํด๊ฒฐํ๋์?

### โ access token ๊ณผ refresh token ๊ฐ๊ฐ ์ด๋ป๊ฒ ๊ด๋ฆฌํด์ผํ ๊น?

- access token ์ `redux state`๋ก ๊ด๋ฆฌํ๊ณ , refresh token ์ `Secure` `Httponly` ์ฟ ํค๋ก ๊ด๋ฆฌํ์ต๋๋ค.
- ์ด๋ ๊ฒ ๊ด๋ฆฌํ๋ฉด CSRF ์ทจ์ฝ์  ๊ณต๊ฒฉ, XSS ์ทจ์ฝ์  ๊ณต๊ฒฉ์ผ๋ก๋ถํฐ ๋ฐฉ์ดํ  ์ ์๋ค๊ณ  ์๊ฐํ์ต๋๋ค.
- ์๋ฒ์๊ฒ API ์ฝ์ ์์ฒญํ์๋, `middleware` ๋ฅผ ํตํด token์ ๊ฒ์ฆํ์ต๋๋ค.

### โ SQL vs ORM ?

- SQL์ SQL ๋ฌธ๋ฒ์ ์์์ผํ๊ธฐ ๋๋ฌธ์ `๊ฐ๋ฐ ์๋๊ฐ ์ ํ`๋  ์ ์์ง๋ง `๋ณต์กํ ์ฟผ๋ฆฌ`๋ฅผ ์ข ๋ ์ ์ฐํ๊ฒ ๊ตฌํํ  ์ ์์๊ฑฐ ๊ฐ๋ค๊ณ  ์๊ฐํ์ต๋๋ค.
- ORM์ `๊ฐ๋ฐ์ ์์ฐ์ฑ ํฅ์`, `DB ์์กด์ฑ ๊ฐ์` ๋ฑ ์ฅ์ ์ด ์์ง๋ง `๋ณต์กํ ์ฟผ๋ฆฌ`๋ฅผ ํํํ๊ธฐ๊ฐ ํ๋ค์ด๋ณด์ธ๋ค๊ณ  ์๊ฐํ์ต๋๋ค. (๋ฌผ๋ก  ํด๊ฒฐ๋ฒ์ด ์กด์ฌํ๋ค๊ณ  ์๊ฐํฉ๋๋ค.)
- ๊ฒฐ๋ก ์ SQL์ ๋ฐฐ์ฐ๊ณ  ์ถ์ด์ ์ง์  SQL์ ์์ฑํ๋ ๋ฐฉํฅ์ผ๋ก ์ ํํ์ต๋๋ค.

### โ Component ์ ๊ธฐ์ค์  ์ก๊ธฐ

- ์ ๊ฐ ์ ํ Component ๋๋๋ ๊ธฐ์ค์ ๋ค์๊ณผ ๊ฐ์ด ๋๋์์ต๋๋ค.
  - ์ผ๋ง๋ ์ฌ๋ฌ ๋ฒ ์ฌ์ฉํ๋๊ฐ?
  - ์ปดํฌ๋ํธ์ size๊ฐ ์ด๋์ ๋์ธ๊ฐ?

### โ ๋์์ธ ํจํด : MVC (props) vs flux (redux)

- ํ์ฌ ์ ๊ฐ ๊ตฌํํ ํจํด์ MVC ํจํด์๋๋ค. (React ํ์ต ๋ชฉ์ ์ผ๋ก ์งํํ๊ธฐ ๋๋ฌธ์ MVC ํจํด์ผ๋ก ์์ํ์ต๋๋ค.)
- MVC ํจํด์ ํฐ ํน์ง์ ์๋ฐฉํฅ ๋ฐ์ดํฐ ํ๋ฆ์ธ๋ฐ, ๊ท๋ชจ๊ฐ ์ปค์ง๋ฉด ์๊ธฐ์น ๋ชปํ ๋ฒ๊ทธ๊ฐ ๋ฐ์์ํฌ์ ์์ต๋๋ค.
- ํ์ ํ๋ก์ ํธ์ ์ข ๋ ๋ง์ ๊ธฐ๋ฅ๋ค์ด ์ถ๊ฐ๋  ๋์ MVC ํจํด์ ์ํด ๋ฐ์ํ  ์ ์๋ ๋ฒ๊ทธ๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํด ๋ฏธ๋ฆฌ flux ํจํด์ผ๋ก ๋ฐ๊ฟ ์์ ์๋๋ค.

<br>

## ๐ค ๊ฒฐ๊ณผ ํ๋ฉด์ด ๊ถ๊ธํด์.

- ํ์๊ฐ์
  ![](./images/signup.PNG)

  <br>

- ๋ก๊ทธ์ธ
  ![](./images/login.PNG)

  <br>

- ํ
  ![](./images/home.PNG)

  <br>

- ์ํ ๊ฒ์ ๊ฒฐ๊ณผ
  ![](./images/movie-list.PNG)

  <br>

- ํน์  ์ํ ํ์ด์ง
  ![](./images/movie-intro.PNG)

  <br>

- ๋ฆฌ๋ทฐ ์์ฑ ํ์ด์ง
  ![](./images/write.PNG)

  <br>

- ๋ฆฌ๋ทฐ ๊ธ
  ![](./images/review-detail.PNG)

  <br>

- ์ ์  ์ ๋ณด
  ![](./images/user.PNG)

  <br>

## ๐ค ์์ผ๋ก์ ๊ณํ์ ์ด๋ค ๊ฒ์ด ์๋์?

์ผ๋จ ์ ๊ฐ ์ถ๊ฐํ๊ณ ์ถ์ ๊ธฐ๋ฅ ๋ฐ ์์ ์ฌํญ์ ๋ค์๊ณผ ๊ฐ์ต๋๋ค.

- ์ง์ ๋ถํ ์ฝ๋ ๋ฆฌํํ ๋ง
- MVC ํจํด์ flux ํจํด์ผ๋ก ๋ฐ๊พธ๊ธฐ
- ํด์ํ๊ทธ ๊ฒ์ ๊ธฐ๋ฅ
- ์ํ ์ถ์ฒ ์๊ณ ๋ฆฌ์ฆ ์์ 
