# Проект "Приложение для учета расходов"

## Описание проекта

![Coverage](https://github.com/Stern-Ritter/cost-accounting-app/actions/workflows/coverage.yml/badge.svg)
![Sanity-check](https://github.com/Stern-Ritter/cost-accounting-app/actions/workflows/sanity-check.yml/badge.svg)
![Deploy](https://github.com/Stern-Ritter/cost-accounting-app/actions/workflows/deploy.yml/badge.svg)

Приложение позволяет создавать, редактировать, удалять задачи, данные хранятся в firebase.

## Функциональность проекта

1. Создание категорий расходов, у которых могут быть свои подкатегории;
2. Создание транзакций расходов с выбором категории и подкатегории, а также указанием суммы;
3. Возможность анализа расходов за произвольный период времени в виде таблицы и диаграммы (pie chart) c использованием react-google-charts;
4. Сохранение данных в базе Firebase Firestore, отдельно для каждого пользователя.
5. Поддержка регистрации и аутентификации пользователей с помощью react-firebase.

**Github-pages**

- [Ссылка на github-pages.](https://stern-ritter.github.io/cost-accounting-app/)
