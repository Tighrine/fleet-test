# 📊 E-commerce Sales Prediction

This project demonstrates:
1. A simple **PostgreSQL database** with an e-commerce data model.
2. SQL queries to extract useful sales insights.
3. A **JavaScript (Node.js)** prediction script to estimate future sales.

---

## 🚀 Prerequisites

Make sure you have installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js >= 18](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

## 🗄 1. Start PostgreSQL with Docker

In the `sql` folder there is a `docker-compose.yml` file.

```bash
cd sql
docker-compose up -d

npm install

node prediction.js