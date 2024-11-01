## Installation

### 1. Clone the Repository

First, clone the repository to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/golova1337/User_authentication
```

### 2. Create the .env File

Next, create a .env file by following the structure provided in .env.example. Make sure to fill in the necessary environment variables.

### 3. Install Docker

Ensure that Docker is installed on your machine. If not, you can download it from the official Docker website.

### 4 Run Docker

To start the application, run the following command in your terminal: **docker-compose up**
or to run it in detached mode: **docker-compose up -d**

### 5 Run migration

run: **npx drizzle-kit migrate**

---

# Part 2 What if

## Спосіби

- Використати діапазоне шардіровоння по id (хеш id функції)
- Розподілена система зберігання даних: Запис йде в мастер бд і потім асинхроно в репликация
- Зберігати в redis а потім через messge queue і через consumer ассінхроно в основну бд

---

# Part 3 Social Login

### Google

 Googl cloud console => APIs $ Service => OAuth consent screen => fil in by instruction => Credentials => create Credentials => receive Client id & Client secret => then implement passport-google-oauth20 nestjs

facebook and twitter the same situation