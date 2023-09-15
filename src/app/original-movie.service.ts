import { Injectable } from '@angular/core';
import { Movie } from './models/movie.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private localStorageKey = 'movies';
  private originalMovies: Movie[] = [
    {
      id: 1,
      title: "Силиконовая долина",
      posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/fd428db9-f1a1-4354-bd22-32d24c8b01d3/600x900",
      rating: 8.4,
      description: "История о группе гиков, готовящих к запуску собственные стартапы в высокотехнологичном центре Сан-Франциско. Главные герои сериала бесплатно проживают в доме местного миллионера, но взамен им придётся отдать по 10% прибыли от будущих проектов.",
      awardTitle: '',
    },
    {
      id: 2,
      title: "Мистер Робот",
      posterUrl: "https://www.kinopoisk.ru/SI29E5374/c39019mupNsG/viDRSMv3Ek0L5IxeictX-SUKvds6VH5rAJzZdbd4c6-X_1_FX85K8LAUXTxnHj7xw9ffgb1QLJU9dwBYLwAfJvpApLx6kreY6gUJ23zLNliQqqmantFKKtGp3JBFi3EstWh9pq1MSDakcKndAis7hcKyHzWIZNi0OlFkPmjGmTRdUAKIzLazrH4VbH8bGzYuhsudj-rWDG1i3urU5QryH7RZ3FesfSmFdlNqyUOIqkRzEH43mLNpRmrxgK24pmqknHIwym8nUP5-Nb_f6inETzZIbZ5pNk2tUn4ql2f7097HerwEjc7YtOfCq_kA-ivVoxAddjugqvUY8gG96vQKFA5TgKmtNvKsrGdO_tsLZV3Ual6NemWvH3Bs2KVUamAfleos95_u-gQncpgLo7jpFhFg3jR4gGuH6fGzXfoWSRZeIpDo3YXQPl-l3174Kja-lui_ruhVvZywf-r0ZAriLFYpX6W_jAmlZSFIm2DKmHWjI59VOpEZVUqC0twb19qEzmCy-8824a5th44umsin3FaIvd_ZRR2fAV7ZBRRasqxHi68E_zyrhgVTmotxqqsWE5Ku9gtQmAZa4hN-KJVbdJ2D0BvN1aAtTGYfHIqoR--Fa-xuiUYfbxJcW9WGWuB9xAiMBO1tS9UFERjZQmlq98LyDOabQIvlKCBA_6g0Kuc8A9L4rmbAXs4Wbi8I6ddshNuOrZtGzQzCb9lFtFoh3eTZnfQPXBiWhYDYK7Jr2kawsF2FyJMLd9giwSwahBlVviIB-Ix24K6NdY7OW9mWHxaqLd6LNE5fwOybBtVYwQ3HeT9nbVy5xmeiy9iRuilEIdC_hGphCSXqoMCN6iaJFY2y8zsd9dKejEX8DPorVuzUe439uWduPoAf2RU0GdGeJWoMxi5_GYUXg0o4gim7pkPiHfQLsyrXyVPAbtrniLUPciCZfTfi_V-GPs6ZqKS8R5tsrNtEH9zRbLqFtlnQXOeJTbe9_JgGljLaeIPq2vWzMWzG6bAIpUtDo2zLB2sUHVBTCn4HQ5y_1a1MKRgnLyTovKxrds_9kvxr56doob_2ai4knb4qt1ahiAhAyTt2cuJfxtqBK4ZrYhEuWdYoVv0jQAmMhVDcnUfNzrsKl10GyawdKJd_PZFP68YHauKuJYkOVvxc2OZX05m649lpdwIRvtc5oSm2-zOg_wv1-yefQcNJXDTCTC31bG0KySYMR9je7uhkj1yADhqmBEogvoXL7cVs3pj0VlG5CsOJO4eBoD3VKcLrRjtTMv3alPj2bZHw-a6XAk5cRwyvG3nmPFaovQ76NTwOgp9KxgS7ICx2Cx_k3e8YJTQzavlw6rvnIiOO5jiSaTcb8bBtKMdYVw4i4Dscd3IfTHd-XjjpVC0le9yuagS_z6I8G4TVWEH-Ngiddz0eulR1wVg406jadCFRnsYZkMjHKpLSv6r1yzetUcArb9SS3B8ULz57mRS_JslsjVqVbn5wv-g159iwn-R4r4dvLipUJAMZCdP56GcCksyH-LEq1MngAZ8pN7h3n3GDW-83AiyudL6-SLiFP3c6DY7oF09cwhzZ1OT5wH73WT8GrLwpxtexWauju4uVU1K_F4uDOqZ4kwGe-HfopG5hgDnNpqNcnRRdbQor9k-VSX-9uPd-H0NPW9f1C6GshZjPxK-tSeSnQNoKwkm6ZBESPpY6YxiXSuOTfWqm2FQ9Q4EYz3RhfE1FLp7ZaUVP9Ng-7Utlbd9g3Ln1NVgxLsbJXlc9vwvl1DFoycE6yVQD4_-EirDKtUmwobwohUqkbuAwuG4l8w-fJ_5s2fh0_OWILxyLRj088x8pRSRoUG3EOQ-1Xo9pJyexWPnA2Kg18iPvtbuhm0frgqIOaJeIRAwxwpitpXNMnaVvzyvKBo7Fyf4-6IePjMMsmrQmSwAttCl9Bf3sGjRWYuhK8gr6xmCyjibbUri3C2OSnNt2K-W_kqLb3jXzDt3Xvj6ZSgY8Zwv_vll0T6yzjmnlxMkhDCfrnydtLnh0Z4MK6OGKmdVxY46XyHNrtuqiQ24qh_p2zvIQ6x3F4T98Fb6-WhoWnyZJbN0pBb2PsV5r92Y5gx7n-69n_U9a91Yw6wtSK5rnEwH-pDoBa0UbQgLMeua5JyxC0HvPdQL-_4XunMvbxv72y-5M6oYMfTC963dlGyIv1cj_dx3u2rYnQah4Y9i4BJLzzDX640gXCWGgHRjEeWad4_BZjHbDjT_Hzw9LGRV81Nqu_7imj68Bjyi25ioxrgUq_Fec3SiWddNIO6GamDQjI48HyrDJRsrB8uxaZZjkHzKh6L9Ugq6dJ98uqqk0TmeazO_7Za_80s7bx3aLsaxHC-72jNwbJyQwWGiDCLhFoLCOtDuQCzers-MMevZotE_y0PuPp0Cvr0QuLquZ9M9GSIzvuWcufrGNyWe2-cHNp5mvpL2uilaEIRvaYzjKx7IzjJfrsqmHevLBbYl0uWf-8_DLz2bArs2kjTwa-fYdVwo_n5t07x0RDPjkFJmhThfLLYbfvxuXV9H7iWMZmbVRY79EqnJb5OjQE31pNpj3_CAiyJ5UoE2txLzemVqmPEbIfP_Yty68Qv0I1xVIYh_Gavx2DS0o9PYTK_rRyVrEs6He14iSerTqsMMfykQYRz5QYEl_doNdDGV_X3j7twy1mI5Pujcdz-IfC8eUGbMd9Vtfl39eGYY0YOmJA-t6FgMQftQ5Q3i3u1Pjblh2GhadsVDInFdzXS8lLy15eAXfRvvcjIkkrB7SnCu0xArxTLZ5bmacvWnE9kGoCRHbSnUi8e6mCmD5NklQQE3KlLtnDYODS4500h2d5hzOKctGr7Wa3d5Yh1894Uw71WU6ADyGOV1lb17ahWWS2PqS6elHYZLdhhuiKAfa4ODcepXZ9J9z4jvNxZDM78a-jcrpZU1HWA_vuOUubfDeCxVkqsGe1TgMdh6-uYZXsfuo4wmIFRHwLPY5UTjWM",
      rating: 7.8,
      description: "История молодого программиста Эллиота, страдающего социофобией и решившего, что единственный приемлемый для него способ взаимодействия с людьми — это профессия хакера. Таким образом, он быстро оказывается в том самом месте, где пересекаются интересы его работодателя — фирмы, занимающейся кибербезопасностью, — и подпольных организаций, которые пытаются его завербовать с целью обрушения самых могучих американских корпораций.",
      awardTitle: ''
    },
    {
      id: 3,
      title: "Интернет-мальчик: История Аарона Шварца",
      posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/dff8155a-c500-4c25-aaa5-019f3c234e14/600x900",
      rating: 7.8,
      description: "История интернет-гения, веб-активиста и программиста Аарона Шварца, покончившего с собой в возрасте 26 лет.",
      awardTitle: ''
    },
    {
      id: 4,
      title: "Исходный код",
      posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/789dbe50-6884-4f27-a997-bb78d5f0df42/600x900",
      rating: 7.8,
      description: "Солдат по имени Коултер мистическим образом оказывается в теле неизвестного мужчины, погибшего в железнодорожной катастрофе. Коултер вынужден переживать чужую смерть снова и снова до тех пор, пока не поймет, кто – зачинщик катастрофы.",
      awardTitle: ''
    },
    {
      id: 5,
      title: "Социальная сеть",
      posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/04c60e22-8972-48a0-8945-019222065ae2/600x900",
      rating: 7.7,
      description: "В фильме рассказывается история создания одной из самых популярных в Интернете социальных сетей - Facebook. Оглушительный успех этой сети среди пользователей по всему миру навсегда изменил жизнь студентов-однокурсников гарвардского университета, которые основали ее в 2004 году и за несколько лет стали самыми молодыми мультимиллионерами в США.",
      awardTitle: ''
    },
    {
      id: 6,
      title: "Имя нам легион: История хактивизма",
      posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/a6e81bf6-5acc-411a-b53e-100d45fa274d/600x900",
      rating: 7.4,
      description: "Документальное исследование группы Anonymous – свободного объединения активистов-радикалов. Эти люди вывели гражданское неповиновение на цифровой уровень. Создатели картины детально разбирают эволюцию группы от ранних хакерских групп Cult of the Dead Cow, Electronic Disturbance Theater и имиджборда 4Chan до полномасштабного движения планетарного охвата, а также изучают их текущую деятельность, беседуя с непосредственными участниками группы.",
      awardTitle: ''
    },
    {
      id: 7,
      title: "Стив Джобс",
      posterUrl: "https://www.kinopoisk.ru/SI29E5374/c39019mupNsG/viDRSMv3Ek0L5IxeictX-SUKvds6VH5rAJzZdbd4c6-X_1_FX85K8LAUTeyH3v7xxjfPkS1VDPV9cvBoP8AfIyoA1LnaMteY6pV5SxzuFh2Aj6kKntFKKtGp3JBFi3EstWh9pq1MSDakcKndAis7hcKyHzWIZNi0OlFkPmjGmTRdUAKIzLazrH4VbH8bGzYuhsudj-rWDG1i3urU5QryH7RZ3FesfSmFdlNqyUOIqkRzEH43mLNpRmrxgK24pmqknHIwym8nUP5-Nb_f6inETzZIbZ5pNk2tUn4ql2f7097HerwEjc7YtOfCq_kA-ivVoxAddjugqvUY8gG96vQKFA5TgKmtNvKsrGdO_tsLZV3Ual6NemWvH3Bs2KVUamAfleos95_u-gQncpgLo7jpFhFg3jR4gGuH6fGzXfoWSRZeIpDo3YXQPl-l3174Kja-lui_ruhVvZywf-r0ZAriLFYpX6W_jAmlZSFIm2DKmHWjI59VOpEZVUqC0twb19qEzmCy-8824a5th44umsin3FaIvd_ZRR2fAV7ZBRRasqxHi68E_zyrhgVTmotxqqsWE5Ku9gtQmAZa4hN-KJVbdJ2D0BvN1aAtTGYfHIqoR--Fa-xuiUYfbxJcW9WGWuB9xAiMBO1tS9UFERjZQmlq98LyDOabQIvlKCBA_6g0Kuc8A9L4rmbAXs4Wbi8I6ddshNuOrZtGzQzCb9lFtFoh3eTZnfQPXBiWhYDYK7Jr2kawsF2FyJMLd9giwSwahBlVviIB-Ix24K6NdY7OW9mWHxaqLd6LNE5fwOybBtVYwQ3HeT9nbVy5xmeiy9iRuilEIdC_hGphCSXqoMCN6iaJFY2y8zsd9dKejEX8DPorVuzUe439uWduPoAf2RU0GdGeJWoMxi5_GYUXg0o4gim7pkPiHfQLsyrXyVPAbtrniLUPciCZfTfi_V-GPs6ZqKS8R5tsrNtEH9zRbLqFtlnQXOeJTbe9_JgGljLaeIPq2vWzMWzG6bAIpUtDo2zLB2sUHVBTCn4HQ5y_1a1MKRgnLyTovKxrds_9kvxr56doob_2ai4knb4qt1ahiAhAyTt2cuJfxtqBK4ZrYhEuWdYoVv0jQAmMhVDcnUfNzrsKl10GyawdKJd_PZFP68YHauKuJYkOVvxc2OZX05m649lpdwIRvtc5oSm2-zOg_wv1-yefQcNJXDTCTC31bG0KySYMR9je7uhkj1yADhqmBEogvoXL7cVs3pj0VlG5CsOJO4eBoD3VKcLrRjtTMv3alPj2bZHw-a6XAk5cRwyvG3nmPFaovQ76NTwOgp9KxgS7ICx2Cx_k3e8YJTQzavlw6rvnIiOO5jiSaTcb8bBtKMdYVw4i4Dscd3IfTHd-XjjpVC0le9yuagS_z6I8G4TVWEH-Ngiddz0eulR1wVg406jadCFRnsYZkMjHKpLSv6r1yzetUcArb9SS3B8ULz57mRS_JslsjVqVbn5wv-g159iwn-R4r4dvLipUJAMZCdP56GcCksyH-LEq1MngAZ8pN7h3n3GDW-83AiyudL6-SLiFP3c6DY7oF09cwhzZ1OT5wH73WT8GrLwpxtexWauju4uVU1K_F4uDOqZ4kwGe-HfopG5hgDnNpqNcnRRdbQor9k-VSX-9uPd-H0NPW9f1C6GshZjPxK-tSeSnQNoKwkm6ZBESPpY6YxiXSuOTfWqm2FQ9Q4EYz3RhfE1FLp7ZaUVP9Ng-7Utlbd9g3Ln1NVgxLsbJXlc9vwvl1DFoycE6yVQD4_-EirDKtUmwobwohUqkbuAwuG4l8w-fJ_5s2fh0_OWILxyLRj088x8pRSRoUG3EOQ-1Xo9pJyexWPnA2Kg18iPvtbuhm0frgqIOaJeIRAwxwpitpXNMnaVvzyvKBo7Fyf4-6IePjMMsmrQmSwAttCl9Bf3sGjRWYuhK8gr6xmCyjibbUri3C2OSnNt2K-W_kqLb3jXzDt3Xvj6ZSgY8Zwv_vll0T6yzjmnlxMkhDCfrnydtLnh0Z4MK6OGKmdVxY46XyHNrtuqiQ24qh_p2zvIQ6x3F4T98Fb6-WhoWnyZJbN0pBb2PsV5r92Y5gx7n-69n_U9a91Yw6wtSK5rnEwH-pDoBa0UbQgLMeua5JyxC0HvPdQL-_4XunMvbxv72y-5M6oYMfTC963dlGyIv1cj_dx3u2rYnQah4Y9i4BJLzzDX640gXCWGgHRjEeWad4_BZjHbDjT_Hzw9LGRV81Nqu_7imj68Bjyi25ioxrgUq_Fec3SiWddNIO6GamDQjI48HyrDJRsrB8uxaZZjkHzKh6L9Ugq6dJ98uqqk0TmeazO_7Za_80s7bx3aLsaxHC-72jNwbJyQwWGiDCLhFoLCOtDuQCzers-MMevZotE_y0PuPp0Cvr0QuLquZ9M9GSIzvuWcufrGNyWe2-cHNp5mvpL2uilaEIRvaYzjKx7IzjJfrsqmHevLBbYl0uWf-8_DLz2bArs2kjTwa-fYdVwo_n5t07x0RDPjkFJmhThfLLYbfvxuXV9H7iWMZmbVRY79EqnJb5OjQE31pNpj3_CAiyJ5UoE2txLzemVqmPEbIfP_Yty68Qv0I1xVIYh_Gavx2DS0o9PYTK_rRyVrEs6He14iSerTqsMMfykQYRz5QYEl_doNdDGV_X3j7twy1mI5Pujcdz-IfC8eUGbMd9Vtfl39eGYY0YOmJA-t6FgMQftQ5Q3i3u1Pjblh2GhadsVDInFdzXS8lLy15eAXfRvvcjIkkrB7SnCu0xArxTLZ5bmacvWnE9kGoCRHbSnUi8e6mCmD5NklQQE3KlLtnDYODS4500h2d5hzOKctGr7Wa3d5Yh1894Uw71WU6ADyGOV1lb17ahWWS2PqS6elHYZLdhhuiKAfa4ODcepXZ9J9z4jvNxZDM78a-jcrpZU1HWA_vuOUubfDeCxVkqsGe1TgMdh6-uYZXsfuo4wmIFRHwLPY5UTjWM",
      rating: 6.7,
      description: "История жизни одного из самых выдающихся умов планеты, основателя компании Apple, Стива Джобса.",
      awardTitle: ''
    },
    {
      id: 8,
      title: "Хакер",
      posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/388f0e26-d1bc-4468-bc19-263b5d25f87b/600x900",
      rating: 6.1,
      description: "Алекс вместе со своей семьей эмигрировал из Украины в Канаду в поисках лучшей жизни. Но когда в семье наступили финансовые затруднения, парень решает отомстить банку за увольнение матери, наказать коррумпированных банкиров и заодно заработать денег. Алекс вступает в криминальную интернет-организацию DarkWeb, где находит единомышленников и быстро осваивает искусство онлайн-мошенничества. Однако то, что сначала имело благородную цель, вскоре превращается в одержимое увлечение и привлекает внимание как правительства, так и опасных людей, возглавляющих DarkWeb. Основано на реальных событиях.",
      awardTitle: ''
    },
    {
      id: 9,
      title: "Сфера",
      posterUrl: "https://www.kinopoisk.ru/SI29E5374/c39019mupNsG/viDRSMv3Ek0L5IxeictX-SUKvds6VH5rAJzZdbd4c6-X_1_FX85K8LAUjTx3no7hxpfaIf21XABtd7VYykAfJsrg1Lnvcudo6pA8C_nLQ231z9y6ntFKKtGp3JBFi3EstWh9pq1MSDakcKndAis7hcKyHzWIZNi0OlFkPmjGmTRdUAKIzLazrH4VbH8bGzYuhsudj-rWDG1i3urU5QryH7RZ3FesfSmFdlNqyUOIqkRzEH43mLNpRmrxgK24pmqknHIwym8nUP5-Nb_f6inETzZIbZ5pNk2tUn4ql2f7097HerwEjc7YtOfCq_kA-ivVoxAddjugqvUY8gG96vQKFA5TgKmtNvKsrGdO_tsLZV3Ual6NemWvH3Bs2KVUamAfleos95_u-gQncpgLo7jpFhFg3jR4gGuH6fGzXfoWSRZeIpDo3YXQPl-l3174Kja-lui_ruhVvZywf-r0ZAriLFYpX6W_jAmlZSFIm2DKmHWjI59VOpEZVUqC0twb19qEzmCy-8824a5th44umsin3FaIvd_ZRR2fAV7ZBRRasqxHi68E_zyrhgVTmotxqqsWE5Ku9gtQmAZa4hN-KJVbdJ2D0BvN1aAtTGYfHIqoR--Fa-xuiUYfbxJcW9WGWuB9xAiMBO1tS9UFERjZQmlq98LyDOabQIvlKCBA_6g0Kuc8A9L4rmbAXs4Wbi8I6ddshNuOrZtGzQzCb9lFtFoh3eTZnfQPXBiWhYDYK7Jr2kawsF2FyJMLd9giwSwahBlVviIB-Ix24K6NdY7OW9mWHxaqLd6LNE5fwOybBtVYwQ3HeT9nbVy5xmeiy9iRuilEIdC_hGphCSXqoMCN6iaJFY2y8zsd9dKejEX8DPorVuzUe439uWduPoAf2RU0GdGeJWoMxi5_GYUXg0o4gim7pkPiHfQLsyrXyVPAbtrniLUPciCZfTfi_V-GPs6ZqKS8R5tsrNtEH9zRbLqFtlnQXOeJTbe9_JgGljLaeIPq2vWzMWzG6bAIpUtDo2zLB2sUHVBTCn4HQ5y_1a1MKRgnLyTovKxrds_9kvxr56doob_2ai4knb4qt1ahiAhAyTt2cuJfxtqBK4ZrYhEuWdYoVv0jQAmMhVDcnUfNzrsKl10GyawdKJd_PZFP68YHauKuJYkOVvxc2OZX05m649lpdwIRvtc5oSm2-zOg_wv1-yefQcNJXDTCTC31bG0KySYMR9je7uhkj1yADhqmBEogvoXL7cVs3pj0VlG5CsOJO4eBoD3VKcLrRjtTMv3alPj2bZHw-a6XAk5cRwyvG3nmPFaovQ76NTwOgp9KxgS7ICx2Cx_k3e8YJTQzavlw6rvnIiOO5jiSaTcb8bBtKMdYVw4i4Dscd3IfTHd-XjjpVC0le9yuagS_z6I8G4TVWEH-Ngiddz0eulR1wVg406jadCFRnsYZkMjHKpLSv6r1yzetUcArb9SS3B8ULz57mRS_JslsjVqVbn5wv-g159iwn-R4r4dvLipUJAMZCdP56GcCksyH-LEq1MngAZ8pN7h3n3GDW-83AiyudL6-SLiFP3c6DY7oF09cwhzZ1OT5wH73WT8GrLwpxtexWauju4uVU1K_F4uDOqZ4kwGe-HfopG5hgDnNpqNcnRRdbQor9k-VSX-9uPd-H0NPW9f1C6GshZjPxK-tSeSnQNoKwkm6ZBESPpY6YxiXSuOTfWqm2FQ9Q4EYz3RhfE1FLp7ZaUVP9Ng-7Utlbd9g3Ln1NVgxLsbJXlc9vwvl1DFoycE6yVQD4_-EirDKtUmwobwohUqkbuAwuG4l8w-fJ_5s2fh0_OWILxyLRj088x8pRSRoUG3EOQ-1Xo9pJyexWPnA2Kg18iPvtbuhm0frgqIOaJeIRAwxwpitpXNMnaVvzyvKBo7Fyf4-6IePjMMsmrQmSwAttCl9Bf3sGjRWYuhK8gr6xmCyjibbUri3C2OSnNt2K-W_kqLb3jXzDt3Xvj6ZSgY8Zwv_vll0T6yzjmnlxMkhDCfrnydtLnh0Z4MK6OGKmdVxY46XyHNrtuqiQ24qh_p2zvIQ6x3F4T98Fb6-WhoWnyZJbN0pBb2PsV5r92Y5gx7n-69n_U9a91Yw6wtSK5rnEwH-pDoBa0UbQgLMeua5JyxC0HvPdQL-_4XunMvbxv72y-5M6oYMfTC963dlGyIv1cj_dx3u2rYnQah4Y9i4BJLzzDX640gXCWGgHRjEeWad4_BZjHbDjT_Hzw9LGRV81Nqu_7imj68Bjyi25ioxrgUq_Fec3SiWddNIO6GamDQjI48HyrDJRsrB8uxaZZjkHzKh6L9Ugq6dJ98uqqk0TmeazO_7Za_80s7bx3aLsaxHC-72jNwbJyQwWGiDCLhFoLCOtDuQCzers-MMevZotE_y0PuPp0Cvr0QuLquZ9M9GSIzvuWcufrGNyWe2-cHNp5mvpL2uilaEIRvaYzjKx7IzjJfrsqmHevLBbYl0uWf-8_DLz2bArs2kjTwa-fYdVwo_n5t07x0RDPjkFJmhThfLLYbfvxuXV9H7iWMZmbVRY79EqnJb5OjQE31pNpj3_CAiyJ5UoE2txLzemVqmPEbIfP_Yty68Qv0I1xVIYh_Gavx2DS0o9PYTK_rRyVrEs6He14iSerTqsMMfykQYRz5QYEl_doNdDGV_X3j7twy1mI5Pujcdz-IfC8eUGbMd9Vtfl39eGYY0YOmJA-t6FgMQftQ5Q3i3u1Pjblh2GhadsVDInFdzXS8lLy15eAXfRvvcjIkkrB7SnCu0xArxTLZ5bmacvWnE9kGoCRHbSnUi8e6mCmD5NklQQE3KlLtnDYODS4500h2d5hzOKctGr7Wa3d5Yh1894Uw71WU6ADyGOV1lb17ahWWS2PqS6elHYZLdhhuiKAfa4ODcepXZ9J9z4jvNxZDM78a-jcrpZU1HWA_vuOUubfDeCxVkqsGe1TgMdh6-uYZXsfuo4wmIFRHwLPY5UTjWM",
      rating: 5.8,
      description: "Недалёкое будущее. Мэй устраивается на работу в глобальную интернет-компанию «Сфера», которую возглавляет гуру социальных медиа Эймон Бэйли. Основатель «Сферы» замечает талантливую сотрудницу и приглашает её принять участие в прорывном эксперименте, который призван перевернуть представления миллиардов людей о возможностях индивида и границах личной свободы. Вскоре Мэй предстоит узнать о компании-гиганте Кремниевой долины пугающую правду. От поступков и смелости девушки будет зависеть судьба её друзей, близких и всего человечества.",
      awardTitle: ''
    },
    {
      id: 10,
      title: "Кибер",
      posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/f3043349-e06c-4b62-840e-0a3bb86efc77/600x900",
      rating: 5.5,
      description: "Спокойная, размеренная жизнь современного мирового пространства. Кажется, что ничто не может нарушить равномерный, плавный ход событий, жизнь настолько механизирована, все рассчитано до мельчайшей детали, казалось бы, что может произойти? Какое событие может выбить из колеи столь идеально отлаженную машину? Однако именно разработки в области новейших технологий представляют главную угрозу человечеству. Лучшие ученые умы из США и Китая объединяют силы в борьбе против самой мощной кибернетической атаки.",
      awardTitle: ''
    },
  ];

  constructor() {
    const moviesFromLocalStorage = localStorage.getItem(this.localStorageKey);
    if (moviesFromLocalStorage) {
      this.originalMovies = JSON.parse(moviesFromLocalStorage);
    }
  }

  getMovies(): Movie[] {
    return this.originalMovies;
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    return of(this.originalMovies.find(movie => movie.id == id))
  }

  editMovie(movie: Movie): Observable<any> {
    this.saveMoviesToLocalStorage();

    return new Observable<any>((observer) => {
      observer.next();
      observer.complete();
    });
  }

  saveMoviesToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.originalMovies));
  }
}
